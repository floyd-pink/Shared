import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;
    const token = req.cookies?.token || bearer;

    if (!token) {
      return res.status(401).json({
        message: "User is not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT);
    if (!decoded) {
      return res.status(401).json({
        message: "Token expired or invalid",
        success: false,
      });
    }

    req.id = decoded.userid;
    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
      success: false,
      error: error.message,
    });
  }
};

export default isAuthenticated;
