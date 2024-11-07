import express from 'express';
import documentsRouter from './router/documents';
const app = express();

app.use(express.json());


const PORT = 3001;
app.get("/ping", (_req, res) =>{
  console.log("alguien ha hecho un ping");
  res.send("pong"); 
});


app.use("/api/documents", documentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
