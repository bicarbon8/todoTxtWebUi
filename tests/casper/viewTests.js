var projectPath = "file:///";
function openIndexPage() {
    localStorage.clear();
    // Since Casper has control, the invoked script is deep in the argument stack
    var currentFile = require('system').args[3];
    var curFilePath = fs.absolute(currentFile).split('/');

    // I only bother to change the directory if we weren't already there when invoking casperjs
    if (curFilePath.length > 1) {
        curFilePath.pop(); // PhantomJS does not have an equivalent path.baseName()-like method
        projectPath += curFilePath.join('/') + "/index.html";
    }

    casper.start(projectPath);
}
function addTask(text, test) {
    casper.then(function () {
        test.assertExists('#addTaskButton-button');
        this.click('#addTaskButton-button');
    });
    casper.then(function () {
        test.assertExists('#modalEdit-textarea');
        this.sendKeys('#modalEdit-textarea', text);
    });
    casper.then(function () {
        test.assertExists('#modalEditPreview-button');
        this.click('#modalEditPreview-button');
    });
    casper.then(function () {
        test.assertEquals(this.fetchText('#modalEdit-textarea'), text);
    });
    casper.then(function () {
        test.assertExists('#modalEditSave-button');
        this.click('#modalEditSave-button');
    });
    casper.then(function () {
        test.assertDoesntExist('#modalEdit-textarea');
        test.assertDoesntExist('#modalEditPreview-button');
        test.assertDoesntExist('#modalEditSave-button');
        test.assertEquals(this.fetchText('#listContainer-div button'), text);
    });
}

casper.test.begin('Page loads with expected controls', function (test) {
    openIndexPage();

    casper.then(function() {
        test.assertExists('#fileDrop-div');
        test.assertExists('#fileUpload-input');
        test.assertExists('#addTaskButton-button');
        test.assertExists('#saveFileButton-button');
        test.assertExists('#showClosed-label');
        test.assertExists('#filter-input');
        test.assertExists('#clearFilter-button');
        test.assertExists('#listContainer-div');
        test.assertExists('#priorities-div');
        test.assertExists('#priorities-ul');
        test.assertExists('#projects-div');
        test.assertExists('#projects-ul');
        test.assertExists('#contexts-div');
        test.assertExists('#contexts-ul');
    });

    casper.run(function() {
        test.done();
    });
});
casper.test.begin('can add task with html-unfriendly characters', function (test) {
    openIndexPage();

    var text = '(A) Call Mom & Dad @Phone +Family <tuesday>';
    addTask(text, test);

    casper.run(function() {
        test.done();
    });
});
casper.test.begin('can mark task as completed from list view', function (test) {
    openIndexPage();

    var text = '(A) Call Mom & Dad @Phone +Family <tuesday>';
    addTask(text, test);

    casper.then(function () {
        var className = this.evaluate(function () {
            return document.querySelector('#listContainer-div span').className;
        });
        test.assertMatch(className, /(btn-default)/, 'Expected that task was not already closed');
    });

    casper.then(function () {
        this.click('#listContainer-div span');
    });
    casper.then(function () {
        test.assertDoesntExist('#listContainer-div button');
    });
    casper.then(function () {
        this.click('#showClosed-label');
    });
    casper.then(function () {
        var className = this.evaluate(function () {
            return document.querySelector('#listContainer-div span').className;
        });
        test.assertMatch(className, /(btn-danger)/, 'Expected that task was not already closed');
    });

    casper.run(function() {
        test.done();
    });
});