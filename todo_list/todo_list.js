document.addEventListener("DOMContentLoaded", function () {
    var todoList = document.getElementById("todo-list_content");
    var newTodoNote = document.getElementById("new_note");
    var addNewNoteButton = document.getElementById("add_new_note_button");

    addNewNoteButton.addEventListener("click", function () {
        var text = newTodoNote.value.trim();

        if (text.length === 0) {
            return
        }

        var todoNote = document.createElement("li");

        function setEditMode() {
            todoNote.innerHTML = "<div class='note_block'><input class='edit_note'></div>"
                + "<div class='note_block'><input class='save_button' type='image' src='resources/save.png' alt='save' height='32' width='32'></div>";

            todoNote.querySelector(".edit_note").value = text;
            todoNote.querySelector(".edit_note").focus();

            todoNote.querySelector(".save_button").addEventListener("mousedown", function () {
                text = todoNote.querySelector(".edit_note").value;
                setViewMode();
            });

            todoNote.querySelector(".edit_note").addEventListener("blur", function () {
                //setViewMode();
            });
        }

        function setViewMode() {
            todoNote.innerHTML = "<div class='note_block'><span class='todo_note'></span></div>"
                + "<div class='note_block'><input class='edit_button' type='image' alt='edit' src='resources/edit.png'  height='26' width='26'></div>"
                + "<div class='note_block'><input class='delete_button' type='image' alt='delete' src='resources/remove.png'  height='26' width='26'></div>";

            todoNote.querySelector(".todo_note").textContent = text;

            todoNote.querySelector(".delete_button").addEventListener("click", function () {
                todoNote.remove();
            });

            todoNote.querySelector(".todo_note").addEventListener("click", function () {
                setEditMode();
            });

            todoNote.querySelector(".edit_button").addEventListener("click", function () {
                setEditMode();
            });
        }

        setViewMode();
        todoList.appendChild(todoNote);
        newTodoNote.value = "";
    });
});