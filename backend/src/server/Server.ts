import express from 'express';
import cors from 'cors';
import './shared/services/YupTranslactions';
import 'dotenv/config';

import { router } from './routes';

const server = express();

server.use(cors());
server.use(express.json());
server.use(router);

export { server };