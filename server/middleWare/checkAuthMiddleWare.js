const checkAuthMiddleWare = async (req, res, next) => {
  console.log('hit on middleware');
  
  let token = req.cookies.token;
  console.log(token)
  
  if (! token) {
    return res.status(401).json({ 
      message: "You are not authenticated to log in. Only the Owner of the website can authenticate to log in." 
    });
  }
  
  next();
};

export default checkAuthMiddleWare