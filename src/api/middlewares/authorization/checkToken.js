const { verify } = require("jsonwebtoken");

// Define middleware for validation
const validateToken = (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    //console.log(token);
    token = token.slice(7); //removing bearer from front
    verify(token, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
      if (error) {
        // If validation fails, send an error response
        return res.status(403).json({
          message: error,
        });
      } else {
        if (decoded.result.user_email === req.params.email.toLowerCase()) {
          // console.log(
          //   decoded.result.user_email,
          //   req.params.email.toLowerCase()
          // );
          return res.status(200).json({
            message: "Success",
          });
        } else {
          return res.status(401).json({
            message: "invalid token!",
          });
        }
      }
    });
  } else {
    return res.status(401).json({
      message: "Login again!",
    });
  }
};

module.exports = validateToken;
