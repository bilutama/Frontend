document.addEventListener("DOMContentLoaded", function () {
    var todoList = document.getElementById("todo-list_content");
    var newTodoNoteElement = document.getElementById("new_note");
    var addNewNoteButton = document.getElementById("add_new_note_button");

    newTodoNoteElement.addEventListener("focus", function () {
        document.querySelector("span.error_message").style.display = "none";
    });

    function addNewNoteHandler() {
        var text = newTodoNoteElement.value.trim();

        if (text.length === 0) {
            document.querySelector("span.error_message").style.display = "inline";
            return;
        }

        var todoNote = document.createElement("li");

        function setEditMode() {
            todoNote.innerHTML = "<div class='note_block'>" +
                "<input class='edit_note' type='text'>" +
                "<button class='save_button' type='button'>save</button>" +
                "<button class='cancel_button' type='button'>cancel</button>" +
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
                "<input class='edit_button' type='image' alt='edit' src='resources/edit.png' height='20' width='20'>" +
                "<input class='delete_button' type='image' alt='delete' src='resources/remove.png' height='20' width='20'>" +
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
        newTodoNoteElement.value = "";
    }

    window.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && newTodoNoteElement === document.activeElement) {
            e.preventDefault(); // Preventing form to be sent and page to reload
            addNewNoteHandler();
        }
    });

    addNewNoteButton.addEventListener("click", addNewNoteHandler);
});