import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { router } from './routes/route';
import cors from '@elysiajs/cors';
import betterAuthView from './utils/auth-view';
import { auth } from './utils/auth';
import { betterAuthMiddleware } from './middlewares/auth-middleware';

const app = new Elysia()
  .use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }))
  .use(swagger({
    
  }))
  .all('/api/auth/*', betterAuthView)
  .use(router)
  .listen(8000); 

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
