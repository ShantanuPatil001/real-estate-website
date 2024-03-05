const { checkCache, getCache } = require("../model/CacheModel");

exports.verifyCache = (req, res, next) => {
  //console.log("maxListeners : ", app.getMaxListeners());
  try {
    
    if (req.path === "/public/v1/list") {
      if (checkCache("publicList")) {
        //console.log("Cache hit ::::: ",getCache("publicList"));
        return res.json({
          status: 200,
          data: getCache("publicList"),
          message: "Data fetched from cache",
        });
        
      } else {
        return next();
      }
    } else {
      const id = req.path.split("/")[2];
      if (checkCache(id)) {
        console.log("sending cached result");
        return res.status(200).json(getCache(id));
      }
      return next();
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
