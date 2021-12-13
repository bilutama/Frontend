document.addEventListener("DOMContentLoaded", function () {
    var todoList = document.getElementById("todo-list_content");
    var newTodoNote = document.getElementById("new_note");
    var addNewNoteButton = document.getElementById("add_new_note_button");

    newTodoNote.addEventListener("focus", function () {
        document.querySelector("span.error_message").style.display = "none";
    });

    function addNewNoteHandler() {
        var text = newTodoNote.value.trim();

        if (text.length === 0) {
            document.querySelector("span.error_message").style.display = "inline";
            return;
        }

        var todoNote = document.createElement("li");

        function setEditMode() {
            todoNote.innerHTML = "<div class='note_block'>" +
                "<input class='edit_note' type='text'>" +
                "<span class='button_group'>" +
                "<button class='list_button note_button save_button' type='button'>save</button>" +
                "<button class='list_button note_button cancel_button' type='button'>cancel</button>" +
                "</span>" +
                "</div>";

            todoNote.querySelector(".edit_note").value = text;
            todoNote.querySelector(".edit_note").focus();

            todoNote.querySelector(".save_button").addEventListener("click", function () {
                text = todoNote.querySelector(".edit_note").value.trim();

                if (text.length === 0) {
                    todoNote.remove();
                    return;
                }

                setViewMode();
            });

            todoNote.querySelector(".cancel_button").addEventListener("click", setViewMode);
        }

        function setViewMode() {
            todoNote.innerHTML = "<div class='note_block'>" +
                "<span class='todo_note'></span>" +
                "<span class='button_group'>" +
                "<button class='list_button note_button edit_button' type='button'>edit</button>" +
                "<button class='list_button note_button delete_button' type='button'>delete</button>" +
                "</span>" +
                "</div>";

            todoNote.querySelector(".todo_note").textContent = text;

            todoNote.querySelector(".delete_button").addEventListener("click", function () {
                todoNote.remove();
            });

            todoNote.querySelector(".todo_note").addEventListener("click", setEditMode);
            todoNote.querySelector(".edit_button").addEventListener("click", setEditMode);
        }

        setViewMode();
        todoList.appendChild(todoNote);
        newTodoNote.value = "";
    }

    window.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && newTodoNote === document.activeElement) {
            e.preventDefault(); // Preventing form to be sent and page to reload
            addNewNoteHandler();
        }
    });

    addNewNoteButton.addEventListener("click", addNewNoteHandler);
});