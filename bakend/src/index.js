const express = require('express')
const ROUTES = require("./routes");
const connectDB = require('./db/dbconnections');
const app = express();          
app.use(express.json());  
const PORT = process.env.PORT || 3000;
const path = require("path");        
const cors = require('cors')
app.use(cors({
  origin: "http://localhost:5173",
}))
app.use("/uploads", express.static("uploads"));

app.use("/user",ROUTES.USER)

app.use("/category",ROUTES.CATEGORY)

app.use("/clothes",ROUTES.CLOTHES)

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting DB", error);
  });
