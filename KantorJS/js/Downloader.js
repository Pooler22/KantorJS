var Downloader = (function () {
    var ctor = function () {
    };

    ctor.prototype.downloadLast = function () {
        const link = "http://www.nbp.pl/kursy/xml/lastA.xml";
        this.downloadXML(link);
    }

    ctor.prototype.downloadSelected = function (code) {
        this.downloadXML(`http://www.nbp.pl/kursy/xml/` + code + `extension`);
    }

    ctor.prototype.downloadXML = function (link) {
        return new WinJS.Promise(function(complete) {
            const options = {
                url: link,
                type: "GET"
            };

            WinJS.xhr(options).done(
                function(result) {
                    callback(result.responseText, result.status, myArray).done();
                }
                );
            complete(true)
;            });
    }

    function callback(responseText, status, array) {
        return new WinJS.Promise(function(complete) {
            if (status === 200) {

                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(responseText, "text/xml");
                let xmlTree = xmlDoc.getElementsByTagName("pozycja");

                for (let i = 0; i < xmlTree.length; i++) {
                    let node = xmlTree[i];
                    array.push({
                        nazwa_waluty: node.getElementsByTagName("nazwa_waluty")[0].childNodes[0].nodeValue,
                        przelicznik: node.getElementsByTagName("przelicznik")[0].childNodes[0].nodeValue,
                        kod_waluty: node.getElementsByTagName("kod_waluty")[0].childNodes[0].nodeValue,
                        kurs_sredni: node.getElementsByTagName("kurs_sredni")[0].childNodes[0].nodeValue
                    });
                }

            } else {
                //output("Error obtaining feed. XHR status code: " + status);
            }
            complete(true);
        });
    }

    ctor.prototype.downloadYears = function () {
        let currentYear = new Date().getFullYear();
        for (let i = 2002; i < currentYear - 1; i++) {
            downloadYear(i);
        }
        downloadYear("");
    }

    function downloadYear(year) {
        const link = "http://www.nbp.pl/kursy/xml/dir";
        const extension = ".txt";
        downloadTxt(link + year + extension);
    }

    function downloadTxt(link) {
        let options = {
            url: link,
            type: "GET"
        };

        WinJS.xhr(options).done(
        function (result) {
            callback1(result.responseText, result.status, myArrayTxt);
        }
    );
    }

    function callback1(responseText, status, myArray) {
        if (status === 200) {
            myArrayTxt = myArray.concat(responseText.split("\r\n").filter((x) =>  x.substring(0, 1) == "a")); 
        } else {
            //output("Error obtaining feed. XHR status code: " + status);
        }
    }

    return ctor;
})();

