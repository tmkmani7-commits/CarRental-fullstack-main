import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    if(!token){
        return res.json({success: false, message: "not authorized"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = typeof decoded === "string" ? decoded : decoded?._id || decoded?.id;

        if(!userId){
            return res.json({success: false, message: "not authorized"})
        }

        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.json({success: false, message: "not authorized"})
        }

        req.user = user;
        next();
    } catch (error) {
        return res.json({success: false, message: "not authorized"})
    }
}