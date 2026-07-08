import {
    totalPriceEl,
    buyedProductEl,
    circle,
    numberEl
} from "../common.js";

const buyProductElClickHandler = event => {
    const clickedEl = event.target;
    if (clickedEl.className == "plus" || clickedEl.className == "fas fa-plus") {
        const fatherEL = clickedEl.closest(".productCondition");
        const tedadEl = fatherEL.querySelector(".tedad");
        +tedadEl.textContent++;
        const price_number = fatherEL.querySelector(".price_number");
        totalPriceEl.textContent = Number(totalPriceEl.textContent) + Number(price_number.textContent);
    }
    else if (clickedEl.className == "minus" || clickedEl.className == "fas fa-minus") {
        const fatherEL = clickedEl.closest(".productCondition");
        const tedadEl = fatherEL.querySelector(".tedad");
        if (Number(tedadEl.textContent) > 1) {
            tedadEl.textContent = Number(tedadEl.textContent) - 1;
            const price_number = fatherEL.querySelector(".price_number");
            totalPriceEl.textContent = Number(totalPriceEl.textContent) - Number(price_number.textContent);
        }
    }
    else if (clickedEl.className == "delete") {
        const fatherEL = clickedEl.closest(".productCondition");
        const productEl = fatherEL.closest(".product");
        productEl.remove()
        circle.textContent = Number(circle.textContent) - 1;
        numberEl.textContent = Number(numberEl.textContent) - 1;
        const price_number = fatherEL.querySelector(".price_number");
        const tedad = Number(fatherEL.querySelector(".tedad").textContent);
        totalPriceEl.textContent =
            Number(totalPriceEl.textContent) -
            (Number(price_number.textContent) * tedad);
    }
}
buyedProductEl.addEventListener("click", buyProductElClickHandler);
