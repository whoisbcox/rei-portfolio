const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const dotenv = require('dotenv');

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3Client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion
});

function s3Middleware(req, res, next) {
  req.s3 = s3Client;
  req.s3PutObjectCommand = PutObjectCommand;
  req.s3GetObjectCommand = GetObjectCommand;
  req.bucketName = bucketName;

  next();
}

module.exports = s3Middleware;
