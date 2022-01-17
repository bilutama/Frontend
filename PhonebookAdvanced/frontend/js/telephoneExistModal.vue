<template>
  <div ref="modalTelephoneExists" class="modal fade" tabindex="-1" aria-labelledby="modalTelephoneExistsLabel"
       aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTelephoneExistsLabel">Cannot add the contact</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Telephone already exists in the phonebook.
        </div>
        <div class="modal-footer">
          <button type="button"
                  class="btn btn-warning"
                  data-bs-dismiss="modal"
                  id="modal-dismiss">Dismiss
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
      modalWindow: null
    }
  },

  mounted() {
    this.modalWindow = this.$refs.modalTelephoneExists;
  },

  methods: {
    show() {
      new Modal(this.modalWindow, {}).show();
    }
  }
}
</script>