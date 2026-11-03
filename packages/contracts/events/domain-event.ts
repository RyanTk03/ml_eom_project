export interface DomainEvent<TPayload = unknown> {
  eventId: string;
  type: string;
  occurredAt: string;
  aggregateId?: string;
  correlationId?: string;
  payload: TPayload;
}
