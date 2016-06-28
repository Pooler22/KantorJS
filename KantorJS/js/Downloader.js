var Downloader = (function () {
    var ctor = function () {
    };

    ctor.prototype.downloadLast = function () {
        this.downloadXML("http://www.nbp.pl/kursy/xml/lastA.xml");
    }

    ctor.prototype.downloadSelected = function (code) {

        this.downloadXML(`http://www.nbp.pl/kursy/xml/` + code + `.xml`);
    }

    ctor.prototype.downloadXML = function (link) {
        return new WinJS.Promise(function (complete) {
            WinJS.xhr({ url: link, type: "GET" }).done(
               function (result) {
                   parse(result.responseText, result.status, myArray).then(complete());
                   ;
               }
               );
        });
    }

    function parse(responseText, status, array) {
        return new WinJS.Promise(function (complete) {
            if (status === 200) {
                let xmlDoc = new DOMParser().parseFromString(responseText, "text/xml");
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
            complete();
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
        downloadTxt("http://www.nbp.pl/kursy/xml/dir" + year + ".txt");
    }

    function downloadTxt(link) {
        WinJS.xhr({ url: link, type: "GET" }).done(
            function completed(request) {
                callback1(request.responseText, request.status, myArrayTxt);
                $("#loading").text("Załadowano");
            },
            function error(request) {
                $("#loading").text("Błąd ładowania");
            }, 
            function progress(request) {
                $("#loading").text("Ładowanie");
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

