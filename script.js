const productsContainerEl = document.querySelector(".products");
const buyedProductEl = document.querySelector(".buyedProduct");
const circle = document.querySelector(".circle");
const totalPriceEl = document.querySelector(".totalPrice");
const numberEl = document.querySelector(".number");
const filterContainerEl = document.querySelector(".filterContainer");
const filterEl = document.querySelectorAll(".filter");
const searchEl = document.querySelector(".search");
const everyEl = document.querySelector(".every");
const sabtButtonEl = document.querySelector(".sabt");
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

const nodes = productsContainerEl.childNodes;

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

searchEl.addEventListener("input", searchElInputHandler)

let html = ``;
const sabtButtonElClickHandler = () => {
    const productNameEl = document.querySelectorAll(".productName");
    const tedadEl = document.querySelectorAll(".tedad");
    for (let i = 0; i < productNameEl.length; i++) {
        let item1 = productNameEl[i];
        let item2 = tedadEl[i];
        html = html + `
        <div class="product">
            <p class="productName">${item1.textContent}</p>
            <br>
            <span class="secondtedad">${item2.textContent}</span>
            <hr>
        </div>
        `
    }

    bodyEl.innerHTML = `
    <form action="#">
        <label> سفارش ها</label>
        <div class="buyedEl">${html}</div>
        <label> : نام و نام خانوادگی </label>
        <input type="text" placeholder="....نامت را وارد کن" class="name" required>
        <label>: شماره تلفن </label>
        <input type="tel" placeholder="....شماره تلفنت را وارد کن" class="phone" required>
        <label> : ایمیل</label>
        <input type="email" placeholder=".....ایمیل را وارد کن" class="email" required>
        <label>: آدرس </label>
        <input type="text" placeholder=".....آدرس را به همراه استان و شهر وارد کن" class="address" required>
        <label>
        عکس فیش واریزی به حساب 
        7879 7586 9972 6037
        تومان${totalPriceEl.textContent} : قیمت کل 
        </label>
        <input type="file" class="file">
        <br><br>
        <button class="btn">ثبت</button>
    </form>
    `
}
sabtButtonEl.addEventListener("click", sabtButtonElClickHandler);


const btnElClickHandler = (e) => {

    if (e.target.className == "btn") {
        e.preventDefault();
        const imageEl = document.querySelector(".file");
        const nameEl = document.querySelector(".name");
        const phoneEl = document.querySelector(".phone");
        const emailEl = document.querySelector(".email");
        const addressEl = document.querySelector(".address");

        const formData = new FormData();
        if (!imageEl.files.length) {
            alert("لطفا عکس فیش را انتخاب کنید.");
            return;
        }
        formData.append("image", imageEl.files[0]);
        formData.append("name", nameEl.value);
        formData.append("phone", phoneEl.value);
        formData.append("email", emailEl.value);
        formData.append("address", addressEl.value);
        formData.append("price", totalPriceEl.textContent);
        formData.append("sefaresh", html);

        fetch("http://127.0.0.1:5000/add-buyed", {
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
};
bodyEl.addEventListener("click", btnElClickHandler);