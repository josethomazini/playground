import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function MigrationsPage(request, response) {
  const dbClient = await database.getNewClient();

  const migratingOptions = {
    dbClient,
    dryRun: null,
    dir: join("infra", "migrations"),
    direction: "up",
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    migratingOptions.dryRun = true;

    const pendingMigrations = await migrationRunner(migratingOptions);

    await dbClient.end();

    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    migratingOptions.dryRun = false;

    const migratedMigrations = await migrationRunner(migratingOptions);
    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations); // created
    } else {
      return response.status(200).json(migratedMigrations);
    }
  }

  await dbClient.end();
  return response.status(405).end();
}
