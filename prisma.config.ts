// prisma.config.ts
// Move your database connection URL and other config here for Prisma 7+

export default {
  datasource: {
    url: process.env.DATABASE_URL, // or your actual connection string
  },
};
