const mongoose = require("mongoose");

const connect = () => {
 mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); // this will connect with mongo db;
  const db = mongoose.connection;
  db.on('error',(error)=>{
    console.log(error)
  });
  db.on('connected',()=>{
    console.log("DB connected");
  })
};

module.exports = connect;
