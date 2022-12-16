import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () => {
  server.listen(process.env.PORT || 7777, () =>
  console.log(`App rodando na porta ${process.env.PORT || 5555}`)
);
}

if(process.env.IS_LOCALHOST !== "true") {
  Knex.migrate.latest().then(() => {
  startServer()
}).catch(console.log);
} else{
  startServer();
}

