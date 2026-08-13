import { isAuthenticated } from "../middlewares/authMiddleware.js"; 
import { addBook, deleteBook, getAllBooks } from "../controllers/bookController.js";

import expres from "express";

 const router = Router.express()

router.post("/admin/add", isAuthenticated, isAuthorized("Admin") , addBook);
router.get("/all",isAuthenticated, getAllBooks);
router.delete("/admin/delete", isAuthenticated, isAuthorized("Admin"), deleteBook);

 export default router;