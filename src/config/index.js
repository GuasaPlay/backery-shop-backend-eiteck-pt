import dotenv from 'dotenv'

dotenv.config()

const config = {
   mondoUri: process.env.MONGO_URI,
   port: process.env.PORT,
   tokenKey: process.env.TOKEN_KEY,

   awsRegion: process.env.AWS_REGION,
   awsId: process.env.AWS_ID,
   awsSecret: process.env.AWS_SECRET,
   awsBucketName: process.env.AWS_BUCKET_NAME,
}

export default config
