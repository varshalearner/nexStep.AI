/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://nexStep.AI_owner:LeHS6bcGQUV5@ep-sweet-snow-a554zbt7.us-east-2.aws.neon.tech/nexStep.AI?sslmode=require',
    }
  };