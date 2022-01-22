import $ from "jquery";

export default class {
    constructor() {
        this.apiUrl = "/api/";
    }

    get(url, data) {
        return $.get({
            url,
            data
        });
    }

    post(url, data) {
        return $.post({
            url,
            data: JSON.stringify(data),
            contentType: "application/json"
        });
    }

    getContacts(term) {
        return this.get(this.apiUrl + "getContacts", {term});
    }

    addContact(contact) {
        return this.post(this.apiUrl + "addContact", contact);
    }

    deleteContact(ids) {
        return this.post(this.apiUrl + "deleteContact", {ids});
    }
}