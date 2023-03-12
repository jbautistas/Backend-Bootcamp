import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'

export default class BooksController {
    public async store({request}: HttpContextContract){
        const {title, author} = request.all();
        const book = new Book();
        book.title = title;
        book.author = author;
        await book.save();
        return {book, "msg": "Libro creado"}
    }

    public async index({}: HttpContextContract){
        try {
            const books = await Book.all();
            return {books, "msg": "Lista de libros"}
        } catch (error) {
            return{"msg": "No hay libros"}// new
            
        }
    }

    public async show({params}: HttpContextContract){
        try {
            const book = await Book.find(params.id);
            if(book){
                return {book, "msg": "Libro encontrado"}
            } else {
                return {"msg": "Libro no encontrado"}
            }
        } catch (error) {
            console.log(error);
            return {"msg": "No hay registros"}
        }
    }

    public async update({request, params}: HttpContextContract){
        const book = await Book.find(params.id);
        if(book){
            book.title = request.input('title');
            book.author = request.input('author');
            if(await book.save()) {
                return {book, "msg": "Libro actualizado"}
            }
            return {
                "msg": "No se pudo actualizar el libro",
                "estado": 401}
        } else {
            return {
                "msg": "Libro no encontrado",
                "estado": 401
            }
        }
    }
}
