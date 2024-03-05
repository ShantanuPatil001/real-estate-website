const { bucket } = require("../config/firebaseConfig");

exports.uploadImages = async (images) => {
  console.log("Uploading images");
  console.log(images);
  let imageUrls = new Array(images.length);
  let imageUploadStatus = new Array(images.length);
  let i = 0;
  for await (let image of images) {
    console.log(image);
    imageUrls[i] = `${new Date().getTime()}_${image.originalname}`;
    let blob = bucket.file(`${new Date().getTime()}_${image.originalname}`);
    let blobStream = blob.createWriteStream({
      metadata: {
        contentType: image.mimetype,
      },
    });
    blobStream.on("error", (err) => {
      console.log(err);
    });
    blobStream.on("finish", () => {
      console.log("The file has been uploaded");
      imageUploadStatus[i] = true;
    });
    blobStream.end(image.buffer);
    i++;
  }
  let status = imageUploadStatus.filter((status) => {
    if (status === false) {
      return false;
    }
  });
  return {status, imageUrls};
};
  

  


exports.generateUploadUrls = async (images) => {
  console.log("Generating upload urls");
  let uploadUrls = [];
  let fileStatus = true;
  console.log("images Array ::::::: ", images);
  for (let i = 0; i < images.length; i++) {
    let imageName = images[i];
    let uploadUrl = await bucket.file(imageName).getSignedUrl({
      action: "read",
      expires: "03-09-2025",
    }).catch((error) => {
      fileStatus = false;
      console.log(error);
    });
    uploadUrls[i] = {
      url: uploadUrl[0],
      name: imageName,
    };
    console.log("UploadURLSs::::   ", uploadUrls[i]);
  }
  return { uploadUrls, fileStatus };
};

exports.deleteImages = async (images) => {
  console.log("Deleting images");
  let i;
  try {
    for (i = 0; i < images.length; i++) {
      let imageName = images[i].name;
      await bucket.file(imageName).delete();
    }
    return true;
  } catch (error) {
    console.log(`Error deleting image ${i}`);
    return false;
  }
};

exports.deleteImageFile = async (imageName) => {
  console.log("Deleting image file");
  try {
    await bucket.file(imageName).delete();
    return true;
  } catch (error) {
    console.log(`Error deleting image file`);
    return false;
  }
};
