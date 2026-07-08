import {
    searchEl,
    nodes
} from "../common.js";


const searchElInputHandler = () => {
    const value = searchEl.value;
    nodes.forEach(element => {
        if (element.nodeType !== 3) {
            element.style.display = "block";
            const karbordFilter = element.querySelector(".name");
            if (!karbordFilter.textContent.includes(value)) {
                element.style.display = "none";
            }
        }
    })
}

searchEl.addEventListener("input", searchElInputHandler);