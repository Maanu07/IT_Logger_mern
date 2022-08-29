const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Log = require("./models/logModel");
const Tech = require("./models/techModel");
const cors = require("cors");
require('dotenv').config()

const PORT = process.env.PORT || 5000;

// body parser middleware
app.use(express.json());

// cors middleware
app.use(cors());


const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// connecting to mongodb atlas
mongoose
  .connect(
    `${process.env.MONGO_URI}`,
    connectionParams
  )
  .then(() => {
    console.log("connected to DB");
    app.listen(PORT, "localhost", () => {
      console.log(`server running at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));





// ********************* LOGS API  ************************

// get logs
app.get("/logs", async (req, res) => {
  const result = await Log.find();
  res.json(result);
});

// add log
app.post("/log/add", async (req, res) => {
  // logic to set the id column (starts)
  const result = await Log.find().sort({ id: -1 }).limit(1);
  // if initially there are no logs,then set the id of first log to 1
  if (result == []) {
    req.body.id = 1;
  } else {
    req.body.id = result[0].id + 1;
  }
  // (ends)
  const log = new Log(req.body);
  await log.save();
  res.json(log);
});

// delete log
app.delete("/log/delete/:id", async (req, res) => {
  const result = await Log.findByIdAndDelete(req.params.id);
  res.json(result);
});

// update log
app.put("/log/update/:id", async (req, res) => {
  const oldLog = await Log.findByIdAndUpdate(req.params.id, req.body);
  res.json(oldLog);
});

// search for a log
app.get("/log/search/:text", async (req, res) => {
  const { text } = req.params;
  // querying the database, using or operator and regex for patter matching

  const result = await Log.find({
    $or: [
      { tech: { $regex: text, $options: "$i" } },
      { message: { $regex: text }, $options: "$i" },
    ],
  });

  res.json(result);
});

// SQL " SELECT * FROM Log WHERE message LIKE '%@text%' OR tech LIKE '%text%' "

// ********************************  TECHNICIAN API ***************

// get technicians
app.get("/techs", async (req, res) => {
  const result = await Tech.find({});
  res.json(result);
});

// add technicians
app.post("/tech/add", async (req, res) => {
  const technician = new Tech(req.body);
  await technician.save();
  res.send(req.body);
});

// delete technician
app.delete("/tech/delete/:id", async (req, res) => {
  const deletedTech = await Tech.findByIdAndDelete(req.params.id);
  res.send(deletedTech);
});


// serve static files of the client
if(process.env.NODE_ENV == 'production'){
  app.use(express.static('client/build'))
  const path = require('path')
  app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'dist','index.html'))
  })
}

