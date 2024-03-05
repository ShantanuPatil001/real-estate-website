import axios from "axios";
const login = async (loginData) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post("/api/login", { token: loginData })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getList = () => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get("/action/list", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`,
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

const uploadImages = async (images) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .put("/action/upload", images, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`,
        },
      })
      .then((response) => {
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

const addData = async (data) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .post("/action/add", data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`,
        },
      })
      .then((response) => {
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

const deleteData = async (id) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .delete(`/action/delete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`,
        },
      })
      .then((response) => {
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

const deleteImage = async (id, fileName, key) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .delete(`/action/delete/${id}/${fileName}/${key}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`,
        },
      })
      .then((response) => {
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

const updateData = async (id, data) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .patch(`/action/update?id=${id}`, data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`,
        },
      })
      .then((response) => {
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

const setMaintenanceMode = async (data) => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get(`/action/maintenance/${data.enable}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`,
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


const getMaintenanceMode = async () => {
  return new Promise(async (resolve, reject) => {
    await axios
      .get("/action/get-maintenance", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("auth")}`,
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

export {
  login,
  getList,
  uploadImages,
  addData,
  deleteData,
  deleteImage,
  updateData,
  setMaintenanceMode,
  getMaintenanceMode,
};
