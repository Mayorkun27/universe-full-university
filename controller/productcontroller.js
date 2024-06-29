import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import productmodels from "../models/productmodels.js";

// For Create Product
export const productUpload = async (req, res) => {
     try {
          const {name, quantity, description, price, category, image} = req.body;
          // const {name, quantity, description, price, category} = req.body;
          // const imageURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
                   // Log req.file to check if multer is properly parsing the uploaded file
                   console.log(req.file);

                   // Ensure that req.file is properly populated with the uploaded file data
                   if (!req.file) {
                        return res.status(400).json({ success: false, msg: 'No file uploaded' });
                   }
         
                   // Construct imageURL using the filename provided by multer
                   const imageURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

          const proiduct = new productmodels({
               name,
               quantity,
               description,
               price,
               category,
               image: imageURL
          });

          await proiduct.save();

          res.status(201).json({
               success: true,
               msg: "Product saved successfully"
          });

     } catch (error) {
          res.status(500).json({
               success: false,
               error: error.message
          });
     }
};

export const getProducts = async (req, res) => {
     try {
          const allProducts = await productmodels.find();
          console.log(allProducts);
          res.json(allProducts);
          
     } catch (error) {
          res.status(404);
          res.end(error);
     }
}