import dotenv from 'dotenv';
dotenv.config();

export default {
  app: {
    port: Number(process.env.PORT || 3000),
    siteUrl: process.env.SITE_URL,
  },
  twitch: {
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
  },
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN,
  },
};
