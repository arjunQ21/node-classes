import express from 'express'
import { config } from 'dotenv';
config();

const server = new express();

console.log(process.env.PORT)