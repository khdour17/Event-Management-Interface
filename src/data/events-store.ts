import { type Event } from '../models/event';

let events: Event[] = [];

export function addEvent(event: Event): void {
    events.push(event);
}

export function getEvents(): Event[] {
    return events;
}

export function getEventById(id: number): Event | undefined {
    return events.find(event => event.id === id);
}

export function editEvent(id: number, updatedEvent: Event): void {
    const index = events.findIndex(event => event.id === id);
    if (index !== -1) {
        events[index] = updatedEvent;
    }
}