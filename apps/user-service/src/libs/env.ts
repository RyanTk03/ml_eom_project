type Source = Record<string, string | undefined>;
type NodeEnv = 'development' | 'production' | 'test';

// ---------------------------------------------------------------------
// Helpers for reading / parsing
// ---------------------------------------------------------------------

function raw(source: Source, key: string): string | undefined {
  const value = source[key];
  return value === undefined || value.trim() === '' ? undefined : value.trim();
}

function missing(key: string): never {
  throw new Error(`Variable d'environnement manquante : ${key}`);
}

function readString(source: Source, key: string, defaultValue?: string): string {
  const value = raw(source, key);
  if (value !== undefined) return value;
  if (defaultValue !== undefined) return defaultValue;
  return missing(key);
}

function readNumber(source: Source, key: string, defaultValue?: number): number {
  const value = raw(source, key);
  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    return missing(key);
  }
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`${key} doit être un nombre (reçu : "${value}")`);
  }
  return parsed;
}

function readBoolean(source: Source, key: string, defaultValue?: boolean): boolean {
  const value = raw(source, key);
  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    return missing(key);
  }
  const normalized = value.toLowerCase();
  if (['true', '1', 'yes', 'on'].includes(normalized)) return true;
  if (['false', '0', 'no', 'off'].includes(normalized)) return false;
  throw new Error(`${key} doit être un booléen (reçu : "${value}")`);
}

function readOneOf<T extends string>(
  source: Source,
  key: string,
  allowed: readonly T[],
  defaultValue?: T
): T {
  const value = raw(source, key);
  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    return missing(key);
  }
  if (!(allowed as readonly string[]).includes(value)) {
    throw new Error(`${key} doit valoir l'une de ces valeurs : ${allowed.join(', ')} (reçu : "${value}")`);
  }
  return value as T;
}

class Env {
  // --- Application ---
  public NODE_ENV!: NodeEnv;
  public PORT!: number;

  // --- DATABASE ---
  public DATABASE_URL!: string;

  public AUTH_SERVICE_URL!: string;


  load(source: Source) {
    this.NODE_ENV = readOneOf(source, 'NODE_ENV', ['development', 'production', 'test'], 'development');
    this.PORT = readNumber(source, 'PORT', 3002);
    this.AUTH_SERVICE_URL = readString(source, 'AUTH_SERVICE_URL')

    this.DATABASE_URL = readString(source, 'DATABASE_URL');
  }
}

const env = new Env();

export default env;
