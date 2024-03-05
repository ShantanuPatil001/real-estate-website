const { default: axios } = require("axios");
const { firestoreDb } = require("../config/firebaseConfig");
const { setCache } = require("../model/CacheModel");

exports.validateMobileOnlyIndia = async (mobile) => {
  const {
    valid,
    number,
    local_format,
    //   international_format,
    //   country_prefix,
    //   country_code,
    country_name,
    location,
    carrier,
  } = await axios
    .get(
      `https://numlookupapi.com/api/validate/${mobile}?apikey=f1f71700-91ad-11ec-aa45-7f664367994e`
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
  return { valid, number, country_name, location, carrier, local_format };
};

exports.getIpInfo = async (ipAddress) => {
  console.log("getIpInfo()");
  console.log(ipAddress);
  const {
    ip,
    country_code,
    country_name,
    region_code,
    region_name,
    city,
    zip_code,
    time_zone,
    latitude,
    longitude,
  } = await axios
    .get(
      `https://api.freegeoip.app/json/${ipAddress}?apikey=551a2cb0-91ab-11ec-a671-23c2e92514db`
    )
    .then((res) => {
      return res.data;
    });
  return {
    ip,
    country_name,
    region_name,
    city,
  };
};

exports.addEnquiry = async (addInfo, id) => {
  console.log("addEnquiry()");
  return await firestoreDb
    .collection("enquiry-list")
    .doc(id)
    .set(addInfo)
    .then((docRef) => {
      return {
        status: true,
        message: "Enquiry added",
      };
    })
    .catch((error) => {
      reject(error);
    });
};
