document.addEventListener("DOMContentLoaded", function () {
    var todoList = document.getElementById("todo-list_content");
    var newNote = document.getElementById("new_note");
    var saveNewNoteButton = document.getElementById("save_note_button");

    saveNewNoteButton.addEventListener("click", function () {
        var text = newNote.value.trim();

        if (text === "") {
            return
        }

        var newTodoListItem = document.createElement("li");
        newTodoListItem.innerHTML = "<span class='todo_note'></span><button class='edit_button' type='button'>edit</button><button class='delete_button' type='button'>delete</button>";
        newTodoListItem.querySelector(".todo_note").textContent = text;

        todoList.appendChild(newTodoListItem);
        newNote.value = "";

        var deleteButton = newTodoListItem.querySelector(".delete_button");
        deleteButton.addEventListener("click", function (){
            newTodoListItem.remove();
        });

        var editButton = newTodoListItem.querySelector(".edit_button");
        deleteButton.addEventListener("click", function (){
            newTodoListItem.remove();
        });
    });
});