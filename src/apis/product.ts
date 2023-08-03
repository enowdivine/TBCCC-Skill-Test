import express, { Request, Response } from "express";
import ProductClass from "../controllers/product";
const multer = require("multer");

const router = express.Router();
const productController = new ProductClass();

// multer storage function
const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: Function) => {
    cb(null, "uploads/");
  },
  filename: (req: Request, file: any, cb: Function) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

// multer image filter
const fileFilter = (req: Request, file: any, cb: Function) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// multer upload function
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

router.post("/create", upload.single("image"), productController.create);
router.get("/readAll", productController.readAll);
router.get("/readOne/:id", productController.readOne);
router.put("/update/:id", upload.single("image"), productController.update);
router.delete("/delete/:id", productController.delete);

export default router;
