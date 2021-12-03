document.addEventListener("DOMContentLoaded", function () {
    var todoList = document.getElementById("todo-list_content");
    var newNote = document.getElementById("new_note");
    var saveNoteButton = document.getElementById("save_note_button");

    saveNoteButton.addEventListener("click", function () {
        var text = newNote.value.trim();

        if (text.length === 0) {
            return
        }

        var newTodoItem = document.createElement("li");

        function setEditMode() {
            newTodoItem.innerHTML = "<input class='edit-note'>"
                + "<button class='save_button' type='button'>save</button>"
                + "<button class='cancel_button' type='button'>cancel</button>";

            newTodoItem.querySelector(".edit_note").value = text;

            newTodoItem.querySelector(".save_button").addEventListener("click", function () {
                text = newTodoItem.querySelector(".edit_note").value;
                setViewMode();
            });

            newTodoItem.querySelector(".cancel_button").addEventListener("click", function () {
                setViewMode();
            });
        }

        function setViewMode() {
            newTodoItem.innerHTML = "<span class='todo_note'>"
                + "</span><button class='edit_button' type='button'>edit</button>"
                + "<button class='delete_button' type='button'>delete</button>";

            newTodoItem.querySelector(".todo_note").textContent = text;

            newTodoItem.querySelector(".delete_button").addEventListener("click", function () {
                newTodoItem.remove();
            });

            newTodoItem.querySelector(".edit_button").addEventListener("click", function () {
                setEditMode();
            });
        }

        setViewMode();
        todoList.appendChild(newTodoItem);
        newNote.value = "";
    });
});