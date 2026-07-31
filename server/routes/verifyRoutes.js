import express from 'express'
import verifyToken from '../Middleware/verifyToken.js';

const router = express.Router()

router.get('/verify', verifyToken, (req, res) => {
    res.status(200).json({
        isAuthenticated: true, 
        userId: req.user.id 
    });
});

export default router;