import { EventStatus } from "../models/event";
import type { EventStatus as EventStatusType } from "../models/event";

function normalizeDate(date: Date): number {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
}

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

export function formatDate(date: Date): string {
    return date.toLocaleDateString();
}

export function parseDate(dateString: string): Date {
    return new Date(dateString);
}