import { Knex } from './server/database/knex';
import { server } from './server/Server';

const PORT = process.env.PORT || 3333;

const startServer = () => {
  server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
};


if (process.env.IS_LOCALHOST !== 'true') {
  Knex.migrate.latest().then(() => {
    Knex.seed.run().then(() => startServer())
      .catch(console.log);
  })
    .catch(console.log);
} else {
  startServer();
} 