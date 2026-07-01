import { getEvents } from '../data/events-store';


const addEventButton = document.getElementById('add-event-button');
const eventsList = document.getElementById('event-list');

const events = getEvents();


export function initEventsPage() {
    // render list
    // attach add button click
    // attach card click
    addEventButton?.addEventListener('click', () => {
        window.location.href = 'event.html';
    });

}




