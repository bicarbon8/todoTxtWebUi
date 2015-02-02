var fs = require('fs');
var cwd = fs.workingDirectory;

PFT.tester.onAssertionFailure = function (details) {
    PFT.renderPage(details.test.page, details.test.name);
};

var TH = {
    projectPath: null,

    openIndexPage: function(page, callback) {
        if (!TH.projectPath) { // then we haven't set it yet
            TH.projectPath = "file:///" + cwd.replace(/\\/g,'/') + "/index.html";
        }
        page.baseUrl = TH.projectPath;
        page.open(function () { callback.call(this, page); });
    },

    addTask: function(text, curPage, assert, callback) {
        curPage.waitFor('#addTaskButton-button', function newTaskButtonFound(found, errMessage) {
            assert.isTrue(found, errMessage);
            curPage.click('#addTaskButton-button');
            curPage.waitFor('#modalEdit-textarea', function modalFound(found, errMessage) {
                assert.isTrue(found, errMessage);
                curPage.sendKeys('#modalEdit-textarea', text, function afterKeys() {
                    curPage.waitFor('#modalEditPreview-button', function modalPreviewFound(found, errMessage) {
                        assert.isTrue(found, errMessage);
                        curPage.click('#modalEditPreview-button');
                        var actualText = curPage.getText('#modalEdit-textarea');
                        assert.isTrue(actualText === text, 'Expected that task text would remain unchanged after preview. actual: "' + actualText + '" !== expected: "' + text + '"');
                        curPage.waitFor('#modalEditSave-button', function modalSaveFound(found, errMessage) {
                            assert.isTrue(found, errMessage);
                            curPage.click('#modalEditSave-button');
                            assert.isTrue(!curPage.exists('#modalEdit-textarea'), 'Expected modal to be dismissed, but was not');
                            assert.isTrue(!curPage.exists('#modalEditPreview-button'), 'Expected modal to be dismissed, but was not');
                            assert.isTrue(!curPage.exists('#modalEditSave-button'), 'Expected modal to be dismissed, but was not');
                            var actualText = curPage.getText('#listContainer-div button');
                            assert.isTrue(actualText === text, 'Expected that task text would display in list after save. actual: "' + actualText + '" !== expected: "' + text + '"');
                            callback.call(this, curPage);
                        }, 2000);
                    }, 2000);
                });
            }, 2000);
        }, 5000);
    }
};

module.exports = TH;
