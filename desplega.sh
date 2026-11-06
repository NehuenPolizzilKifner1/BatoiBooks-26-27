#!/bin/bash

set -Eeuo pipefail

# Configuración
SERVIDOR="deploy@52.204.190.92"
CLAVE="$HOME/.ssh/batoibooks_deploy"
DESTINO="/var/www/batoibooks/public/"

# Directorio del proyecto
cd "$(dirname "$0")"

echo "=================================="
echo "       DESPLIEGUE BATOIBOOKS"
echo "=================================="

# Comprobar herramientas y clave SSH
if ! command -v npm >/dev/null 2>&1; then
    echo "ERROR: npm no está instalado."
    exit 1
fi

if ! command -v rsync >/dev/null 2>&1; then
    echo "ERROR: rsync no está instalado."
    exit 1
fi

if [ ! -f "$CLAVE" ]; then
    echo "ERROR: No se encuentra la clave SSH."
    exit 1
fi

# Generar versión de producción
echo "[1/3] Generando versión de producción..."

npm run build

if [ ! -s dist/index.html ]; then
    echo "ERROR: No se ha generado dist/index.html."
    exit 1
fi

# Comprobar conexión SSH
echo "[2/3] Comprobando conexión con el servidor..."

ssh -i "$CLAVE" -o BatchMode=yes "$SERVIDOR" \
    "mkdir -p '$DESTINO'"

# Subir y publicar la nueva versión
echo "[3/3] Publicando nueva versión..."

rsync -az --delete \
    --chmod=D2750,F640 --chown=deploy:www-data\
    -e "ssh -i $CLAVE -o BatchMode=yes" \
    dist/ "$SERVIDOR:$DESTINO"

# Comprobar que se ha publicado
ssh -i "$CLAVE" -o BatchMode=yes "$SERVIDOR" \
    "test -s '${DESTINO}index.html'"

echo "=================================="
echo " DESPLIEGUE COMPLETADO CORRECTAMENTE"
echo "=================================="
echo "Aplicación: https://app.52-204-190-92.sslip.io"
