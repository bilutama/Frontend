function get(url, data) {
    return $.get({
        url: url,
        data: data
    });
}

function post(url, data) {
    return $.post({
        url: url,
        data: JSON.stringify(data),
        contentType: "application/json"
    });
}

new Vue({
    el: "#app",

    data: {
        firstName: "",
        lastName: "",
        telephone: "",
        term: "",
        contacts: []
    },

    created: function () {
        this.loadContacts();
    },

    methods: {
        loadContacts: function () {
            var self = this;

            get("/api/getContacts", {term: this.term}).done(function (contacts) {
                self.contacts = contacts;
            }).fail(function () {
                alert("Contacts are not loaded");
            });
        },

        addContact: function () {
            var requestData = {
                firstName: this.firstName,
                lastName: this.lastName,
                telephone: this.telephone
            }

            var self = this;

            post("/api/addContact", requestData).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.loadContacts();

                self.firstName = "";
                self.lastName = "";
                self.telephone = "";
            }).fail(function () {
                alert("Contact was not added");
            });
        },

        deleteContact: function (contact) {
            var self = this;

            post("/api/deleteContact", {id: contact.id}).done(function (response) {
                if (!response.success) {
                    alert(response.message);
                    return;
                }

                self.loadContacts();
            }).fail(function () {
                alert("Contact was not deleted");
            });
        },

        clearForm: function () {
            this.firstName = "";
            this.lastName = "";
            this.telephone = "";
        }
    }
});