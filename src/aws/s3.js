import AWS from 'aws-sdk'
import config from '../config'

export default new AWS.S3({
   credentials: {
      accessKeyId: config.awsId,
      secretAccessKey: config.awsSecret,
   },
   region: config.awsRegion,
   params: {
      ACL: 'public-read',
      Bucket: config.awsBucketName,
   },
})
