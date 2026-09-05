import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleAddBookPopup } from "../store/slices/popUpSlice";

const AddBookPopup = () => {
  const dispatch = useDispatch();

  const [title,setTitle] = useState();
  const [author,setAuthor] = useState();
  const [price,setPrice] = useState();
  const [quantity,setQuantity] = useState();
  const [description, setDescription] = useState();
  
  const handleAddBook = (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title",title);
    formData.append("author",author);
    formData.append("price",price);
    formData.append("quantity",quantity);
    formData.append("description", description);
    dispatch(addBook(formData));
    dispatch(fetchAllBooks());
    
  }

  return <></>;
};

export default AddBookPopup;
