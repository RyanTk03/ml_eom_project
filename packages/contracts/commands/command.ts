export interface Command<TPayload = unknown> {
  commandId: string;
  type: string;
  occurredAt: string;
  correlationId?: string;
  payload: TPayload;
}
