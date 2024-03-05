import axios from "axios";
import { setClientInfo } from "../../REST/AllRequestResponse";

// get ip and set all details in cookie
const addInfo = async (id) => {
  const { ip } = await axios
    .get(
      "https://api.freegeoip.app/json/?apikey=551a2cb0-91ab-11ec-a671-23c2e92514db"
    )
    .then((res) => {
      return res.data;
    });
    setClientInfo(id, ip);
};



// get all cookies to json object
const getAllCookies = () => {
  let cookies = document.cookie.split(";");
  let cookieObject = {};
  if (cookies.length > 0) {
    cookies.forEach((cookie) => {
      let key = cookie.split("=")[0].trim();
      let value = cookie.split("=")[1].trim();
      cookieObject[key] = value;
    });
  }
  return cookieObject;
};

// get cookie by key
const getCookie = (key) => {
  let cookies = document.cookie.split(";");
  let cookieObject = {};
  if (cookies.length > 0 && cookies[0] !== "") {
    cookies.forEach((cookie) => {
      let key = cookie.split("=")[0].trim();
      let value = cookie.split("=")[1].trim();
      cookieObject[key] = value;
    });
  }
  return cookieObject[key];
};

//set cookie
const setCookie = (key, value) => {
  if (key === "movie_modal") {
    document.cookie = `${key}=${value};expires=${new Date(
      Date.now() + 480 * 1000
    ).toUTCString()};path=/`;
  } else {
    document.cookie = `${key}=${value};path=/`;
  }
};

export { addInfo, getAllCookies, getCookie, setCookie };
