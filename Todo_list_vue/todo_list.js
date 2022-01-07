Vue.component("to-do-item", {
    template: "#to-do-item-template",

    props: {
        index: {
            type: Number,
            required: true
        },

        item: {
            type: Object,
            required: true,
        }
    },

    data: {
        isInvalid: false,
        isEditing: false,
        editingText: ""
    },

    methods: {
        editItem: function () {
            this.isInvalid = false;
            this.isEditing = true;
            this.editingText = this.text;
        },

        delete: function () {
            this.$emit("delete-item", this.props.item);
        },

        saveItem: function () {
            this.isInvalid = false;

            if (this.editingText.length === 0) {
                this.isInvalid = true;
                return;
            }

            this.$emit("save-item", this.item, this.editingText);
            this.isEditing = false;
        }
    }
});

new Vue({
    el: "#app",

    data: {
        isNewTodoInvalid: false,
        newTodoText: "",
        currentTodoId: 1,
        items: []
    },

    methods: {
        addNewTodoItem: function () {
            this.isNewTodoInvalid = false;

            if (this.newTodoText.length === 0) {
                this.isNewTodoInvalid = true;
                return;
            }

            this.items.push({
                id: this.currentTodoId,
                text: this.newTodoText,
            });

            this.newTodoText = "";
            ++this.currentTodoId;
        },

        deleteItem: function (item) {
            this.items = this.items.filter(function (filteredItem) {
                return filteredItem !== item;
            })
        },

        saveItem: function (item, newTodoText) {
            item.text = newTodoText;
        }
    }
});