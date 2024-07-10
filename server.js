const app = require('./aplikacija');

const port = 3000;
app.listen(port,()=>{
  console.log(`Port ${port} is waiting for a request...`);
})