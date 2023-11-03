/* middleware for handling error objects created for our own error handling  */

const { HttpError } = require("../utils/Errors/HttpError");


function errorHandler(err,req,res,next){
let httpStatusCode = 500; // default status code
let message = "Some Error Occured"; // default message

if(err instanceof HttpError){
    console.log(err.message);
    httpStatusCode = err.httpStatusCode;
    message = err.message;
    // can also add more like documentationUrl but we will do it later
}
else{
// hiding details of error for development environment only
if(process.env.NODE_ENV!=="production"){
    if(typeof err === "string"){
        //  since we can also throw string as error in javascript
        message=err;
    }
    if(err instanceof Error){
        /* if err is instance of Error class then message will be set to err's message */
        message = err.message; 
    }
}
}

let stackTrace = undefined;

if(process.env.NODE_ENV!=="production"){
    stackTrace = err.stack;
}

res.status(httpStatusCode).json({
    success:false,
    message:message||"S",
    stackTrace:stackTrace,
    documentationUrl:err.documentationUrl||undefined,
    timestamps:err.timestamps||undefined
});


}

module.exports = errorHandler;