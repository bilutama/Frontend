$(document).ready(function () {
    var contactInputForm = $("#contact_input_form");

    var firstNameInput = $("#first_name");
    var lastNameInput = $("#last_name");
    var telephoneNumberInput = $("#telephone_number");

    var addContactButton = $("#add_contact_button");
    var deleteSelectedButton = $("#delete_selected_button");
    var clearFormButton = $("#clear_form_button");

    var resetFilterButton = $("#reset_filter_button");
    var enableFilterButton = $("#enable_filter_button");
    var filterInput = $("#filter_input");

    var phonebookContent = $("#phonebook > tbody");

    var deleteContactModal = $("#delete_confirmation_modal");
    var deleteContactModalObject = new bootstrap.Modal(deleteContactModal, {});

    var contactExistsModal = $("#contact_exists_modal");
    var contactExistsModalObject = new bootstrap.Modal(contactExistsModal, {});

    var generalCheckbox = $("#general_checkbox");
    var contactsToDelete = null;

    // Run to set general checkbox DISABLED when table in initially empty
    updateGeneralCheckboxStatus();

    function beautifyString(string, isCapitalized) {
        var separator = " ";
        var stringArray = string.trim().toLowerCase().split(separator);

        if (isCapitalized) {
            for (var j = 0; j < stringArray.length; ++j) {
                stringArray[j] = stringArray[j].charAt(0).toUpperCase() + stringArray[j].slice(1);
            }
        }

        return stringArray.join(separator);
    }

    function isFormValid(form) {
        var isFormValid = true;

        form.children().children().filter(":input:not(:button)").each(function () {
            var inputFieldContent = $(this).val().trim();

            if (inputFieldContent.length === 0) {
                isFormValid = false;
                return false;
            }

            $(this).val(inputFieldContent);
        });

        form.addClass("was-validated");
        return isFormValid;
    }

    function clearForm(form) {
        form.children().children().filter(":input:not(:button)").each(function () {
            $(this).val("");
        });
    }

    function isFilterApplied() {
        var isFilterApplied = false;

        phonebookContent.children("tr").each(function () {
            if ($(this).find(".form-check-input").is(":not(:visible)")) {
                isFilterApplied = true;
                return false;
            }
        });

        return isFilterApplied;
    }

    addContactButton.click(function () {
        if (!isFormValid(contactInputForm)) {
            return;
        }

        var telephoneNumber = telephoneNumberInput.val();
        var contactExists = false;

        // Check if existing contacts contains the number
        phonebookContent.children("tr").each(function () {
            if ($(this).find(".contact_telephone").text() === telephoneNumber) {
                contactExists = true;
                return false;
            }
        });

        // Modal dialog if telephone number exists in the phonebook
        if (contactExists) {
            contactExistsModalObject.show();
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
        newContact.find(".contact_first_name").text(beautifyString(firstNameInput.val(), true));
        newContact.find(".contact_last_name").text(beautifyString(lastNameInput.val(), true));
        newContact.find(".contact_telephone").text(beautifyString(telephoneNumber, false));

        // Remove contact
        newContact.find(".btn-close").click(function (event) {
            event.stopPropagation();

            contactsToDelete = newContact;
            deleteContactModalObject.show();
            $("#delete_confirmation_modal").find(".modal-body").text("Delete contact " +
                contactsToDelete.find(".contact_first_name").text() +
                " " +
                contactsToDelete.find(".contact_last_name").text() +
                "?");
        });

        newContact.find(".form-check-input").change(function (event) {
            event.stopPropagation();
            updateGeneralCheckboxStatus();
        });

        phonebookContent.append(newContact);

        clearForm(contactInputForm);
        contactInputForm.removeClass("was-validated");
        updateGeneralCheckboxStatus();
    });

    deleteSelectedButton.click(function () {
        // If filter is applied, only visible contacts will be subject to delete
        contactsToDelete = phonebookContent.children().has(".form-check-input:checked:visible");

        if (contactsToDelete.length === 0) {
            return;
        }

        deleteContactModalObject.show();
        // Check if filter is applied and warn user
        if (isFilterApplied()) {
            deleteContactModal.find(".modal-body").text("Seems that filter is applied, only visible contacts will be deleted. Continue?");
            return;
        }

        deleteContactModal.find(".modal-body").text("Deleted selected contacts?");
    });

    // Modal dialog to confirm contact delete
    $(document).on("shown.bs.modal", "#delete_confirmation_modal", function () {
        // Dialog dismiss is automated by using attribute _data-bs-dismiss_ for modal buttons
        // Thus there is no need for _cancel_ button handler
        // and call _hide()_ method when delete is confirmed

        // Modal dialog DELETE button handler
        $("#modal-delete").click(function () {
            contactsToDelete.remove();

            // Recalculate remaining contacts numbers
            phonebookContent.children("tr").each(function (index) {
                $(this).find(".row_number").text(index + 1);
            });

            updateGeneralCheckboxStatus();
        });
    });

    clearFormButton.click(function () {
        clearForm(contactInputForm);
    });

    // GENERAL_CHECKBOX status handling on change
    generalCheckbox.change(function () {
        if ($(this).is(":checked")) {
            phonebookContent.children("tr").each(function () {
                $(this).find(".form-check-input").prop("checked", true);
            });

            return;
        }

        phonebookContent.children("tr").each(function () {
            $(this).find(".form-check-input").prop("checked", false);
        });
    });

    function updateGeneralCheckboxStatus() {
        if (phonebookContent.children().length === 0) {
            generalCheckbox.prop("indeterminate", false);
            generalCheckbox.prop("checked", false);
            generalCheckbox.attr("disabled", true);
            return;
        }

        generalCheckbox.removeAttr("disabled");

        var checked = 0;
        var unchecked = 0;

        phonebookContent.children("tr").each(function () {
            if ($(this).find(".form-check-input").is(":checked")) {
                ++checked;

                if (unchecked > 0) {
                    return false;
                }
            } else if ($(this).find(".form-check-input").is(":not(:checked)")) {
                ++unchecked;

                if (checked > 0) {
                    return false;
                }
            }
        });

        if (checked > 0 && unchecked > 0) {
            generalCheckbox.prop("indeterminate", true);
            return;
        }

        generalCheckbox.prop("indeterminate", false);

        if (checked === 0) {
            generalCheckbox.prop("checked", false);
            return;
        }

        generalCheckbox.prop("checked", true);
    }

    // Handling filter form buttons
    enableFilterButton.click(function () {
        resetFilterButton.trigger("click");

        var filterText = filterInput.val().trim().toLowerCase();
        var matchedRows = phonebookContent.children("tr").filter(function () {
            var isInFirstName = $(this).find("td.contact_first_name").text().toLowerCase().includes(filterText);
            var isInLastName = $(this).find("td.contact_last_name").text().toLowerCase().includes(filterText);
            var isInTelephone = $(this).find("td.contact_telephone").text().toLowerCase().includes(filterText);

            return !(isInFirstName || isInLastName || isInTelephone);
        });

        matchedRows.hide();
    });

    resetFilterButton.click(function () {
        phonebookContent.children("tr").each(function () {
            $(this).show();
        });
    });
});