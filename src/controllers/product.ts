import { Request, Response } from "express";
import Product from "../models/product";
interface MulterRequest extends Request {
  file: any;
}

class ProductClass {
  // create new product
  create(req: Request, res: Response) {
    Product.find({ title: req.body.title })
      .exec()
      .then((product) => {
        if (product.length >= 1) {
          return res.status(400).json({
            message: "product already exist",
          });
        }
        const image = (req as MulterRequest).file; // getting image from multer
        const newProduct = new Product({
          userId: req.body.userId,
          title: req.body.title,
          image: image.path,
          price: req.body.price,
          description: req.body.description,
        });
        newProduct.save();
        res.status(201).json({
          message: "product created",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }

  // read all products
  readAll(req: Request, res: Response) {
    Product.find()
      .exec()
      .then((products) => {
        res.send(products);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }

  // read one product
  readOne(req: Request, res: Response) {
    Product.findOne({ _id: req.params.id })
      .exec()
      .then((product) => {
        res.send(product);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }

  // update product
  async update(req: Request, res: Response) {
    const image = (req as MulterRequest).file; // getting image from multer
    const product = await Product.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          image: image.path,
          price: req.body.price,
          description: req.body.description,
        },
      }
    );
    if (product.acknowledged) {
      res.status(200).json({
        message: "product updated successfully",
        product: product,
      });
    } else {
      res.status(404).json({
        message: "product not found",
      });
    }
  }

  // delete product
  async delete(req: Request, res: Response) {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(200).json({
        message: "Product deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  }
}

export default ProductClass;
