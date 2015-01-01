var TodoTxtJs = TodoTxtJs || {};

TodoTxtJs.Utils = {
	handleFileSelect: function (e) {
		e.stopPropagation();
		e.preventDefault();

		var files = e.originalEvent.target.files || e.originalEvent.dataTransfer.files; // FileList object.

		// files is a FileList of File objects.
		if (files.length > 0) {
			var f = files[0];
			
			// process using a FileReader
			var reader = new FileReader();

			// get the content as a String
			reader.onloadend = function (e) {
				TodoTxtJs.processTodoTxtFile(e.target.result);
			};
			reader.readAsText(f, "UTF-8");
		}
	},

	handleDragOver: function (e) {
		e.stopPropagation();
		e.preventDefault();
		e.originalEvent.dataTransfer.dropEffect = "copy"; // Explicitly show this is a copy.
	},

	/**
	 * function will generate a GUID for use in dynamic DOM ID's
	 * code taken from: Kevin Hakanson at http://stackoverflow.com/a/873856
	 */
	createUUID: function () {
	    // http://www.ietf.org/rfc/rfc4122.txt
	    var s = [];
	    var hexDigits = "0123456789abcdef";
	    for (var i = 0; i < 36; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	    s[8] = s[13] = s[18] = s[23] = "-";

	    var uuid = s.join("");
	    return uuid;
	},

	/**
	 * function will format a Date object to a string of YYYY-MM-DD
	 */
	formatDate: function (dateObj) {
		var yyyy = dateObj.getFullYear();
		var mm = dateObj.getMonth()+1; // getMonth() is zero-based
		var dd  = dateObj.getDate();
		return String(10000*yyyy + 100*mm + dd); // Leading zeros for mm and dd
	},
};