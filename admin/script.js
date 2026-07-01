const productsContainerEl = document.querySelector(".products");
const sefareshContainerEl = document.querySelector(".sefareshContainer");

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
        </div>
        `)
        });
    });

fetch("http://127.0.0.1:5000/buyed")
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


{/* <div class="sefaresh">
        <img src="data:image/jpeg;base64,${element.image}" class="img">
        <p class="name">${element.name}</p>
        <p class="email">${element.email}</p>
        <p class="phone">${element.phone}</p>
        <p class="address">${element.address}</p>
        <p class="price">${element.price}</p>
        <div class="secondproduct">${element.sefaresh}</div>
</div> */}