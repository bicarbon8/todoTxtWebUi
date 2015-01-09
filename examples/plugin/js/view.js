var TodoTxt = TodoTxt || {};
TodoTxt.View = {
    displayTasks: function () {
        var tasks = TodoTxt.getSortedTaskArray();

        for (var i=0; i<tasks.length; i++) {
            var t = tasks[i];
            if (t.isActive) {
                var look = TodoTxt.View.getDisplayClassForTask(t);

                /*jshint multistr: true */
                var task = ' \
<li> \
    <button class="btn btn-block btn-default ellipsis" data-toggle="tooltip" data-placement="top" title="' + t.toString() + '"> \
        <span class="' + look + '">' + t.toString() + '</span> \
    </button> \
</li>';
                $('#taskList').append(task);
            }
        }
    },

    /**
     * function returns the appropriate display classes for this task
     */
    getDisplayClassForTask: function (task) {
        // get a list of the current tasks and iterate through
        var cls = "";
        if (task.priority !== null && task.isActive) {
            if (task.priority === "(A)") {
                cls += " text-danger";
            }
            if (task.priority === "(B)") {
                cls += " text-warning";
            }
            if (task.priority === "(C)") {
                cls += " text-primary";
            }
        }
        
        return cls;
    },
};