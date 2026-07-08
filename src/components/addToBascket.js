import { 
    buyedProductEl,
    circle,
    numberEl,
    totalPriceEl,
    productsContainerEl
} from "../common.js";


const buyElClickHandler = event => {
    const clickedEl = event.target;
    if (clickedEl.className !== "buy") return;
    const fatherEL = clickedEl.closest(".productTable");
    const name = fatherEL.querySelector(".name").textContent;
    const priceNumber = fatherEL.querySelector(".priceNumber").textContent;
    buyedProductEl.insertAdjacentHTML("afterbegin", `
        <div class="product">
            <p class="productName">${name}</p>
            <div class="productCondition"><button class="delete">حذف</button><button class="plus"><i
                        class="fas fa-plus"></i></button><span class="tedad">1</span><button class="minus"><i
                        class="fas fa-minus"></i></button><span class=price_number>${priceNumber}</span></div>
            <hr>
        </div>
            `)
    circle.textContent = Number(circle.textContent) + 1
    numberEl.textContent = Number(numberEl.textContent) + 1
    totalPriceEl.textContent = Number(totalPriceEl.textContent) + Number(priceNumber);
}

productsContainerEl.addEventListener("click", buyElClickHandler);
