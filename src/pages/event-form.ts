import type { Event } from '../models/event';
import { getEventById, addEvent, editEvent, getNextId } from '../data/events-store';
import { parseDate } from "../utils/date-utils";

const formTitle = document.getElementById('form-title') as HTMLHeadingElement;
const eventNameInput = document.getElementById('event-name') as HTMLInputElement;
const eventDescriptionInput = document.getElementById('event-description') as HTMLInputElement;
const eventDateInput = document.getElementById('event-date') as HTMLInputElement;

const saveButton = document.getElementById('submit-form-button') as HTMLButtonElement;
const cancelButton = document.getElementById('cancel-form-button') as HTMLButtonElement;

let currentMode: "create" | "edit";
let currentEventId: number | null = null;

/**
 * ENTRY POINT
 */

export function initEventFormPage(): void {
    currentMode = getFormMode();

    if (currentMode === "edit") {
        currentEventId = getEventId();

        if (currentEventId !== null) {
            const event = getEventById(currentEventId);

            if (event) {
                populateForm(event);
            }
        }
    }

    updateHeaderText();
    updateButtonText();
    attachEventListeners();

}

/**
 * MODE
 */

function getFormMode(): "create" | "edit" {
    const params = new URLSearchParams(window.location.search);
    return params.get("id") ? "edit" : "create";
}

/**
 * GET ID FROM URL
 */

function getEventId(): number | null {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id ? parseInt(id, 10) : null;
}

/**
 * POPULATE FORM
 */

function populateForm(event: Event): void {
    eventNameInput.value = event.name;
    eventDescriptionInput.value = event.description;
    eventDateInput.value = event.date.toISOString().split("T")[0];
}

/**
 * READ FORM
 */

function getFormData(): Event {
    return {
        id: 0, // Placeholder, will be set later
        name: eventNameInput.value.trim(),
        description: eventDescriptionInput.value.trim(),
        date: parseDate(eventDateInput.value)
    };
}

/**
 * SAVE
 */

function saveEvent(): void {
    const data = getFormData();

    if (currentMode === "create") {
        data.id = getNextId();
        addEvent(data);
    } else {
        if (currentEventId === null) return;

        data.id = currentEventId;
        editEvent(currentEventId, data);
    }

    goToEventsPage();
}

/**
 * LISTENERS
 */

function attachEventListeners(): void {
    saveButton?.addEventListener("click", saveEvent);

    cancelButton?.addEventListener("click", goToEventsPage);

    eventDateInput?.addEventListener("click", () => {
        eventDateInput?.showPicker();
    });
}

/**
 * NAVIGATION
 */

function goToEventsPage(): void {
    window.location.assign("index.html");
}

/**
 * UPDATE BUTTON TEXT 
 */

function updateButtonText(): void {
    if (currentMode === "create") {
        saveButton.textContent = "Create Event";
    } else {
        saveButton.textContent = "Save Changes";
    } 
}

/**
 * UPDATE HEADER TEXT 
 */

function updateHeaderText(): void {
    if (currentMode === "create") {
        formTitle.textContent = "Create Event";
    } else {
        formTitle.textContent = "Edit Event";
    }
}