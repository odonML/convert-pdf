import express from 'express';
const router = express.Router();

router.post("/doc", (_req, res) => {
  console.log(res)
} )

export default router;