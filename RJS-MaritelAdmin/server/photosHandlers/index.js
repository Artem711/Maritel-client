const { uploadToServer } = require('./uploadFile');
const { deletePhotosS3 } = require('./deletePhotosS3');

module.exports = {
  uploadToServer,
  deletePhotosS3
}