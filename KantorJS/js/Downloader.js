var InternetConnection = (function () {
    var ctor = function () {
    };

    ctor.prototype.downloadData = function downloadData(link) {
        var options = {
            url: link,
            type: 'GET'
        };

        WinJS.xhr(options).done(
        function (result) {
            callback(result.responseText, result.status, myArray);
        }
    );
    }
    return ctor;
})();

