import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleAddBookPopup } from "./popUpSlice";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        loading: false,
        error: null,
        message: null,
        books: []
    },
    reducers: {
        fetchBooksRequest(state){
            state.loading=true;
            state.error=null;
            state.message=null;


        },
        fetchBooksSuccess(state,action){
            state.loading=false;
            state.books=action.payload;

        },
        fetchBooksFailed(state,action){
           state.loading=false;
           state.error=action.payload;
           state.message=null;
        },
        addBookRequest(state){
            state.loading=true;
            state.error=null;
            state.message=null;
        },
        addBookSucess(state,action){
            state.loading=false;
            state.message=action.payload;

        },
        addBookFailed(state,action){
            state.loading=false;
            state.error=action.payload;
        },
        deleteBookRequest(state,action){
          state.loading = true;
          state.error = null;
          state.message = null; 
        },
        deleteBookSuccess(state,action){
            state.loading = false;
            state.message = action.payload.message;
            state.books = state.books.filter(
                (book) => book._id !== action.payload.bookId
            );

        },
        deleteBookFailed(state,action){
            state.loading = false;
            state.error = action.payload;
        },

        resetBookSlice(state){
            state.error=null;
            state.message=null;
            state.loading=null;
        }
    }
});


export const fetchAllBooks = () => async (dispatch)=>{
    dispatch(bookSlice.actions.fetchBooksRequest());
    await axios.get("https://library-management-system-5-n54s.onrender.com/api/v1/book/all",{
        withCredentials: true
    })
    .then((res)=>{
        dispatch(bookSlice.actions.fetchBooksSuccess(res.data.books))
    })
    .catch((err)=>{
        dispatch(bookSlice.actions.fetchBooksFailed(err.response.data.message))
    })
}

export const addBook = (data) =>async(dispatch) =>{
    dispatch(bookSlice.actions.addBookRequest());

    await axios.post("https://library-management-system-5-n54s.onrender.com/api/v1/book/admin/add",data,{
        withCredentials: true,
        "Content-Type": "application/json",
    }) 
    .then( (res) => {
       dispatch(bookSlice.actions.addBookSucess(res.data.message));
       dispatch(toggleAddBookPopup())
    })
    .catch( (err) => {
        dispatch(bookSlice.actions.addBookFailed(err.response.data.message))
    })
    
}

export const deleteBook = (bookId) => async (dispatch) =>{
    try{
        dispatch(bookSlice.actions.deleteBookRequest());
        const {data} = await axios.delete(`https://library-management-system-5-n54s.onrender.com/api/v1/book/delete/${bookId}`,
            {withCredentials: true}
        );
        dispatch(bookSlice.actions.deleteBookSuccess({message: data.message, bookId}))

    } 
    catch(error){
      dispatch(bookSlice.actions.deleteBookFailed(error.response.data.message));
    }
}


export const resetBookSlice = () => (dispatch)=>{
    dispatch(bookSlice.actions.resetBookSlice())
}

export default bookSlice.reducer;