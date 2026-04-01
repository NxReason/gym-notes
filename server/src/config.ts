export default () => ({
  port: parseInt(process.env.PORT ?? '', 10) || 3000,
  db: {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    port: parseInt(process.env.DB_PORT ?? '', 10) || 5432,
    host: process.env.DB_HOST ?? 'localhost',
  },
});
