jsx;
import dotenv from 'dotenv';
dotenv.config();
const env = require('./config/env');
console.log('PORT:', env.PORT);
console.log('Mongo URI:', env.MONGO_URI);
console.log('JWT expires in:', env.JWT_EXPIRES_IN);
console.log('Email host:', env.EMAIL_HOST);
console.log('Stripe secret key:', env.STRIPE_SECRET_KEY);
