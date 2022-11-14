import { renderDashboard } from "./view-dashboard.js";
import { renderDetails } from "./view-details.js";

if (window.location.search.includes("?country=")) {
    renderDetails();
} else {
    document.querySelector(".filters").classList.add("active");
    renderDashboard();
}
