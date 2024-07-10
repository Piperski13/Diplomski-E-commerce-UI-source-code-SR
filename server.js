const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require('./aplikacija');

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

mongoose
  .connect(DB)
  .then(() => console.log("Uspešno povezan sa bazom podataka"))
  .catch((err) => console.error("Greška prilikom povezivanja sa bazom podataka:", err));

const port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`Port ${port} is waiting for a request...`);
})