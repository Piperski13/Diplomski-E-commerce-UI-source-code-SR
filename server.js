const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require('./aplikacija');

const port = process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`Port ${port} is waiting for a request...`);
})