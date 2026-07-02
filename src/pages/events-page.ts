import type { Event } from '../models/event';
import { getEvents, deleteEvent } from '../data/events-store';
import { getEventStatus, formatDate } from "../utils/date-utils";

const addEventButton = document.getElementById('add-event-button');
const eventsList = document.getElementById('event-list') as HTMLUListElement;

/**
 * ENTRY POINT
 */
export function initEventsPage(): void {
    const events = getEvents();
    
    renderEvents(events);
    attachEventListeners();
}

/**
 * RENDER LIST
 */
function renderEvents(events: Event[]): void {
    eventsList.innerHTML = ""; // Clear existing events
    if (events.length === 0) {
        updateEmptyState();
        return;
    }
    const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
    sortedEvents.forEach(event => {
        const card = createEventCard(event);
        eventsList.appendChild(card);
    });
}

/**
 * CREATE CARD
 */
function createEventCard(event: Event): HTMLElement {
    const card = document.createElement("li");
    card.classList.add("event-card");

    const name = document.createElement("span");
    name.textContent = event.name;

    const desc = document.createElement("span");
    desc.textContent = event.description;

    const date = document.createElement("span");
    date.textContent = formatDate(event.date);

    const deleteBtn = createDeleteButton(event);

    const status = getEventStatus(event.date);
    card.classList.add(`event-${status}`);

    card.append(name, desc, date, deleteBtn);

    card.addEventListener("click", () => goToEditEvent(event.id));

    return card;
}

function createDeleteButton(event: Event) {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-button");

    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // IMPORTANT (prevents opening edit page)
        deleteEvent(event.id);
        renderEvents(getEvents());
    });
    return deleteBtn;
}

/**
 * ADD EVENT
 */
function goToCreateEvent(): void {
    window.location.assign("event.html");
}

/**
 * EDIT EVENT
 */
function goToEditEvent(eventId: number): void {
    window.location.assign(`event.html?id=${eventId}`);
}

/** 
 * EMPTY STATE
 */
function updateEmptyState(): void {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No events available. Click 'Add Event' to create one.";
    eventsList.appendChild(emptyMessage);
}

/**
 * LISTENERS
 */
function attachEventListeners(): void {
    addEventButton?.addEventListener("click", goToCreateEvent);
}