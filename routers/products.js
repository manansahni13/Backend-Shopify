const express=require("express");
const router=express.Router();
const {Product}=require("../models/products")
  
  router.get('/', async (req, res) => {
  //   const prod = {
  //     name: "manan",
  //     id: 1,
  //     image_url: "some url",
  //   };
  //   res.send(prod);
  const product= await Product.find();
  res.send(product);
  });
  
  router.post('/', (req, res) => {
    //   const newProd=req.body;
    //   console.log(newProd);
    //   res.send(newProd);
  
    const newProd = new Product({
      name: req.body.name,
      image: req.body.image_url,
      countInStock: req.body.countInStock,
    });
  
    newProd
      .save()
      .then(() => {
        res.status(201).json(newProd);
      })
      .catch((err) => {
        res.status(501).json({
          error: err,
          success: false,
        });
      });
  });

  module.exports=router;