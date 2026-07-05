import { EventStatus } from "../models/event";
import type { EventStatus as EventStatusType } from "../models/event";

/**
 * Normalize a date to midnight (00:00:00) for comparison purposes.
 */

function normalizeDate(date: Date): number {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

/**
 * Get the status of an event based on its date.
 */

export function getEventStatus(date: Date): EventStatusType {
    const eventTime = normalizeDate(date);
    const todayTime = normalizeDate(new Date());

    if (eventTime < todayTime) {
        return EventStatus.PAST;
    }

    if (eventTime === todayTime) {
        return EventStatus.TODAY;
    }

    return EventStatus.FUTURE;
}

/** 
 * Format a date to a readable string (e.g., "MM/DD/YYYY").
 */

export function formatDate(date: Date): string {
    return date.toLocaleDateString();
}

/**
 * Parse a date string into a Date object.
 */

export function parseDate(dateString: string): Date {
    return new Date(dateString);
}