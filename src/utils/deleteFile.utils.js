const fs = require("fs");

const deleteFile = (fileName) => {
  fs.unlink("../backend/src/uploads/" + fileName, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = deleteFile;
