$(document).ready(function () {
    var todoList = $("#todo-list_content");
    var newTodoNote = $("#new_note");
    var addNewNoteButton = $("#add_new_note_button");

    newTodoNote.click(function () {
        $("span.error_message").hide();
    });

    function addNewNoteHandler() {
        var text = newTodoNote.val().trim();

        if (text.length === 0) {
            $("span.error_message").show();
            return;
        }

        var todoNote = $("<li>");

        function setEditMode() {
            todoNote.html("<div class='note_block'>" +
                "<textarea class='edit_note autosize'></textarea>" +
                "<span class='button_group'>" +
                "<button class='list_button note_button save_button' type='button'>save</button>" +
                "<button class='list_button note_button cancel_button' type='button'>cancel</button>" +
                "</span>" +
                "</div>");

            todoNote.find(".edit_note").val(text);
            todoNote.find(".edit_note").focus();

            autosize();

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
                "<span class='button_group'>" +
                "<button class='list_button note_button edit_button' type='button'>edit</button>" +
                "<button class='list_button note_button delete_button' type='button'>delete</button>" +
                "</span>" +
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

        function autosize() {
            var textArea = $(".autosize");

            textArea.each(function () {
                $(this).attr("rows", 1);
                resize($(this));
            });

            textArea.on("input", function () {
                resize($(this));
            });

            function resize($textArea) {
                $textArea.css("height", "auto");
                $textArea.css("height", $textArea[0].scrollHeight + "px");
            }
        }
    }

    newTodoNote.keydown(function (event) {
        var keyCode = (event.keyCode ? event.keyCode : event.which);

        if (keyCode === 13) {
            event.preventDefault();
            addNewNoteHandler();
        }
    });

    addNewNoteButton.click(addNewNoteHandler);
});