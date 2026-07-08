import { 
    BASE_API_URL,
    productsContainerEl
} from "../common.js";

fetch(`${BASE_API_URL}/products`)
    .then(res => res.json())
    .then(data => {
        data.products.forEach(element => {
            productsContainerEl.insertAdjacentHTML("beforeend", `
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