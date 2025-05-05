const checkAuthMiddleWare = async (req, res, next) => {
  console.log('hit on middleware');
  
  let token = req.cookies.token;
  console.log(token , "from middleware") // here the toekn accessed 
  
  if (! token) {
    return res.status(401).json({ 
      message: "You are not authenticated to log in. Only the Owner of the website can authenticate to log in." 
    });
  }
  req.user = token; // will i perse the token in every request ?
  next();
};

export default checkAuthMiddleWare