const AWS = require("aws-sdk");
const { awsAuth } = require("../authentication/aws.json");

const s3 = new AWS.S3({
  accessKeyId: awsAuth.aws_access_key_id,
  secretAccessKey: awsAuth.aws_secret_access_key,
  useAccelerateEndpoint: true
});
