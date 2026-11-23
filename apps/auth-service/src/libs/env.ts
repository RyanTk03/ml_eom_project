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
  public IS_PRODUCTION!: boolean;

  // --- JWT ---
  public ACCESS_SECRET!: string;
  public REFRESH_SECRET!: string;
  public ACCESS_EXPIRES_IN!: number;
  public REFRESH_EXPIRES_IN!: number;

  // --- Cookies ---
  public COOKIE_SECURE!: boolean;

  // --- DATABASE ---
  public DATABASE_URL!: string;

  public USER_SERVICE_URL!: string;

  load(source: Source) {
    this.NODE_ENV = readOneOf(source, 'NODE_ENV', ['development', 'production', 'test'], 'development');
    this.PORT = readNumber(source, 'PORT', 3000);
    this.IS_PRODUCTION = this.NODE_ENV === 'production';

    this.ACCESS_SECRET = readString(source, 'ACCESS_SECRET');
    this.REFRESH_SECRET = readString(source, 'REFRESH_SECRET');
    this.ACCESS_EXPIRES_IN = readNumber(source, 'ACCESS_EXPIRES_IN', 15 * 60 /* 15 minutes */);
    this.REFRESH_EXPIRES_IN = readNumber(source, 'REFRESH_EXPIRES_IN', 7 * 24 * 60 * 60 /* 7 days */);

    this.COOKIE_SECURE = readBoolean(source, 'COOKIE_SECURE', this.IS_PRODUCTION);

    this.DATABASE_URL = readString(source, 'DATABASE_URL');

    this.USER_SERVICE_URL = readString(source, "USER_SERVICE_URL")
  }
}

const env = new Env();

export default env;
