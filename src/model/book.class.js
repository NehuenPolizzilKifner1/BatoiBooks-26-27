export default class Book{
    constructor(bookData){
        this.id = bookData.id,
        this.userId= bookData.userId,
        this.moduleCode = bookData.moduleCode,
        this.publisher = bookData.publisher,
        this.price = bookData.price,
        this.pages = bookData.pages,
        this.status = bookData.status,
        this.photo = bookData.photo || "",
        this.comments = bookData.comments || "",
        this.soldDate = bookData.soldDate || ""
    }

    toString(){
        return this.id + ", " + this.userId + ", " + this.moduleCode + ", " + this.publisher + ", " + this.price + ", " + this.pages + ", " + this.status + ", " + this.photo + ", " + this.comments + ", " + this.soldDate 
    }
}