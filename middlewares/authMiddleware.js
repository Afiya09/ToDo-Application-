const JWT = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).send({
      success: false,
      message: "Please provide Auth token",
    });
  }

  let decode;
  try {
    //get token bearer
    decode = JWT.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({
      success: false,
      message: "Please provide Auth token",
      error,
    });
  }
  req.user = { id: decode.id };
  next();
};
