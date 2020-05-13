export const config = {
  username!: process.env.POSTGRESS_USERNAME,
  password!: process.env.POSTGRESS_PASSWORD,
  database!: process.env.POSTGRESS_DB,
  host!: process.env.POSTGRESS_HOST,
  awsReigion!: process.env.AWS_REGION,
  awsProfile!: process.env.AWS_PROFILE,
  awsMediaBucket!: process.env.AWS_BUCKET,
  url!: process.env.URL,
  jwt: {
    secret!: process.env.JWT_SECRET
  }
}
