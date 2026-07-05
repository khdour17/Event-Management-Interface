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
        const eventItem = createEventCard(event);
        eventsList.appendChild(eventItem);
    });
}

/**
 * CREATE CARD
 */

function createEventCard(event: Event): HTMLElement {

    const eventItem = document.createElement("li");
    eventItem.classList.add("event-item");

    const card = document.createElement("article");
    card.classList.add("event-card");
    card.classList.add(`event-${getEventStatus(event.date)}`);

    const { header, headerContent } = createEventHeader(event);

    const divider = document.createElement("div");
    divider.classList.add("event-divider");

    const description = document.createElement("p");
    description.classList.add("event-description");
    description.textContent = event.description;

    const deleteButton = createDeleteButton(event);

    header.append(
        headerContent,
        deleteButton
    );

    card.append(
        header,
        divider,
        description
    );


    eventItem.append(
        card
    );

    card.addEventListener("click", () => {
        goToEditEvent(event.id);
    });

    return eventItem;
}

/**
 * CREATE EVENT CARD HEADER
 */

function createEventHeader(event: Event) {
    const header = document.createElement("div");
    header.classList.add("event-header");

    const headerContent = document.createElement("div");
    headerContent.classList.add("event-header-content");

    const name = document.createElement("h2");
    name.classList.add("event-name");
    name.textContent = event.name;

    const date = document.createElement("span");
    date.classList.add("event-date");
    date.textContent = formatDate(event.date);

    headerContent.append(name, date);
    return { header, headerContent };
}

/** 
 * CREATE DELETE BUTTON
 */

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