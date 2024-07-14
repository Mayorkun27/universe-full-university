import express from "express";
import mongoose from "mongoose";
import facultymodels from "../models/facultymodels.js";

// For Create Product
export const facultyUpload = async (req, res) => {
     try {
          const {name, courses1, courses2, courses3,courses4, courses5} = req.body;
          const faculty = new facultymodels({
               name,
               courses1,
               courses2,
               courses3,
               courses4,
               courses5
          });
          await faculty.save();

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

export const getfaculty = async (req, res) => {
     try {
          const faculty = await facultymodels.find();
          res.status(200).json({
               success: true,
               data: faculty
          });
     } catch (error) {
          res.status(404);
          res.end(error);
     }
}