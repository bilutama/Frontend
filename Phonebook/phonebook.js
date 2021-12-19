$(document).ready(function () {
    var contactInputForm = $("#contactInputForm");

    var firstName = $("#firstName");
    var lastName = $("#lastName");
    var telephoneNumber = $("#telephoneNumber");

    var addContactButton = $("#addContactButton");
    var phonebookContent = $("#phonebook").children("tbody");

    var deleteContactDialog = $("#deleteConfirmationModal");
    var contactToDelete = null;

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
            "<td><button type='button' class='btn-close' aria-label='Delete' data-bs-toggle='modal' data-bs-target='#deleteConfirmationModal'></button></td>"
        );

        var currentContactsCount = phonebookContent.children().length;

        newContact.find(".rowNumber").text(currentContactsCount + 1);
        newContact.find(".contactFirstName").text(getCapitalizedString(firstName.val()));
        newContact.find(".contactLastName").text(getCapitalizedString(lastName.val()));
        newContact.find(".contactTelephone").text(telephoneNumber.val());

        // Handler for contact removing
        newContact.find(".btn-close").click(function () {
            contactToDelete = newContact;
            deleteContactDialog.show();
            $(".modal-body").text("Delete contact " +
                contactToDelete.find(".contactFirstName").text() +
                " " +
                contactToDelete.find(".contactLastName").text() +
                "?");
        });

        phonebookContent.append(newContact);

        clearForm(contactInputForm);
        contactInputForm.removeClass("was-validated");
    }

    $(document).on("shown.bs.modal", "#deleteConfirmationModal", function () {
        // Dialog dismiss is automated by using attribute _data-bs-dismiss_ for modal buttons
        // Thus there is no need for _cancel_ button handler
        // and call _hide()_ method when confirm delete

        // Modal dialog DELETE button handler
        $("#modal-delete").click(function () {
            contactToDelete.remove();

            // Recalculate remaining contacts numbers
            phonebookContent.children("tr").each(function (index) {
                $(this).find(".rowNumber").text(index + 1);
            });
        });
    })

    addContactButton.click(addContactHandler);
});