import { user } from '../model/user.model.js';

export const addCartData = async (req, res) => {
  try {
    const { id } = req.params;

    
    const User = await user.findById(req.user._id);

    if (!User) {
      return res.status(400).json({
        message: "User not logged in",
      });
    }

     
    if (!User.cartArray) {
      User.cartArray = [];
    }

    
    if (User.cartArray.includes(id)) {
      return res.status(400).json({
        message: "This product is already in your cart",
      });
    }

     
    User.cartArray.push(id);
    
    await User.save();

    
    return res.status(201).json({
      message: "Added to cart",
      cartArray: User.cartArray, 
    });
  } catch (error) {
    console.error("Error in addCartData:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
