class Downloader {

    downloadLast () {
        this.downloadXML("http://www.nbp.pl/kursy/xml/lastA.xml");
    }

    downloadSelected(code) {

        this.downloadXML(`http://www.nbp.pl/kursy/xml/` + code + `.xml`);
    }

    downloadXML(link) {
        return new WinJS.Promise(function (complete) {
            WinJS.xhr({ url: link, type: "GET" }).done(
               function (result) {
                   if (result.status === 200) {
                       let xmlDoc = new DOMParser().parseFromString(result.responseText, "text/xml");
                       let xmlTree = xmlDoc.getElementsByTagName("pozycja");

                       for (let i = 0; i < xmlTree.length; i++) {
                           let node = xmlTree[i];
                           myArray.push({
                               nazwa_waluty: node.getElementsByTagName("nazwa_waluty")[0].childNodes[0].nodeValue,
                               przelicznik: node.getElementsByTagName("przelicznik")[0].childNodes[0].nodeValue,
                               kod_waluty: node.getElementsByTagName("kod_waluty")[0].childNodes[0].nodeValue,
                               kurs_sredni: node.getElementsByTagName("kurs_sredni")[0].childNodes[0].nodeValue
                           });
                       }
                   } else {
                       //output("Error obtaining feed. XHR status code: " + status);
                   }
               }
               );
        });
    }
    
    downloadYears() {
        var tab = [];
        let currentYear = new Date().getFullYear();
        for (let i = 2002; i < currentYear - 1; i++) {
            tab.push(this.downloadYear(i));
        }
        tab.push(this.downloadYear(""));
        return tab;
    }

    downloadYear(year) {
        return this.downloadTxt("http://www.nbp.pl/kursy/xml/dir" + year + ".txt");
    }

    downloadTxt(link) {
        WinJS.xhr({ url: link, type: "GET" }).done(
            function completed(request) {

                if (request.status === 200) {
                    return myArray.concat(request.responseText.split("\r\n").filter((x) =>  x.substring(0, 1) === "a"));
                } else {
                    //output("Error obtaining feed. XHR status code: " + status);
                }

                $("#loading").text("Załadowano");
                $("#listView").css({ "display": "block" });
                $("#loadingRing").css({ "visibility": "hidden" });
                WinJS.UI.processAll();
            },
            function error(request) {
                $("#loading").text("Błąd ładowania");
            }, 
            function progress(request) {
                $("#loading").text("Ładowanie");
                $("#listView").toggle();
                $("#loadingRing").toggle();
            }
    );
    }
};

