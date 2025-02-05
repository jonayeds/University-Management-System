/* eslint-disable no-console */
import { app } from './app';
import config from './app/config/index';
import mongoose from 'mongoose';
import { Server } from 'http';
import seedSuperAdmin from './app/DB';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    await seedSuperAdmin()
    server = app.listen(config.port, () => {
      console.log(`This App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
process.on('unhandledRejection', () => {
  console.log(`Unhandled rejection is detected 😝 Shutting down the server...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`Unhandled exception is detected 😝 Shutting down the server...`);
  process.exit();
});
