import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";

export const notifyUsers = () =>{
    cron.schedule("*/10 * * * * *",async ()=>{
        try{

             console.log("Cron job running...");

               const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

               console.log("One day ago:", oneDayAgo);
               const allBorrowers = await Borrow.find();

         

               const borrowers = await Borrow.find({
                dueDate: {
                    $gt: oneDayAgo
                },
                returnDate: null,
                notified: false,

               })

               

               for(const element of borrowers){
                 console.log("Processing borrower:", element);
                 if(element.user && element.user.email){
                    
                    sendEmail({
                        email: element.user.email,
                        subject: "Book return Reminder",
                        message: `Hello ${element.user.name},\n\nThis is a remainder that the book you borrowed is due for return today. Please return the book to the library as soon as possible.\n\nThank you.`,
                        
                    });
                    element.notified = true;
                    await element.save();
                    console.log(`Email sent sent to ${element.user.email}`);
                    
                 }
               }

        } catch(error){
           console.error("Some error occured while notifying users.",error);
           
        }
        
    })
}