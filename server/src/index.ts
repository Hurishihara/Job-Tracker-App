import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { router } from './routes/route';
import cors from '@elysiajs/cors';

const app = new Elysia()
  .use(cors({
    origin: '*',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposeHeaders: ['Set-Cookie']
  }))
  .use(swagger())
  .use(router)
  .listen(8000); 

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
