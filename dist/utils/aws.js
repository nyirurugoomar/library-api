"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImages = uploadImages;
const aws_sdk_1 = require("aws-sdk");
async function uploadImages(files) {
    return new Promise((resolve, reject) => {
        try {
            const s3 = new aws_sdk_1.S3({
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_KEY,
                region: 'us-east-1'
            });
            const images = [];
            files.forEach(async (file) => {
                const filename = file.originalname;
                const params = {
                    Bucket: `${process.env.AWS_S3_BUCKET_NAME}/books`,
                    Key: filename,
                    Body: file.buffer,
                };
                const uploadResponse = await s3.upload(params).promise();
                images.push({
                    Bucket: uploadResponse.Bucket,
                    Key: uploadResponse.Key,
                    Location: uploadResponse.Location,
                });
                if (images?.length === files.length)
                    resolve(images);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
//# sourceMappingURL=aws.js.map