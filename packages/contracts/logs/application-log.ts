export interface ApplicationLog {
  timestamp: string;
  level: "debug" | "info" | "warn" | "error";
  service: string;
  message: string;
  traceId?: string;
  metadata?: Record<string, unknown>;
}
