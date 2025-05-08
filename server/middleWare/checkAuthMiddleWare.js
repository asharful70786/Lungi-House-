const checkAuthMiddleWare = async (req, res, next) => {
  let token = req.signedCookies.token;
  if (!token) {
    res.clearCookie("token");
    return res.status(401).json({
      message: "You are not authenticated to log in. Only the Owner of the website can authenticate to log in.",
    });
  }

  req.user = token; 
  next();
};

export default checkAuthMiddleWare;