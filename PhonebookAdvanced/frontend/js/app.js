import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";
import Vue from "vue";

import phonebook from "./Phonebook.vue";

new Vue({
    render(el) {
        return el(phonebook);
    }
}).$mount("#app")