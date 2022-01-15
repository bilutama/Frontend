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

function PhonebookService() {
    this.apiUrl = "/api/";

    this.getContacts = function (term) {
        return get(this.apiUrl + "getContacts", {term: term});
    };

    this.addContact = function (contact) {
        return post(this.apiUrl + "addContact", contact);
    };

    this.deleteContact = function (id) {
        return post(this.apiUrl + "deleteContact", {id: id});
    };
}

// noinspection JSAnnotator
Vue.component("delete-modal", {
    template: "#delete-modal-template",

    data: function () {
        return {
            onConfirmContactDelete: null
        }
    },

    methods: {
        show: function (onConfirmContactDelete) {
            this.onConfirmContactDelete = onConfirmContactDelete;
            $(this.$refs.modalConfirmDelete).modal("show");
        },

        confirmDelete: function () {
            this.onConfirmContactDelete();
        }
    }
});

// noinspection JSAnnotator
Vue.component("telephone-exists-modal", {
    template: "#telephone-exists-modal-template",

    methods: {
        show: function () {
            $(this.$refs.modalTelephoneExists).modal("show");
        }
    }
});

new Vue({
    el: "#app",

    data: {
        //Form validation variables
        isFirstNameInvalid: false,
        isLastNameInvalid: false,
        isTelephoneInvalid: false,

        checked: "",
        firstName: "",
        lastName: "",
        telephone: "",
        term: "",
        contacts: [],
        service: new PhonebookService(),
        contactForDelete: null
    },

    created: function () {
        this.getContacts();
    },

    methods: {
        getContacts: function () {
            var self = this;

            this.service.getContacts(this.term).done(function (contacts) {
                self.contacts = contacts;
            }).fail(function () {
                alert("Contacts are not loaded");
            });
        },

        formatString: function (string, isCapitalized) {
            var separator = " ";
            var stringArray = string.trim().toLowerCase().split(separator);

            if (isCapitalized) {
                for (var i = 0; i < stringArray.length; ++i) {
                    stringArray[i] = stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1);
                }
            }

            return stringArray.join(separator);
        },

        clearForm: function () {
            this.firstName = "";
            this.lastName = "";
            this.telephone = "";

            this.isFirstNameInvalid = false;
            this.isLastNameInvalid = false;
            this.isTelephoneInvalid = false;
        },

        addContact: function () {
            this.isFirstNameInvalid = this.firstName.trim().length === 0;
            this.isLastNameInvalid = this.lastName.trim().length === 0;
            this.isTelephoneInvalid = this.telephone.trim().length === 0;

            var newContact = {
                checked: false,
                firstName: this.formatString(this.firstName, true),
                lastName: this.formatString(this.lastName, true),
                telephone: this.formatString(this.telephone, false)
            }

            var self = this;
            //var mdes = this.$refs;

            this.service.addContact(newContact).done(function (response) {
                if (response.success) {
                    self.getContacts();

                    self.firstName = "";
                    self.lastName = "";
                    self.telephone = "";

                    self.isFirstNameInvalid = false;
                    self.isLastNameInvalid = false;
                    self.isTelephoneInvalid = false;

                    return;
                }

                if (response.code === 4) {
                    console.log("call dialog");
                    self.$refs.telephoneExistsDialog.show();
                }

                // alert(response.message);
            }).fail(function () {
                alert("Contact was not added");
            });
        },

        showConfirmDeleteDialog: function (contact) {
            // Used to pass contact data to modal dialog
            this.contactForDelete = contact;
            var self = this;

            this.$refs.confirmDeleteDialog.show(function () {
                self.service.deleteContact(contact.id).done(function (response) {
                    if (!response.success) {
                        alert(response.message);
                        return;
                    }

                    self.contactForDelete = null;
                    self.getContacts();
                }).fail(function () {
                    alert("Contact was not deleted");
                });
            });
        }
    },

    computed: {
        isContactForDeleteExists() {
            return this.contactForDelete !== null;
        }
    }
});