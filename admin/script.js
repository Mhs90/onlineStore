const productsContainerEl = document.querySelector(".products");
const sefareshContainerEl = document.querySelector(".sefareshContainer");
const btnEl = document.querySelector(".btn");
const bodyEl = document.querySelector(".body");


fetch("http://127.0.0.1:5000/products")
    .then(res => res.json())
    .then(data => {
        data.products.forEach(element => {
            productsContainerEl.insertAdjacentHTML("beforeend", `
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


const btnElClickHandler = () => {
    bodyEl.innerHTML = `
    <form action="#">
        <label> : نام </label>
        <input type="text" placeholder="....نامت کالا را وارد کن" class="name" required>
        <label>: کاربرد</label>
        <input type="text" placeholder="....کاربرد کالا را وارد کن" class="karbord" required>
        <label> : قیمت</label>
        <input type="number" placeholder=".....قیمت کالا را وارد کن" class="price" required>
        <label> :  عکس کالا</label>
        <input type="file" class="file">
        <br><br>
        <button class="secondbtn">ثبت</button>
    </form>
    `
}
btnEl.addEventListener("click",btnElClickHandler)

const submitElClickHandler = event => {
    if (event.target.className !== "secondbtn") return;
    event.preventDefault();
    const imageEl = document.querySelector(".file");
    const nameEl = document.querySelector(".name");
    const karbordEl = document.querySelector(".karbord");
    const priceEl = document.querySelector(".price");

    if (!imageEl.files.length) {
        alert("لطفا عکس کالا را انتخاب کنید.");
        return;
    }
    const formData = new FormData();
    formData.append("picture", imageEl.files[0]);
    formData.append("name", nameEl.value);
    formData.append("karbord", karbordEl.value);
    formData.append("price", priceEl.value);
    fetch("http://127.0.0.1:5000/add", {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert("سفارش با موفقیت ثبت شد.");
        })
        .catch(err => console.log(err));
}
document.addEventListener("click", submitElClickHandler);