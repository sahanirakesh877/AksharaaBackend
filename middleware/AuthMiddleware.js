const jwt = require("jsonwebtoken");
const User = require("../Models/UserSchema");
const JWT_SECRETE_KEY = process.env.JWT_SECRETE_KEY || rolexbhai123; // Corrected variable name

const checkIsUserAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized, Please login",
    });
  }

  try {
    // Verify token
    const decodedData = jwt.verify(token, JWT_SECRETE_KEY);
    
    // Get user id from token
    const user = await User.findById(decodedData.userId); // Corrected field name
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    
    req.user = user; // Assign the found user to req.user
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { checkIsUserAuthenticated };
