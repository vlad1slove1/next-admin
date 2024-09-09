import { Pool, PoolConfig } from 'pg';

class Postgres {
    private static instance: Postgres;
    private pool: Pool;

    private constructor() {
        const poolConfig: PoolConfig = {
            host: process.env.PG_HOST,
            port: Number(process.env.PG_PORT),
            database: process.env.PG_DATABASE,
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
        };

        for (const key of ['host', 'port', 'database', 'user', 'password']) {
            if (!poolConfig[key as keyof PoolConfig]) {
                throw new Error(`Missing required environment variable: ${key}`);
            }
        }

        this.pool = new Pool(poolConfig);
    }

    public static getInstance(): Postgres {
        if (!Postgres.instance) {
            Postgres.instance = new Postgres();
        }
        return Postgres.instance;
    }

    private async query<T>(queryText: string, params?: any[]): Promise<T[]> {
        const client = await this.pool.connect();
        try {
            const res = await client.query(queryText, params);
            return res.rows as T[];
        } catch (err) {
            console.error('Database query error:', err);
            throw err;
        } finally {
            client.release();
        }
    }

    public async getAll<T>(tableName: string): Promise<T[]> {
        return this.query<T>(`SELECT * FROM ${tableName} ORDER BY ID`);
    }

    public async getById<T>(tableName: string, id: number): Promise<T | null> {
        const result = await this.query<T>(`SELECT * FROM ${tableName} WHERE id = $1`, [id]);
        return result.length > 0 ? result[0] : null;
    }

    public async insert<T>(tableName: string, fields: string[], values: any[]): Promise<T> {
        const queryText = `INSERT INTO ${tableName}(${fields.join(
            ', '
        )}) VALUES (${values.map((_, i) => `$${i + 1}`).join(', ')}) RETURNING *`;
        const result = await this.query<T>(queryText, values);
        return result[0];
    }

    public async update<T>(
        tableName: string,
        id: number,
        fields: string[],
        values: any[]
    ): Promise<T | null> {
        const queryText = `UPDATE ${tableName} SET ${fields
            .map((field, i) => `${field} = $${i + 1}`)
            .join(', ')} WHERE id = $${fields.length + 1} RETURNING *`;
        const result = await this.query<T>(queryText, [...values, id]);
        return result.length > 0 ? result[0] : null;
    }

    public async delete<T>(tableName: string, id: number): Promise<T | null> {
        const result = await this.query<T>(`DELETE FROM ${tableName} WHERE id = $1 RETURNING *`, [
            id,
        ]);
        return result.length > 0 ? result[0] : null;
    }

    public async sql<T>(queryText: string, params?: any[]): Promise<T[]> {
        return this.query<T>(queryText, params);
    }
}

const postgresInstance = Postgres.getInstance();
export default postgresInstance;
