Vue.component("to-do-item", {
    template: "#to-do-item-template",

    props: {
        item: {
            type: Object,
            required: true
        }
    },

    data: function () {
        return {
            modifiedText: "",
            isModifying: false
        };
    },

    methods: {
        modifyItem: function () {
            this.modifiedText = this.item.text;
            this.isModifying = true;
        },

        saveItem: function () {
            if (this.modifiedText.length === 0) {
                this.$emit("delete-item", this.item);
                return;
            }

            this.$emit("save-item", this.item, this.modifiedText);
            this.isModifying = false;
        },

        autoresize: function (event) {
            event.target.style.height = "auto";
            event.target.style.height = event.target.scrollHeight + "px";
            event.target.style.resize = "none";
        }
    },

    watch: {
        isModifying: function () {
            this.$nextTick(function () {
                if (this.isModifying === true) {
                    this.$refs.autoResizableTextArea.dispatchEvent(new Event("input"));
                }
            });
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

    watch: {
        newTodoText: function (newValue) {
            if (newValue.trim().length > 0) {
                this.isNewTodoInvalid = false;
            }
        }
    },

    created: function () {
        this.triggerTextAreaInputEvent();
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

            this.triggerTextAreaInputEvent();
        },

        deleteItem: function (item) {
            this.items = this.items.filter(function (remainedItem) {
                return remainedItem !== item;
            });
        },

        saveItem: function (item, newTodoText) {
            item.text = newTodoText;
        },

        triggerTextAreaInputEvent: function () {
            this.$nextTick(function () {
                this.$refs.autoResizableTextArea.dispatchEvent(new Event("input"));
            });
        },

        autoresize: function (event) {
            event.target.style.height = "auto";
            event.target.style.height = event.target.scrollHeight + "px";
            event.target.style.resize = "none";
        }
    }
});