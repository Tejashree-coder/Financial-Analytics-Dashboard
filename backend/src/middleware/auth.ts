import jwt from "jsonwebtoken";

export const verifyToken = (
  req: any,
  res: any,
  next: any
) => {
  try {
    // Authorization header check
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    // Bearer TOKEN se actual token nikalna
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Invalid token format.",
      });
    }

    // Token verify karna
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    // User information request me store karna
    req.user = decoded;

    // Next route par jaana
    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};