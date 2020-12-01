import { Publisher, Subjects, TicketUpdatedEvent } from "@qh-tickets/shared";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
