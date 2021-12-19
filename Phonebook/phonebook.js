$(document).ready(function () {
    var contactInputForm = $("#contactInputForm");

    var firstName = $("#firstName");
    var lastName = $("#lastName");
    var telephoneNumber = $("#telephoneNumber");

    var addContactButton = $("#addContactButton");
    var phonebookContent = $("#phonebook").children("tbody");

    function getCapitalizedString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    function isFormValid(contactInputForm) {
        var isFormValid = true;

        contactInputForm.children().children().filter(":input:not(:button)").each(function () {
            var inputFieldContent = $(this).val().trim();

            if (inputFieldContent.length === 0) {
                isFormValid = false;
            }

            $(this).val(inputFieldContent);
        });

        contactInputForm.addClass("was-validated");
        return isFormValid;
    }

    function clearForm(contactInputForm) {
        contactInputForm.children().children().filter(":input:not(:button)").each(function () {
            $(this).val("");
        });
    }

    function addContactHandler() {
        if (!isFormValid(contactInputForm)) {
            return;
        }

        var newContact = $("<tr>");

        newContact.html("<th scope='row' class='rowNumber'></th>" +
            "<td class='contactFirstName'></td>" +
            "<td class='contactLastName'></td>" +
            "<td class='contactTelephone'></td>" +
            "<td><button type='button' class='btn-close' aria-label='Delete'></button></td>"
        );

        var currentContactsCount = phonebookContent.children().length;

        newContact.find(".rowNumber").text(currentContactsCount + 1);
        newContact.find(".contactFirstName").text(getCapitalizedString(firstName.val()));
        newContact.find(".contactLastName").text(getCapitalizedString(lastName.val()));
        newContact.find(".contactTelephone").text(telephoneNumber.val());

        newContact.find(".btn-close").click(function () {
            newContact.remove();
        });

        phonebookContent.append(newContact);

        clearForm(contactInputForm);
        contactInputForm.removeClass("was-validated");
    }

    addContactButton.click(addContactHandler);
});