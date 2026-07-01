import { initEventsPage } from "./pages/events-page";
import { initEventFormPage } from "./pages/event-form";

/**
 * Detect which HTML page we are currently on
 */
function getCurrentPage(): "events" | "form" {
    const path = window.location.pathname;

    if (path.includes("event.html")) {
        return "form";
    }

    // default page is index.html
    return "events";
}

/**
 * App entry point
 */
function initApp() {
    const page = getCurrentPage();

    if (page === "events") {
        initEventsPage();
    }

    if (page === "form") {
        initEventFormPage();
    }
}

// start the app
initApp();