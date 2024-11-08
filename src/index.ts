
import express from 'express';
import documentsRouter from './router/documents';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const PORT = 3001;

app.post("/ping", (_req, res) =>{
  console.log("alguien ha hecho un ping");
  res.send("pong"); 
});


app.use("/api", documentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
