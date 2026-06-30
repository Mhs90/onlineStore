const productsContainerEl = document.querySelector(".products");
const buyedProductEl = document.querySelector(".buyedProduct");
const circle = document.querySelector(".circle");
const totalPriceEl = document.querySelector(".totalPrice");
const numberEl = document.querySelector(".number");
const filterContainerEl = document.querySelector(".filterContainer");
const filterEl = document.querySelectorAll(".filter");
const searchEl = document.querySelector(".search");
const everyEl = document.querySelector(".every");

fetch("http://127.0.0.1:5000/products")
    .then(res => res.json())
    .then(data => {
        data.products.forEach(element => {
            productsContainerEl.insertAdjacentHTML("afterbegin", `
        <div class="productTable">
            <img src="data:image/jpeg;base64,${element.picture}" class="productPicture">
            <p class="name">${element.name}</p>
            <p class="karbord">${element.karbord}</p>
            <span class="priceNumber">${element.price}</span><br><span class="productPrice">تومان</span>
            <button class="buy">افزودن به سبد خرید</button>
        </div>
        `)
        });
    });


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

const buyProductElClickHandler = event => {
    const clickedEl = event.target;
    if (clickedEl.className == "plus" || clickedEl.className == "fas fa-plus") {        
        const fatherEL = clickedEl.closest(".productCondition");
        const tedadEl = fatherEL.querySelector(".tedad");
        +tedadEl.textContent++;
         const price_number  = fatherEL.querySelector(".price_number");
        totalPriceEl.textContent = Number(totalPriceEl.textContent) + Number(price_number.textContent);
    }
    else if (clickedEl.className == "minus" || clickedEl.className == "fas fa-minus") {
        const fatherEL = clickedEl.closest(".productCondition");
        const tedadEl = fatherEL.querySelector(".tedad");
        if (Number(tedadEl.textContent) > 1) {
            tedadEl.textContent = Number(tedadEl.textContent) - 1;
             const price_number  = fatherEL.querySelector(".price_number");
            totalPriceEl.textContent = Number(totalPriceEl.textContent) - Number(price_number.textContent);
        }
    }
    else if (clickedEl.className == "delete") {
        const fatherEL = clickedEl.closest(".productCondition");
        const productEl = fatherEL.closest(".product");
        productEl.remove()
        circle.textContent = Number(circle.textContent) - 1;
        numberEl.textContent = Number(numberEl.textContent) - 1;
         const price_number  = fatherEL.querySelector(".price_number");
        totalPriceEl.textContent = Number(totalPriceEl.textContent) - Number(price_number.textContent);
    }
}
buyedProductEl.addEventListener("click", buyProductElClickHandler);

const nodes = productsContainerEl.childNodes;

const filterContainerElClickHandler = event => {
    const clickedEl = event.target;
    if (clickedEl.className == "filter") {
        karbordName = clickedEl.textContent;
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

searchEl.addEventListener("input",searchElInputHandler)
