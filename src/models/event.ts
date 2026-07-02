export interface Event {
    id: number;
    name: string;
    description: string;
    date: Date;
}

/**
 * STATUS VALUES
 */
export const EventStatus = {
    PAST: "past",
    TODAY: "today",
    FUTURE: "future"
} as const;

export type EventStatus =
    typeof EventStatus[keyof typeof EventStatus];