const { CLIENT_IP, PRIVATE_KEY } = require("../config/constants");
const { setCache, getCache } = require("../model/CacheModel");
const { getListProperties } = require("../service/actionsService");
const { getIpInfo, validateMobileOnlyIndia, addEnquiry } = require("../service/publicService");

exports.publicListingController = async (req, res, next) => {
  console.log("publicListingController");
  try {
    let publicList = await getListProperties(-1);

    if (publicList) {
      setCache("publicList", publicList);
      return res.status(200).json({
        status: true,
        message: "List of properties",
        listProperties: publicList,
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "List of properties failed",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: "List of properties failed",
    });
  }
};

exports.enquiryController = async (req, res) => {
  console.log("enquiryController");
  try {
    const { name, mobile, id } = req.query;
    if (mobile !== null && mobile !== undefined) {
      let mobileForValidation = "+91" + mobile;
      const response = await validateMobileOnlyIndia(mobileForValidation);
      console.log(response);
      if (response.valid) {
        console.log(getCache(id));
        const ipAddress = await getCache(id);
        const location = await getIpInfo(ipAddress);
        const addInfo = {
          name: name,
          mobile: mobile,
          country_name: location.country_name,
          region_name: location.region_name,
          city: location.city,
        };
        console.log(addInfo);
        await addEnquiry(addInfo,id)
          .then((response) => {
            console.log(response);
            return res.status(200).json({
              status: true,
              message: "Enquiry added",
            });
          })
          .catch((error) => {
            return res.status(400).json({
              status: false,
              message: "Enquiry failed",
            });
          });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({
      status: false,
      message: "Enquiry failed",
    });
  }
};

exports.privateKeyController = async (req, res) => {
  try {
    console.log("private key adding to cache");
    const { id, ip } = req.query;
    setCache(id, ip);
    console.log(getCache(id));
    res.status(200).json({
      status: true,
      message: "done",
    });
  } catch (error) {
    return res.status(200).json({
      status: true,
    });
  }
};
