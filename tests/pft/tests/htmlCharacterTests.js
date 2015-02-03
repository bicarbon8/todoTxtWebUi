var fs = require('fs');
var cwd = fs.workingDirectory;
var TH = require(cwd + '/tests/pft/testHelper.js');

var cases = [
'(A) Call Mom & Dad @Phone +Family <tuesday>',
'& I have > you do &'
];
/*jshint loopfunc: true*/
for (var i=0; i<cases.length; i++) {
    var testData = cases[i];
    PFT.tester.test('can add task with html-unfriendly characters', { maxDuration: 60000 }, testData, function (page, data, assert) {
        var curPage = new PFT.BasePage(page);
        TH.openIndexPage(curPage, function (curPage) {
            var text = data;
            TH.addTask(text, curPage, assert, function afterAddTask() {
                assert.pass();
            });
        });
    });
}

PFT.tester.start();
