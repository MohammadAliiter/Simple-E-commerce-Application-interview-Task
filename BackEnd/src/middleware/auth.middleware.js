import jwt from 'jsonwebtoken';
import { user } from '../ConnectDb/model/user.model.js';

export const jwtAuth = async (req, res, next) => {
  try {
    
    const token = req.cookies.jwt_Tocken;

   

   
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized Error' });
    }

    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETE);

     
    if (!decodedToken) {
      return res.status(401).json({ error: 'Token is not valid' });
    }

      console.log("decodedToken",decodedToken)
    const userDoc = await user.findById(decodedToken.uid);

    console.log("userDoc",userDoc)
    if (!userDoc) {
      return res.status(401).json({ error: 'User does not exist' });
    }

    req.user = userDoc;
    next();
  } catch (error) {
    console.error('JWT Auth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
