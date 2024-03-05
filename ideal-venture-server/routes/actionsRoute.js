const {
  addPropertyController,
  uploadImagesController,
  deletePropertyController,
  updatePropertyController,
  deletefileNameController,
  getListPropertiesController,
  maintenanceController,
  getMaintenanceController,
} = require("../controller/actionsController");

const router = require("express").Router();

router.post("/add", addPropertyController);

router.patch("/update", updatePropertyController);

router.delete("/delete", deletePropertyController);

router.delete("/delete/:id/:name/:key", deletefileNameController);

router.put("/upload", uploadImagesController);

router.get("/list", getListPropertiesController);


router.get("/maintenance/:enable", maintenanceController);

router.get("/get-maintenance", getMaintenanceController);

module.exports = router;