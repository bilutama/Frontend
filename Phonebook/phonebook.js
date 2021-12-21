$(document).ready(function () {
    var contactInputForm = $("#contact_input_form");

    var firstNameInput = $("#first_name");
    var lastNameInput = $("#last_name");
    var telephoneNumberInput = $("#telephone_number");

    var addContactButton = $("#add_contact_button");
    var phonebookContent = $("#phonebook").children("tbody");

    var deleteContactDialog = new bootstrap.Modal($("#delete_confirmation_modal"), {});
    var contactExistsDialog = new bootstrap.Modal($("#contact_exists_modal"), {});

    var generalCheckbox = $("#general_checkbox");
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
                return false;
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

        var telephoneNumber = telephoneNumberInput.val();
        var contactExists = false;

        // Look for a number in existing contacts
        phonebookContent.children("tr").each(function () {
            if ($(this).find(".contact_telephone").text() === telephoneNumber) {
                contactExists = true;
                return false;
            }
        });

        // Exit _ADD CONTACT_ if telephone number exists
        if (contactExists) {
            contactExistsDialog.show();
            return;
        }

        var newContact = $("<tr>");

        newContact.html("<th class='contactSelector'><div class='form-check'><input class='form-check-input' type='checkbox' value=''></div></th>" +
            "<th scope='row' class='row_number'></th>" +
            "<td class='contact_first_name'></td>" +
            "<td class='contact_last_name'></td>" +
            "<td class='contact_telephone'></td>" +
            "<td><button type='button' class='btn-close' aria-label='Delete' data-bs-toggle='modal' data-bs-target='#delete_confirmation_modal'></button></td>"
        );

        var currentContactsCount = phonebookContent.children().length;

        newContact.find(".row_number").text(currentContactsCount + 1);
        newContact.find(".contact_first_name").text(getCapitalizedString(firstNameInput.val()));
        newContact.find(".contact_last_name").text(getCapitalizedString(lastNameInput.val()));
        newContact.find(".contact_telephone").text(telephoneNumber.toLowerCase());

        // Handler for contact removing
        newContact.find(".btn-close").click(function (event) {
            event.stopPropagation();

            contactToDelete = newContact;
            deleteContactDialog.show();
            $(".modal-body").text("Delete contact " +
                contactToDelete.find(".contact_first_name").text() +
                " " +
                contactToDelete.find(".contact_last_name").text() +
                "?");
        });

        newContact.find(".form-check-input").click(function (event) {
            event.stopPropagation();
            updateGeneralCheckboxStatus();
        });

        phonebookContent.append(newContact);
        // TODO: update general_checkbox status

        clearForm(contactInputForm);
        contactInputForm.removeClass("was-validated");
    }

    addContactButton.click(addContactHandler);

    // Modal dialog to confirm contact delete
    $(document).on("shown.bs.modal", "#delete_confirmation_modal", function () {
        // Dialog dismiss is automated by using attribute _data-bs-dismiss_ for modal buttons
        // Thus there is no need for _cancel_ button handler
        // and call _hide()_ method when delete is confirmed

        // Modal dialog DELETE button handler
        $("#modal-delete").click(function () {
            contactToDelete.remove();

            // Recalculate remaining contacts numbers
            phonebookContent.children("tr").each(function (index) {
                $(this).find(".row_number").text(index + 1);
            });

            // TODO: update general_checkbox status
            updateGeneralCheckboxStatus();
        });
    });

    // GENERAL_CHECKBOX status handling on change
    generalCheckbox.change(function () {
        if ($(this).is(":checked")) {
            phonebookContent.children("tr").each(function () {
                $(this).find(".form-check-input").prop("checked", true);
            });
        } else if ($(this).is(":not(:checked)")) {
            phonebookContent.children("tr").each(function () {
                $(this).find(".form-check-input").prop("checked", false);
            });
        }
    });

    function updateGeneralCheckboxStatus() {
        var contactsCount = phonebookContent.children().length;

        if (contactsCount === 0) {
            generalCheckbox.prop("checked", false);
        }

        var allChecked = true;
        var undetermined = false;

        phonebookContent.children("tr").each(function (index) {
            if ($(this).find(".form-check-input").is(":checked")) {
                if (!allChecked) {
                    undetermined = true;
                    return false;
                }
            } else if ($(this).find(".form-check-input").is(":not(:checked)")) {
                allChecked = false;
            }
        });


        if (undetermined) {
            generalCheckbox.prop("selected", false);
            generalCheckbox.prop("indeterminate", true);
        } else {
            generalCheckbox.prop("indeterminate", false);

            if (allChecked) {
                generalCheckbox.prop("selected", true);
            } else {
                generalCheckbox.prop("selected", false);
            }
        }
    }

    phonebookContent.delegate("tr", "click", function () {
        var checkbox = $(this).find(".form-check-input");
        checkbox.prop("checked", !checkbox.prop("checked"));
        updateGeneralCheckboxStatus();
        return false;
    });
});