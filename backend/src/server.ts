import fastify from 'fastify';
import { fastifyStatic } from '@fastify/static';
import { fastifyHelmet } from '@fastify/helmet';
import astro from '@kita-hoersel/frontend';
import { join } from 'path';
import fastifyExpress from '@fastify/express';

const frontendPath = join(__dirname, '../../frontend/dist/client');

const bootstrap = async () => {
  const server = fastify({ logger: true });

  await server.register(fastifyExpress);
  await server.register(fastifyHelmet);
  await server.register(fastifyStatic, { root: frontendPath });

  await server.use((await astro()).handler);

  server.listen({ port: 8080 }, (_, address) => {
    console.log(`server listening on ${address}`);
  });
};

bootstrap();
