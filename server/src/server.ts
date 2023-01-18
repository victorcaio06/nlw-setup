import Fastify from "fastify";
import {PrismaClient} from '@prisma/client';
import cors from "@fastify/cors";

const app = Fastify({logger: true});

const prisma = new PrismaClient();

app.register(cors);

app.get('/', async (request, reply) => {
  const habits = await prisma.habit.findMany();

  reply.send(habits);
});

const start = async (): Promise<void> => {
  const address = 3333;

  try {
    app.listen({port: address});

  } catch(err) {
    app.log.error(err);
  }
}

start();