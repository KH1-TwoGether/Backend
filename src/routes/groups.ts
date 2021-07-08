import * as express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(501).send();
});

export default router;
