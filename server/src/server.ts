import cors from '@fastify/cors';
import Fastify from 'fastify';

import { AppRoutes } from './routes';

const app = Fastify({ logger: true });

app.register(cors);

app.register(AppRoutes);

const start = async (): Promise<void> => {
  const address = 3333;

  try {
    app.listen({ port: address });
  } catch (err) {
    app.log.error(err);
  }
};

start();
