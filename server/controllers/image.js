const AWS = require("aws-sdk");
const express = require("express");
const router = express.Router();
require("dotenv").config();

// AWS S3 configuration
const bucketName = process.env.S3_BUCKET_NAME;
const credentials = new AWS.Credentials({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});
AWS.config.credentials = credentials;

// Get all list from bucket
const listObjects = (bucket) => {
  const listObjects = new Promise((resolve, reject) => {
    bucket.listObjects((error, data) => {
      error ? console.log(error) : resolve(data.Contents);
    });
  });
  return listObjects;
};

// Get all file from list
const getSingleObject = (bucket, key) => {
  const getSingleObject = new Promise((resolve, reject) => {
    bucket.getObject({ Bucket: bucketName, Key: key }, (error, data) => {
      error ? console.log(error) : resolve(data.Body.toString("base64"));
    });
  });
  return getSingleObject;
};

router.post("/", async (req, res) => {
  const email = req.body.email;
  const bucket = new AWS.S3({
    params: {
      Bucket: bucketName,
      Prefix: `${email}/`
    }
  });

  const image = await listObjects(bucket)
  .then(result => result.map(elem => getSingleObject(bucket, elem.Key)))
  .then(result => Promise.all(result));
  
  // Send image with base64
  res.send(image);
});

module.exports = router;
