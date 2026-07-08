import {
    BASE_API_URL,
    sefareshContainerEl
} from "../common.js";

fetch(`${BASE_API_URL}/buyed`)
    .then(res => res.json())
    .then(data => {
        data.buyed.forEach(element => {
            sefareshContainerEl.insertAdjacentHTML("afterbegin", `
        <div class="sefaresh">
            <img src="data:image/jpeg;base64,${element.image}" class="img">
            <p class="name">${element.name}</p>
            <p class="email">${element.email}</p>
            <p class="phone">${element.phone}</p>
            <p class="address">${element.address}</p>
            <p class="price">${element.price}تومان</p>
            <div class="secondproduct">${element.sefaresh}</div>
        </div>
        `)
        });
    });