import {
    productsContainerEl,
    filterContainerEl,
    nodes
} from "../common.js";



const filterContainerElClickHandler = event => {
    const clickedEl = event.target;
    if (clickedEl.className == "filter") {
        const karbordName = clickedEl.textContent;
        nodes.forEach(element => {
            if (element.nodeType !== 3) {
                element.style.display = "block";
                const karbordFilter = element.querySelector(".karbord");
                if (karbordFilter.textContent !== karbordName) {
                    element.style.display = "none";
                }
            }
        })
    }
}
filterContainerEl.addEventListener("click", filterContainerElClickHandler);

document.addEventListener("click", (event) => {
    if (!event.target.closest(".filterContainer")) {
        nodes.forEach(element => {
            if (element.nodeType !== 3) {
                element.style.display = "block";
            }
        });
    }
});