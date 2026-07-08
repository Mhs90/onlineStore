import {
    BASE_API_URL
} from "../common.js";

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
    fetch(`${BASE_API_URL}/add`, {
        method: "POST",
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert("سفارش با موفقیت ثبت شد.");
            location.href = "/onlineStore/admin/index.html";
        })
        .catch(err => console.log(err));
}
document.addEventListener("click", submitElClickHandler);