import {
    bodyEl,
    totalPriceEl,
    sabtButtonEl,
} from "../common.js";

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

export default html;