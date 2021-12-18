$(document).ready(function () {
    var contactInputForm = $("#contactInputForm");

    var firstName = $("#firstName");
    var lastName = $("#lastName");
    var telephoneNumber = $("#telephoneNumber");

    var addContactButton = $("#addContactButton");
    var phonebookContent = $("#phonebook").children("tbody");

    var newContact = $("<tr>");

    function validateForm(contactInputForm) {
        var inputFields = contactInputForm.children(":input:not(:button)");
        var isFormValid = true;

        inputFields.each(function () {
            var inputFieldContent = this.val().trim();

            if (inputFieldContent.length === 0) {
                isFormValid = false;
            }

            contactInputForm.addClass("was-validated");
            this.text(inputFieldContent);
        });

        return isFormValid;
    }

    function addContact() {
        if (validateForm(contactInputForm))

        newContact.html("<th scope='row' class='rowNumber'></th>" +
            "<td class='contactFirstName'></td>" +
            "<td class='contactSecondName'></td>" +
            "<td class='contactTelephone'></td>"
        );

        newContact.find("rowNumber").text();
    }
});