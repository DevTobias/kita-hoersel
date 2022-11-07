import fastify from 'fastify';
import { fastifyStatic } from '@fastify/static';
import { fastifyHelmet } from '@fastify/helmet';
import { join } from 'path';
import fs from 'fs';

const frontendPath = process.env.CLIENT_PATH ?? '../../frontend/dist';

const bootstrap = async () => {
  const server = fastify({ logger: true });

  await server.register(import('@fastify/compress'), { encodings: ['br', 'gzip'] });

  await server.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", "'unsafe-inline'"],
        scriptSrcElem: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'", 'https://tobias-kaerst.de', 'https://admin.tobias-kaerst.de'],
      },
    },
  });

  await server.register(fastifyStatic, { root: join(__dirname, frontendPath) });

  server.setNotFoundHandler((_, reply) => {
    const stream = fs.createReadStream(join(__dirname, frontendPath, '404.html'));
    reply.type('text/html').send(stream);
  });

  server.listen({ port: 8080, host: '0.0.0.0' });
};

bootstrap();
