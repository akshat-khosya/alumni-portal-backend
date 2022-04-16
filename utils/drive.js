const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const { myOAuth2Client } = require("./google");
dotenv.config();

myOAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: myOAuth2Client,
});

const createFolder = async(name) => {
  
  var folderId = process.env.FOLDER_ID;
  
  var fileMetadata = {
    name: name,
    mimeType: "application/vnd.google-apps.folder",
    parents: [folderId],
  };
  const res=await drive.files.create(
    {
      resource: fileMetadata,
      fields: "id",
    });
    return res.data;
  
};
// module.exports = { createFolder };
exports.createFolder=createFolder;