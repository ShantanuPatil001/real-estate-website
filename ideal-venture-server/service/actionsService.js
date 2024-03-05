const { db } = require("../config/firebaseConfig");
const { deleteCache } = require("../model/CacheModel");
const { deleteImages } = require("./filesService");

exports.getListProperties = async (id) => {
  console.log("Getting list of properties");
  let list = [];
  let ref = db.ref("properties");
  if (id === -1 || id === undefined || id === null) {
    await ref.get().then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        list.push(childSnapshot.val());
      });
    });
    return list;
  } else if (id !== -1 && id !== undefined && id !== null) {
    ref = ref.child(id);
    await ref.once("value", (snapshot) => {
      list.push(snapshot.val());
    });
    return list;
  }
};

exports.addNewProperty = async (data) => {
  console.log("Adding new property");
  let status = false;
  const id = generatePropertyId();
  if ((await id) === -1) {
    return false;
  } else {
    data.id = await id;
  }
  let ref = db.ref("properties").child(data.id);
  await ref
    .set(data)
    .then(() => {
      console.log("Property added successfully");
      status = true;
      deleteCache("list");
    })
    .catch((error) => {
      console.log("Error adding property: ", error);
      status = false;
    });
  return status;
};

const generatePropertyId = async () => {
  console.log("Generating property id");
  let idCount = -1;
  let ref = db.ref("idCount");
  let count = ref.child("idCount");
  await count.once("value", (snapshot) => {
    idCount = snapshot.val();
  });
  if (idCount !== -1) {
    idCount++;
    await ref.child("idCount").set(idCount);
  }
  return idCount;
};

exports.deleteProperty = async (id) => {
  console.log(`Deleting property ${id}`);
  try {
    let ref = db.ref("properties").child(id);
    let images;
    let status = undefined;
    await ref.once("value", (snapshot) => {
      console.log(
        "::::::::: deleting images :::::::::::: ",
        snapshot.val().images
      );
      if (snapshot.val().images !== undefined) {
        images = snapshot.val().images;
      }
    });
    if (images !== undefined) {
      status = await deleteImages(images);
    }
    if (status === false && images !== undefined) {
      console.log("Error deleting property");
      return false;
    }
    await ref.remove();
    console.log("Property deleted successfully");
    return true;
  } catch (error) {
    console.log("Error deleting property: ", error);
    return false;
  }
};

exports.updateProperty = async (id, data) => {
  console.log(`Updating property ${id}`);
  let status = false;
  try {
    let ref = db.ref("properties").child(id);
    await ref
      .update(data)
      .then(() => {
        console.log("Property updated successfully");
        status = true;
      })
      .catch((error) => {
        console.log("Error updating property: ", error);
        status = false;
      });
  } catch (error) {
    console.log("Error updating property: ", error);
  } finally {
    return status;
  }
};

exports.deleteImagefromProperties = async (id, image, key) => {
  console.log(`Deleting image ${image} from property ${id}`);
  let status = false;
  try {
    let ref = db.ref("properties").child(id).child(key);
    let images;
    await ref.once("value", (snapshot) => {
      images = snapshot.val();
    });
    let newImages = images.filter((img) => img.name !== image);
    console.log("deleteImagefromProperties :::::::: ", newImages);
    await ref
      .set(newImages)
      .then(() => {
        console.log("Image deleted successfully");
        status = true;
      })
      .catch((error) => {
        console.log("Error deleting image: ", error);
        status = false;
      });
  } catch (error) {
    console.log("Error deleting image from property: ", error);
    status = false;
  } finally {
    return status;
  }
};
