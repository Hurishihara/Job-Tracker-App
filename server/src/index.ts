import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { router } from './routes/route';
import cors from '@elysiajs/cors';
import betterAuthView from './utils/auth-view';
import staticPlugin from '@elysiajs/static';


const app = new Elysia()
  .use(cors({
    origin: ['http://localhost:5173', 'https://traqify-uqkb.onrender.com', 'https://traqify.live'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }))
  .use(swagger({
    documentation: {
      info: {
        title: 'Job Tracker API',
        description: 'API documentation for the Job Tracker application',
        version: '1.0.0',
      },
      tags: [
        { name: 'Authentication', description: 'Authentication related endpoints' },
        { name: 'Job Application', description: 'Job application related endpoints' },
        { name: 'Charts', description: 'Charts related endpoints' },
      ],
      components: {
        securitySchemes: {
          sessionAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'sync.session_token',
            description: 'Session token for authentication',
          }
        }
      }
    },
    path: '/documentation/swagger'
  }))
  .all('/api/auth/*', betterAuthView)
  .use(router)
  .listen(process.env.PORT || 8000); 

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
