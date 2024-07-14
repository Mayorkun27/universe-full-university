import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
     const token = req.headers.authorization.split(' ')[1];

     if (!token) {
           return res.status(401).send({
           success: false,
           msg: 'Authorization token missing' 
           });
     }
 
     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
         if (err) {
                return res.status(401).send({
                success: false,
                msg: 'Token expired or invalid'
                });
         }
 
         req.user = decoded;
         next();
     });
 };