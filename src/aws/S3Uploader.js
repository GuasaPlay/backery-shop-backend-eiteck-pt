import s3 from '../aws/s3'
const S3Uploader = async (Body, Key, ContentType) => {
   const { Key: fileId, Location: url } = await s3
      .upload({
         Body,
         Key,
         ContentType,
      })
      .promise()
   return { fileId, url }
}

export default S3Uploader
