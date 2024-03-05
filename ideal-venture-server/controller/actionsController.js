const NodeCache = require("node-cache");
const { clearUploadsFolders } = require("../middleware/ClearUploadsFolders");
const { setCache, deleteCache, getCache } = require("../model/CacheModel");
const {
  addNewProperty,
  deleteProperty,
  updateProperty,
  deleteImagefromProperties,
  getListProperties,
} = require("../service/actionsService");
const {
  uploadImages,
  generateUploadUrls,
  deleteImageFile,
} = require("../service/filesService");

exports.getListPropertiesController = async (req, res) => {
  console.log("getListPropertiesController");
  let listwithID = req.query.id;
  if (listwithID !== undefined && listwithID !== null) {
    try {
      let checkListProperties = await getListProperties(listwithID);

      if (checkListProperties) {
        res.status(200).json({
          status: true,
          message: "List of properties",
          listProperties: checkListProperties,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "List of properties failed",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "List of properties failed",
      });
    }
  } else {
    try {
      let list = await getListProperties(-1);
      if (list !== undefined && list !== null) {
        setCache("list", list);
        res.status(200).json({
          status: true,
          message: "List of properties",
          properties: list,
        });
      } else {
        res.status(400).json({
          status: false,
          message: "List of properties failed",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: "List of properties failed",
      });
    }
  }
};

exports.addPropertyController = async (req, res) => {
  let addPropertyData = req.body;
  try {
    if (addPropertyData !== undefined || addPropertyData !== null) {
      let checkAddProperty = await addNewProperty(addPropertyData);
      if (checkAddProperty) {
        res.status(200).json({
          status: true,
          message: "Property added successfully",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Property failed to Add",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message: "Property failed to Add",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Property failed to Add",
    });
  }
};

exports.uploadImagesController = async (req, res) => {
  let files = req.files;
  if (files !== undefined || files !== null) {
    let { status, imageUrls } = await uploadImages(files);
    if (!status) {
      res.status(400).json({
        status: false,
        message: "Image upload failed",
      });
    }
    let { uploadUrls, fileStatus } = await generateUploadUrls(imageUrls);
    if (fileStatus) {
      console.log("109::::::: ", uploadUrls);
      res.status(200).json({
        status: true,
        message: "Images uploaded successfully",
        fileUrls: uploadUrls,
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Images failed to upload",
      });
    }
  } else {
    res.status(400).json({
      status: false,
      message: "Images failed to upload",
    });
  }
};

exports.deletePropertyController = async (req, res) => {
  let propertyId = req.query.id;
  console.log(propertyId);
  try {
    if (propertyId !== undefined || propertyId !== null) {
      let checkDeleteProperty = await deleteProperty(propertyId);
      console.log(checkDeleteProperty);
      if (checkDeleteProperty) {
        deleteCache("list");
        res.status(200).json({
          status: true,
          message: "Property deleted successfully",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Property failed to delete",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message: "Property failed to delete",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Property failed to delete",
    });
  }
};

exports.updatePropertyController = async (req, res) => {
  let propertyId = req.query.id;
  let updatePropertyData = req.body;
  try {
    if (
      propertyId !== undefined ||
      propertyId !== null ||
      updatePropertyData !== undefined ||
      updatePropertyData !== null
    ) {
      let checkUpdateProperty = await updateProperty(
        propertyId,
        updatePropertyData
      );
      if (checkUpdateProperty) {
        deleteCache("list");
        res.status(200).json({
          status: true,
          message: "Property updated successfully",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Property failed to update",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message: "Property failed to update",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Property failed to update",
    });
  }
};

exports.deletefileNameController = async (req, res) => {
  let fileName = req.params.name;
  let propertyId = req.params.id;
  let key = req.params.key;
  try {
    if (
      fileName !== undefined ||
      fileName !== null ||
      propertyId !== undefined ||
      propertyId !== null
    ) {
      let deleteImageRecord = await deleteImagefromProperties(
        propertyId,
        fileName,
        key
      );
      let checkDeleteFile = await deleteImageFile(fileName);
      if (checkDeleteFile && deleteImageRecord) {
        deleteCache("list");
        res.status(200).json({
          status: true,
          message: "Image deleted successfully",
        });
      } else {
        res.status(400).json({
          status: false,
          message: "Image failed to delete",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        message: "Image failed to delete",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: "Image failed to delete",
    });
  }
};
let maintenanceMode = false;

exports.maintenanceController = async (req, res) => {
  console.log("maintenance :::::::::::::::: ",req.params);
  let { enable } = req.params;
  console.log("enable :::::::: ",enable);
  if (enable) {
    maintenanceMode = true;
    let list = await getListProperties(-1);
    setCache("publicList", list);
    res.status(200).json({
      status: true,
      message: "Maintenance mode enabled",
    });
  } else if (enable === false) {
    maintenanceMode = false;
    deleteCache("publicList");
    res.status(200).json({
      status: false,
      message: "Maintenance mode disabled",
    });
  } else {
    res.status(400).json({
      status: false,
      message: "Maintenance mode failed",
    });
  }
  res.end();
}

exports.getMaintenanceController =  (req, res) => {
  let maintenance = getCache("maintenance");
  console.log("getMaintenace :::::: ",maintenance)
  if (maintenance) {
    res.status(200).json({
      status: true,
      message: "Maintenance mode enabled",
    });
  } else {
    res.status(200).json({
      status: false,
      message: "Maintenance mode disabled",
    });
  }
};
