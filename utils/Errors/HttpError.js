class HttpError extends Error{
    httpStatusCode;
    // message;
    documentationUrl;// only when in development

    constructor(httpStatusCode,message,documentationUrl){
        if(message){
            super(message);

        }
        else{
            super("A error Occured"); //default error message
        }

        this.httpStatusCode=httpStatusCode||400; // setting the http status code default is 400;
        if(process.env.NODE_ENV!='production'&&documentationUrl){
            this.documentationUrl = documentationUrl;
        }
else{
    this.documentationUrl = undefined;
}
        Error.captureStackTrace(this,this.constructor); // will give us the stackTrace of error whenever this object is created
    }
}


module.exports = {HttpError};