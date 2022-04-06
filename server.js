const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();

dotenv.config();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Alumni Portal Backend Mongodb");
});
// MongoDb connection
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database Connected");
    }
  }
);

// routes
const auth=require("./routes/auth");



//routes use
app.use("/api/v1/auth/", auth);




app.listen(process.env.PORT, () => {
  console.log("Server started at port " + process.env.PORT);
});
