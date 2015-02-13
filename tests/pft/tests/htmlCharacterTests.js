var fs = require('fs');
var cwd = fs.workingDirectory;
var TH = require(cwd + '/tests/pft/testHelper.js');

var cases = [
'(A) Call Mom & Dad @Phone +Family <tuesday>',
'& I have > you do &'
];
/*jshint loopfunc: true*/
for (var i=0; i<cases.length; i++) {
    (function (data) {
        PFT.tester.run('can add task with html-unfriendly characters: ' + JSON.stringify(data), function (page, assert) {
            var curPage = new PFT.BasePage(page);
            TH.openIndexPage(curPage, function (curPage) {
                var text = data;
                TH.addTask(text, curPage, assert, function afterAddTask() {
                    // make async to prevent inline exception
                    setTimeout(function () {
                        assert.pass();
                    }, 0);
                });
            });
        }, 60000);
    })(cases[i]);
}
