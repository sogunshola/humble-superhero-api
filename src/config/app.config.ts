import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  appName: process.env.APP_NAME,
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV,
}));
