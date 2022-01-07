import aws from 'aws-sdk'

const config = {
    "bucketName":"csm-assets",
    "region": "ap-south-1",
    "accessKeyId": "AKIAROAVIZKNEWGDAZFL",
    "secretAccessKey": "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",
    "signatureVersion": "v4"
}

export const bucketName = config.bucketName

export const s3 = new aws.S3({
    region: config.region,
    signatureVersion: config.signatureVersion,
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    Bucket: config.Bucket,
})


