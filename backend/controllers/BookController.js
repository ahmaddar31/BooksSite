const Book = require('../models/BookModel')
const mongoose = require('mongoose')

//Get all Books
const getBooks = async (req,res) => {
    const Books = await Book.find({}).sort({createdAt : -1})
    res.status(200).json(Books)
}

//Get a single book

const getBook = async(req,res) => {
    const { id } = req.params 
    //if id not valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such book'})
    }
    //find the book by id
    const book = await Book.findById(id)
    if(!book){
        return res.status(404).json({error:'No such book'})
    }
    res.status(200).json(book)
}

//POST a new book

const createBook = async(req,res) => {
    const {title,description,rating,author} = req.body

    //add document to dataBase
    try{
        const book = await Book.create({title,description,rating,author})
        res.status(200).json(book)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE a book
const deleteBook = async(req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error : 'No such Book'})
    }

    const book = await Book.findOneAndDelete({_id: id})
    if(!book){
        res.status(404).json({error : 'No such Book'})
    }
    res.status(200).json(book)
}

//Update a Book
const updateBook = async(req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error : 'No such Book'})
    }

    const book = await Book.findOneAndUpdate({_id: id},{
        ...req.body
    })
    if(!book){
        res.status(404).json({error : 'No such Book'})
    }
    res.status(200).json(book)
}

module.exports ={
    getBooks,
    getBook,
    createBook,
    deleteBook,
    updateBook
}