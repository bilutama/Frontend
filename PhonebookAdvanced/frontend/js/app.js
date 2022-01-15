import "bootstrap/dist/js/bootstrap.bundle";

import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";
import Vue from "vue";

import phonebook from "./phonebook.vue";

new Vue({
    render(el) {
        return el(phonebook);
    }
}).$mount("#app")