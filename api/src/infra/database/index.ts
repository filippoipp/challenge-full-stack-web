import { createConnections, getConnection } from 'typeorm';

const nameDb = process.env.POSTGRES_DATABASE;

export const startConnection = async () => {
  await createConnections()
    .then(() => console.log('Database connection started.'))
    .catch((err: Error) => {
      console.log(err);
      throw err;
    });
};

export const closeConnection = () => getConnection(nameDb).close();
