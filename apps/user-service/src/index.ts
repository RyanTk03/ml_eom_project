import env from "./libs/env";
import { buildServer } from "./server";

const start = () => {
  const server = buildServer();

  server.listen({ port: env.PORT }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
};

start();
