import {
    totalPriceEl,
    BASE_API_URL,
    bodyEl
} from "../common.js";
import html from "./registration.js";

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

        fetch(`${BASE_API_URL}/add-buyed`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                alert("سفارش با موفقیت ثبت شد.");
                location.href = "/onlineStore/index.html";
            })
            .catch(err => console.log(err));
    }
};
bodyEl.addEventListener("click", btnElClickHandler);