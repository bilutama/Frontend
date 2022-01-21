<template>
  <div ref="modalConfirmDelete" class="modal fade" tabindex="-1" aria-labelledby="modalConfirmDeleteLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalConfirmDeleteLabel">Delete confirmation</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <span v-text="confirmDeleteModalMessage"></span>
        </div>
        <div class="modal-footer">
          <button type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                  id="modal-cancel">Cancel
          </button>
          <button type="button"
                  @click="confirmDelete"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  id="modal-delete">Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Modal} from "bootstrap";

export default {
  data() {
    return {
      onConfirmContactDelete: null,
      contactFullName: ""
    }
  },

  methods: {
    show(contactFullName, onConfirmContactDelete) {
      this.contactFullName = contactFullName;
      this.onConfirmContactDelete = onConfirmContactDelete;
      new Modal(this.$refs.modalConfirmDelete, {}).show();
    },

    confirmDelete() {
      this.onConfirmContactDelete();
    }
  },

  computed: {
    confirmDeleteModalMessage() {
      return this.contactFullName === "" ? "Delete selected contacts?" : "Delete contact " + this.contactFullName + "?";
    }
  }
}
</script>