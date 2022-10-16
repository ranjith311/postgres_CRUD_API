require("dotenv").config();
const express = require("express")
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.set("view engine","ejs")

app.use("/api",require("./routes/todoRoute"))

app.listen(3000,()=>console.log(`Server is running at port 3000`));