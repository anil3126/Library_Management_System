import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBook } from '../store/slices/bookSlice';
import { toggleDeleteBookPopup } from '../store/slices/popUpSlice';

const DeleteBookPopup = ({bookId}) =>{
    const dispatch = useDispatch();
     console.log("BOOK ID:", bookId);
    const handleDelete = ()=>{
        console.log("DELETING ID:", bookId);
        dispatch(deleteBook(bookId));
        dispatch(toggleDeleteBookPopup())
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
           <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure.. you want to delete this book?</p>
            <div className="flex justify-end gap-4 mt-6">
                <button onClick={()=> dispatch(toggleDeleteBookPopup())}
                   className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                 >
                   Cancel
                </button>
                <button onClick={handleDelete}
                   className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                 >
                   Delete
                </button>
            </div>

           </div>
        </div>
    )
}

export default DeleteBookPopup;