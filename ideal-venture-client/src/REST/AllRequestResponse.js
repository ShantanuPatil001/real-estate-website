import axios from "axios";

const getListAll = () => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get("/public/v1/list", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 401) {
          sessionStorage.removeItem("auth");
          sessionStorage.removeItem("status");
        }
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          sessionStorage.removeItem("auth");
          sessionStorage.removeItem("status");
          alert("Your session has expired. Please login again.");
          window.location.reload();
        }
        reject(error);
      });
  });
};

const setClientInfo = (id, ip) => {
  return new Promise(async (resolve, reject) => {
    await axios.get(`/public/v1/info?id=${id}&ip=${ip}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
};

const addUserInfo = (name, mobile,id) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`/public/v1/add-info?id=${id}&name=${name}&mobile=${mobile}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      }); 
  });
};

export { getListAll, setClientInfo, addUserInfo };
