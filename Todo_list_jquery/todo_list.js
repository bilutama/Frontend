$(document).ready(function () {
    var todoList = $("#todo-list_content_1");
    var newTodoNote = $("#new_note_1");
    var addNewNoteButton = $("#add_new_note_button_1");

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
                "<textarea class='edit_note autosize'></textarea>" +
                "<span class='button_group'>" +
                "<button class='save_button' type='button'>save</button>" +
                "<button class='cancel_button' type='button'>cancel</button>" +
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
                "<button class='edit_button' type='button'>edit</button>" +
                "<button class='delete_button' type='button'>delete</button>" +
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
        var keycode = (event.keyCode ? event.keyCode : event.which);

        if (keycode === 13) {
            event.preventDefault();
            addNewNoteHandler();
        }
    });

    addNewNoteButton.click(addNewNoteHandler);
});