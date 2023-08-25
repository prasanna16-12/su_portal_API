
const sendRegLink = (req, res, next) => {
let permissions = JSON.parse(req.user_info.Permission_ID)
  if (permissions.includes("SL01")) {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied!",
    });
  }
};

module.exports = sendRegLink;
