$(document).ready(function () {
    var todoList = $("#todo-list_content");
    var newTodoNote = $("#new_note");
    var addNewNoteButton = $("#add_new_note_button");

    newTodoNote.click(function () {
        $("span.error_message").css("display", "none");
    });

    function addNewNoteHandler() {
        var text = newTodoNote.val().trim();

        if (text.length === 0) {
            $("span.error_message").css("display", "inline");
            return;
        }

        var todoNote = $("<li>");

        function setEditMode() {
            todoNote.html("<div class='note_block'>" +
                "<input class='edit_note' type='text'>" +
                "<button class='save_button' type='button'>save</button>" +
                "<button class='cancel_button' type='button'>cancel</button>" +
                "</div>");

            todoNote.find(".edit_note").val(text);
            todoNote.find(".edit_note").focus();

            todoNote.find(".save_button").click(function () {
                text = todoNote.find(".edit_note").val().trim();

                if (text.length === 0) {
                    todoNote.remove();
                    return;
                }

                setViewMode();
            });

            todoNote.find(".cancel_button").click(setViewMode);
        }

        function setViewMode() {
            todoNote.html("<div class='note_block'>" +
                "<span class='todo_note'></span>" +
                "<input class='edit_button' type='image' alt='edit' src='resources/edit.png' height='20' width='20'>" +
                "<input class='delete_button' type='image' alt='delete' src='resources/remove.png' height='20' width='20'>" +
                "</div>");

            todoNote.find(".todo_note").text(text);

            todoNote.find(".delete_button").click(function () {
                todoNote.remove();
            });

            todoNote.find(".todo_note").click(setEditMode);
            todoNote.find(".edit_button").click(setEditMode);
        }

        setViewMode();
        todoList.append(todoNote);
        newTodoNote.val("");
    }

    // $(document).on("keypress", function (e) {
    //     if (e.key === "Enter" && newTodoNote === document.activeElement) {
    //         alert("ENTER");
    //         //e.preventDefault(); // Preventing form to be sent and page to reload
    //         addNewNoteHandler();
    //         return false;
    //     }
    // });

    newTodoNote.keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode === 13){
            event.preventDefault();
            addNewNoteHandler();
        }
    });

    addNewNoteButton.click(addNewNoteHandler);
});