import jwt from "jsonwebtoken";

function verifyToken(req, res, next){
    // checking the token
    const token = req.cookies.token
    if (!token){
        return res.status(401).json({message:"Wrong Email or Password"})
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode;
        next()
    } catch (error) {
        res.status(403).json({ message: "Token has been Expierd" });
    }
}
export default verifyToken