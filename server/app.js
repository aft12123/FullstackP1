
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require('./Routes/index');

const app = express();

app.use(express.json());
app.use(cors());

const port = 5404;


// CORS issue will be solved // manual cors issue fixing
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // http://localhost:3000
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Header', 'Content-Type, Authorization');
//     next();
// });

//npm i cors
app.use('/', routes);

mongoose
  .connect("mongodb://127.0.0.1:27017")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});






// app.use("/auth", authRoutes);

// app.listen(5400, () => console.log("Server running on port 5400"));
