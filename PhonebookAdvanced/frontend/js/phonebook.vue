<template>
  <div id="app">
    <nav class="navbar navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#phonebook">
          <img src="images/phonebook.svg" alt="" width="30" height="24"
               class="d-inline-block align-text-top">
          Phonebook on Vue
        </a>
      </div>
    </nav>
    <div class="container">
      <form @submit.prevent="addContact" class="row g-3 border needs-validation mt-3 py-2" novalidate>
        <div class="col-md-4 mt-0">
          <label for="first_name" class="form-label">First name</label>
          <input type="text" id="first_name" class="form-control" v-model.trim="firstName"
                 :class="{'is-invalid': isFirstNameInvalid}" required>
          <div class="invalid-feedback">
            Please provide your name
          </div>
        </div>
        <div class="col-md-4 mt-0">
          <label for="last_name" class="form-label">Last name</label>
          <input type="text" id="last_name" class="form-control" v-model.trim="lastName"
                 :class="{'is-invalid': isLastNameInvalid}" required>
          <div class="invalid-feedback">
            Please provide your last name
          </div>
        </div>
        <div class="col-md-4 mt-0">
          <label for="telephone_number" class="form-label">Telephone</label>
          <input type="tel" id="telephone_number" class="form-control" v-model.trim="telephone"
                 :class="{'is-invalid': isTelephoneInvalid}" required>
          <div class="invalid-feedback">
            You have to enter phone number
          </div>
        </div>
        <div>
          <button class="btn btn-primary my-1">Add contact</button>
          <button class="btn btn-danger my-1" type="button" @click="showConfirmDeleteDialog(null)">Delete selected
          </button>
          <button @click.prevent="clearForm" class="btn btn-secondary my-1" type="button">Clear form</button>
        </div>
      </form>

      <div class="row justify-content-center">
        <form @submit.prevent class="g-3 col-md-6 col-12 border mt-3 py-3" novalidate id="search_form">
          <div class="input-group">
            <button @click.prevent="resetFilter" class="btn btn-outline-secondary" type="button">Reset</button>
            <input type="text" class="form-control" placeholder="Type to search" aria-label="Search panel"
                   v-model.trim="term">
            <button @click.prevent="getContacts(term)" class="btn btn-primary" type="button">Search</button>
          </div>
        </form>
      </div>

      <table v-cloak class="table table-responsive table-hover mt-3">
        <thead class="table-light">
        <tr>
          <th class="align-middle">
            <div class="form-check">
              <input class="form-check-input"
                     type="checkbox"
                     v-model="isGeneralCheckboxChecked"
                     v-indeterminate="isGeneralCheckBoxIndeterminate"
                     :disabled="contacts.length === 0">
            </div>
          </th>
          <th class="align-middle" scope="col">#</th>
          <th class="align-middle" scope="col">First Name</th>
          <th class="align-middle" scope="col">Last Name</th>
          <th class="align-middle" scope="col">Phone number</th>
          <th class="align-middle" scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(contact, index) in contacts"
            :key="contact.id"
            :contact="contact"
            :index="index">
          <td class="contactSelector">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" v-model="contact.checked">
            </div>
          </td>
          <td>{{ index + 1 }}</td>
          <td>{{ contact.firstName }}</td>
          <td>{{ contact.lastName }}</td>
          <td>{{ contact.telephone }}</td>
          <td>
            <button @click="showConfirmDeleteDialog(contact)" type="button" class="btn-close"
                    aria-label="Delete"></button>
          </td>
        </tr>
        </tbody>
      </table>

      <confirm-delete-modal/>
      <telephone-exist-modal/>

      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div class="col-md-2 align-items-center">
          <span class="text-muted">© Maxim Biluta</span>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import "../images/phonebook.svg";
import confirmDeleteModal from "./confirmDeleteModal.vue";
import telephoneExistModal from "./telephoneExistModal.vue";

function get(url, data) {
  return $.get({
    url,
    data
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

  this.deleteContact = function (ids) {
    return post(this.apiUrl + "deleteContact", {ids: ids});
  };
}

export default {
  components: {
    confirmDeleteModal, telephoneExistModal
  },

  data() {
    return {
      //Form validation variables
      isFirstNameInvalid: false,
      isLastNameInvalid: false,
      isTelephoneInvalid: false,

      isGeneralCheckboxChecked: false,
      isGeneralCheckBoxIndeterminate: false,

      checked: "",
      firstName: "",
      lastName: "",
      telephone: "",
      term: "",
      contacts: [],
      service: new PhonebookService(),
      selectedContactIds: [],
      contactForDelete: null
    }
  },

  directives: {
    indeterminate(el, binding) {
      el.indeterminate = Boolean(binding.value)
    }
  },

  mounted() {
    this.getContacts(this.term);
  },

  methods: {
    getContacts(term) {
      this.service.getContacts(term).done(contacts => {
        this.contacts = contacts;

        this.contacts.forEach(contact => {
          if (this.selectedContactIds.includes(contact.id)) {
            contact.checked = true;
          }
        });
      }).fail(() => {
        alert("Contacts are not loaded");
      });
    },

    resetFilter() {
      this.getContacts("");
      this.term = "";
    },

    formatString(string, isCapitalized) {
      var separator = " ";
      var stringArray = string.trim().toLowerCase().split(separator);

      if (isCapitalized) {
        for (var i = 0; i < stringArray.length; ++i) {
          stringArray[i] = stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1);
        }
      }

      return stringArray.join(separator);
    },

    clearForm() {
      this.firstName = "";
      this.lastName = "";
      this.telephone = "";

      this.isFirstNameInvalid = false;
      this.isLastNameInvalid = false;
      this.isTelephoneInvalid = false;
    },

    addContact() {
      this.isFirstNameInvalid = this.firstName.trim().length === 0;
      this.isLastNameInvalid = this.lastName.trim().length === 0;
      this.isTelephoneInvalid = this.telephone.trim().length === 0;

      var newContact = {
        checked: false,
        firstName: this.formatString(this.firstName, true),
        lastName: this.formatString(this.lastName, true),
        telephone: this.formatString(this.telephone, false)
      }

      this.service.addContact(newContact).done(response => {
        if (response.success) {
          this.getContacts();

          this.firstName = "";
          this.lastName = "";
          this.telephone = "";

          this.isFirstNameInvalid = false;
          this.isLastNameInvalid = false;
          this.isTelephoneInvalid = false;

          return;
        }

        if (response.code === 4) {
          telephoneExistModal.methods.show();
        }
      }).fail(() => {
        alert("Contact is not added");
      });
    },

    showConfirmDeleteDialog(contact) {
      if (contact === null && this.selectedContactIds.length === 0) {
        return;
      }

      var contactIdsForDelete = contact === null ? this.selectedContactIds : [contact.id];

      // _contactForDelete_ is used to pass contact data to modal dialog
      // _contactForDelete_ is passed when contact deleted with x button or
      // when only one contact is selected with checkbox
      if (contact === null) {
        if (contactIdsForDelete.length === 1) {
          this.contactForDelete = this.contacts.filter(c => c.id === contactIdsForDelete[0])[0];
        } else {
          this.contactForDelete = null; // Set to null if _contactForDelete_ was set previously and not updated
        }
      } else {
        this.contactForDelete = contact;
      }

      confirmDeleteModal.methods.show(() => {
        this.service.deleteContact(contactIdsForDelete).done(response => {
          if (!response.success) {
            alert(response.message);
            return;
          }

          this.contactForDelete = null;
          // Clear selectedContactIds array from contacts ids that were deleted
          this.selectedContactIds = this.selectedContactIds.filter(deletedContactId => !contactIdsForDelete.includes(deletedContactId));
          this.getContacts(this.term);
        }).fail(() => {
          alert("Unsuccessful contact delete");
        });
      });
    }
  },

  computed: {
    isContactForDeleteExists() {
      return this.contactForDelete !== null;
    }
  },

  watch: {
    // Updating GeneralCheckBox status and selectedContactIds of selected contacts
    contacts: {
      deep: true,

      handler() {
        if (this.contacts.length === 0) {
          this.isGeneralCheckboxChecked = false;
          this.isGeneralCheckBoxIndeterminate = false;
          return;
        }

        var checkedCount = 0;
        var uncheckedCount = 0;

        this.contacts.forEach(contact => {
          var currentId = contact.id;

          if (contact.checked) {
            ++checkedCount;

            // Update the array with ids for delete
            if (!this.selectedContactIds.includes(currentId)) {
              this.selectedContactIds.push(currentId);
            }
          } else {
            ++uncheckedCount;

            // Update the array with ids for delete
            this.selectedContactIds = this.selectedContactIds.filter(id => id !== currentId);
          }
        });

        if (checkedCount > 0 && uncheckedCount > 0) {
          this.isGeneralCheckBoxIndeterminate = true;
          return;
        }

        this.isGeneralCheckBoxIndeterminate = false;
        this.isGeneralCheckboxChecked = checkedCount > 0;
      }
    },

    isGeneralCheckboxChecked() {
      if (this.isGeneralCheckboxChecked) {
        this.contacts.forEach(c => c.checked = true)
        return;
      }

      this.contacts.forEach(c => c.checked = false);
    }
  }
}
</script>