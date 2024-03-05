const fs = require("fs");

let dir = "uploads";

exports.clearUploadsFolders = () => {
  fs.readdir(dir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(dir + "/" + file, (err) => {
        if (err) throw err;
      });
    }
  });
};
