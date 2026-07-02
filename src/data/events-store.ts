import type { Event } from "../models/event";

const STORAGE_KEY = "events";
const NEXT_ID_KEY = "nextId";

/**
 * GET ALL EVENTS
 */
export function getEvents(): Event[] {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
        .map((e: any) => ({
            ...e,
            date: new Date(e.date)
        }));
}

/**
 * ADD EVENT
 */
export function addEvent(event: Event): void {
    const events = getEvents();
    events.push(event);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

/**
 * EDIT EVENT
 */
export function editEvent(id: number, updated: Event): void {
    const events = getEvents().map(e =>
        e.id === id ? updated : e
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

/**
 * GET EVENT BY ID
 */
export function getEventById(id: number): Event | undefined {
    return getEvents().find(e => e.id === id);
}

/**
 * DELETE EVENT
 */
export function deleteEvent(id: number): void {
    const events = getEvents().filter(event => event.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

/**
 * GENERATE ID
 */
export function getNextId(): number {
    const current = Number(localStorage.getItem(NEXT_ID_KEY)) || 1;
    localStorage.setItem(NEXT_ID_KEY, String(current + 1));
    return current;
}