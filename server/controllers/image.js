const aws = require("aws-sdk");
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
require("dotenv").config();

router.use(fileUpload());

// AWS S3 configuration
const bucketName = process.env.S3_BUCKET_NAME;
aws.config.credentials = new aws.Credentials({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
});

// Get all folder from bucket
const listObjects = (bucket) => {
  const listObjects = new Promise((resolve, reject) => {
    bucket.listObjects((error, data) => {
      error ? console.error(error) : resolve(data.Contents);
    });
  });
  return listObjects;
};

// Get all file from folder
const getSingleObject = (bucket, key) => {
  const getSingleObject = new Promise((resolve, reject) => {
    bucket.getObject({ Bucket: bucketName, Key: key }, (error, data) => {
      error ? console.error(error) : resolve(data.Body.toString("base64"));
    });
  });
  return getSingleObject;
};

// Save images inside folder
const saveObject = (bucket, params) => {
  const saveObject = new Promise((resolve, reject) => {
    bucket.putObject(params, (error, data) => {
      error ? console.error("error: ", error) : resolve(data);
    });
  });
  return saveObject;
}

// Delete folder
const deleteObjects = (bucket, objects) => {
  const deleteObjects = new Promise((resolve, reject) => {
    bucket.deleteObjects({ Delete: { Objects: objects, Quiet: true }}, (error, data) => {
      error ? console.error("error: ", error) : resolve(data);
    });
  });
  return deleteObjects;
}

// Get images by business id
router.get("/:id", async (req, res) => {
  const folderName = req.params.id;
  const bucket = new aws.S3({
    params: {
      Bucket: bucketName,
      Prefix: `${folderName}/`
    }
  });

  const images = await listObjects(bucket)
  .then(result => result.map(elem => getSingleObject(bucket, elem.Key)))
  .then(result => Promise.all(result));
  
  // Send images with base64
  res.send(images);
});

// Post image by business id
router.post("/:id", async (req, res) => {
  const folderName = req.params.id;
  const fileName = req.files.image.name;
  const imageData = Buffer.from(req.files.image.data, "binary");

  const bucket = new aws.S3({
    params: {
      Bucket: bucketName,
    }
  });
  const params = {
    Key: `${folderName}/${fileName}`,
    Body: imageData,
    ACL: "public-read",
  }

  saveObject(bucket, params);

  res.send("Upload image success");
});

// Delete folder by business id
router.delete("/:id", async (req, res) => {
  const folderName = req.params.id;
  const bucket = new aws.S3({
    params: {
      Bucket: bucketName,
      Prefix: `${folderName}/`
    }
  });

  await listObjects(bucket)
  .then(result => result.map(elem => ({ "Key": elem.Key }) ))
  .then(result => deleteObjects(bucket, result));

  res.send("Delete folder success");
});

module.exports = router;
