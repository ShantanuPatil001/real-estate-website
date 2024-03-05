const { publicListingController, enquiryController, privateKeyController } = require("../controller/publicController");

const router = require("express").Router();


router.get('/list', publicListingController);

router.get("/info", privateKeyController);

router.get("/add-info", enquiryController);





module.exports = router;