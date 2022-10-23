import fastify from 'fastify';
import { fastifyStatic } from '@fastify/static';
import { fastifyHelmet } from '@fastify/helmet';
import { join } from 'path';

const frontendPath = process.env.CLIENT_PATH ?? '../../frontend/dist';

const bootstrap = async () => {
  const server = fastify({ logger: true });

  await server.register(import('@fastify/compress'), { encodings: ['br', 'gzip'] });

  await server.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", "'unsafe-inline'"],
        scriptSrcElem: ["'self'", "'unsafe-inline'"],
      },
    },
  });

  await server.register(fastifyStatic, { root: join(__dirname, frontendPath) });

  server.listen({ port: 8080, host: '0.0.0.0' });
};

bootstrap();
