import { Publisher, Subjects, TicketCreatedEvent } from "@qh-tickets/shared";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
