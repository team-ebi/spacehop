const aws = require("aws-sdk");
const express = require("express");
const router = express.Router();
require("dotenv").config();

// AWS S3 configuration
const bucketName = process.env.S3_BUCKET_NAME;
const credentials = new aws.Credentials({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});
aws.config.credentials = credentials;

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

// Get image by email
router.post("/", async (req, res) => {
  const email = req.body.email;
  const bucket = new aws.S3({
    params: {
      Bucket: bucketName,
      Prefix: `${email}/`
    }
  });

  const image = await listObjects(bucket)
  .then(result => result.map(elem => getSingleObject(bucket, elem.Key)))
  .then(result => Promise.all(result.slice(1)));
  
  // Send image with base64
  res.send(image);
});

module.exports = router;
