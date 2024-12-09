import jwt from "jsonwebtoken";

export const genrateAcessTocken = async (uid, res) => {
  try {
    const tocken = jwt.sign({ uid }, process.env.JWT_SECRETE, {
      expiresIn: process.env.EXPIRY,
    });
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(201).cookie("jwt_Tocken", tocken, options);
  } catch (error) {}
};
