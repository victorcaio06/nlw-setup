import Fastify from "fastify";

const app = Fastify({logger: true});

app.get('/', async (request, reply) => {
  return 'helloWorld';
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