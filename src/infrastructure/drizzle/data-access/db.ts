import { Pool, PoolConfig } from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import closeWithGrace from "close-with-grace";
import { env } from "@config/env";
import { logger } from "@config/logger";
import * as schema from "@infrastructure/drizzle/data-access/schema";

export default class DBService {
  public db: NodePgDatabase<typeof schema>;
  public pool: Pool;

  constructor({ host, port, user, password, database, ssl }: PoolConfig) {
    this.pool = new Pool({ host, port, user, password, database, ssl });
    this.db = drizzle(this.pool, { schema: schema, logger: false });

    this.pool.on("connect", () => {
      logger.info(`Connected to database: postgresql://${user}:***@${host}:${port}/${database}`);
    });

    closeWithGrace({ delay: 30000 }, ({ signal, err }) => {
      if (err) logger.error(err);
      this.pool.end(() => logger.error(`Received ${signal} Database connection closed.`));
    });
  }

  public async migrate(migrationsFolder: string): Promise<void> {
    logger.info("Running database migrations...");
    await migrate(this.db, { migrationsFolder });
  }
}

const dbService = new DBService({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DATABASE,
  ssl: false,
});

dbService.migrate("./.migrations");

export const { db } = dbService;
