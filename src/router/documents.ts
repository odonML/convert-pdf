import express from 'express';
import multer from 'multer';
import { convertToPdf } from '../services/documentsServices';
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, './src/uploads')
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


router.post("/doc", upload.single("doc"), async (req, res) => {
  console.log(req.file)
  if(req.file){
    const docName = req.file.originalname;
    const pdf = await convertToPdf(docName);
    res.contentType("application/pdf");
    res.send(pdf);
  }
} )

export default router;