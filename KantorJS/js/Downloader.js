var Downloader = (function () {
    var ctor = function () {
    };

    ctor.prototype.downloadLast = function downloadLast() {
        var link = 'http://www.nbp.pl/kursy/xml/lastA.xml';

        var options = {
            url: link,
            type: 'GET'
        };
        this.downloadData(link);
    }

    ctor.prototype.downloadSelected = function downloadSelected(code) {
        var link = "http://www.nbp.pl/kursy/xml/";
        var extension = ".xml";
        this.downloadData(link + code + extension);
    }

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

    function callback(responseText, status, myArray1) {
        if (status === 200) {
            
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(responseText, "text/xml");
            var xmlTree = xmlDoc.getElementsByTagName('pozycja');

            for (var i = 0; i < xmlTree.length; i++) {
                node = xmlTree[i];
                myArray1.push({
                    nazwa_waluty: xmlTree[i].getElementsByTagName('nazwa_waluty')[0].childNodes[0].nodeValue,
                    przelicznik: xmlTree[i].getElementsByTagName('przelicznik')[0].childNodes[0].nodeValue,
                    kod_waluty: xmlTree[i].getElementsByTagName('kod_waluty')[0].childNodes[0].nodeValue,
                    kurs_sredni: xmlTree[i].getElementsByTagName('kurs_sredni')[0].childNodes[0].nodeValue
                });
            }

        } else {
            //output("Error obtaining feed. XHR status code: " + status);
        }
    }

    return ctor;
})();

