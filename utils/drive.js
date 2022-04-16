
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const dotenv = require("dotenv");
const { myOAuth2Client } = require('./google');
dotenv.config();

myOAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
})