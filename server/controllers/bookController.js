import  catchAsyncError from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";

export const addBook = catchAsyncError(async (req,res ,next) => {

    const {title, author, description, price, quantity} = req.body;
    if(!title || !author || !description || !price || !quantity){
        return next(new ErrorHandler("Please enter all fields.",400));
    }

    const book = Book.create({
        title,
        author,
        description,
        price,
        quantity

    })

    res.status(200).json({
        success: true,
        message: "Book added successfully",
        book
    })
     
})


export const getAllBooks = catchAsyncError(async (req,res,next)=>{

   const books = await Book.find();
   res.status(200).json({
     success: true,
     books
   })


});

export const deleteBook = catchAsyncError(async (req,res ,next)=>{

     const {id} = req.params;
      
     const book = await Book.findById(id);

     if(!book){
        return next(new ErrorHandler("Book not found.",404));
     }
     await book.deleteOne();
     res.status(200).json({
        success: true,
        message:"Book deleted successfully"
     })
     
})
