import {
    bodyEl,
    btnEl
} from "../common.js";

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

btnEl.addEventListener("click", btnElClickHandler)