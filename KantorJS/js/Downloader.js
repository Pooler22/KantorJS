class Downloader {

    downloadSelectedCourses(code) {
        return this.downloadXML('http://www.nbp.pl/kursy/xml/' + (typeof code !== 'undefined' ? code : "lastA") + '.xml');
    }

    downloadXML(link) {
        return new WinJS.Promise((complete) => {
            WinJS.xhr({ url: link, type: "GET" }).done(
                (result) => {
                    if (result.status === 200) {
                        let xmlTree = new DOMParser()
                            .parseFromString(result.responseText, "text/xml")
                            .getElementsByTagName("pozycja");
                        let result1 = [];

                        for (let i = 0; i < xmlTree.length; i++) {
                            let node = xmlTree[i];
                            result1.push({
                                nazwa_waluty: node.getElementsByTagName("nazwa_waluty")[0].childNodes[0].nodeValue,
                                kod_waluty: node.getElementsByTagName("kod_waluty")[0].childNodes[0].nodeValue,
                                kurs_sredni: parseFloat(node.getElementsByTagName("kurs_sredni")[0].childNodes[0].nodeValue.replace(",", "."))
                                * parseFloat(node.getElementsByTagName("przelicznik")[0].childNodes[0].nodeValue)
                            });
                        }
                        complete(result1);
                    } else {
                        //TODO: Error nie pobrano
                        $("#status").text("Błąd z wczytywaniem danych...");
                    }
                    $("#loading").toggle();
                    $("#status").text("Wczytano dane");
                },
                (request) => {
                    $("#status").text("Wystąpił błąd...");
                },
                (request) => {
                    $("#loading").show();
                    $("#status").text("Wczytywanie danych...");
                }
            );
        });
    }

    downloadYears() {
        let tab = [];
        let currentYear = new Date().getFullYear();
        let firstAviableYear = 2002;
        for (let i = firstAviableYear; i < currentYear - 1; i++) {
            this.downloadYear(i).then((result) => {
                tab.push(result);
            });
        }
        this.downloadYear("").then((result) => {
            tab.push(result);
        });
        return tab;
    }

    downloadYear(year) {
        return new WinJS.Promise((complete) => {
            WinJS.xhr({ url: "http://www.nbp.pl/kursy/xml/dir" + year + ".txt", type: "GET" }).done(
                (request) => {
                    if (request.status === 200) {
                        let result = request.responseText.split("\r\n").filter((x) => x.substring(0, 1) === "a");
                        complete(result);
                    } else {
                        $("#status").text("Wystąpił błąd z wczytaniem daych...");
                    }
                    $("#status").text("Wczytano dane.");
                },
                (request) => {
                    $("#status").text("Wystąpił błąd...");
                },
                (request) => {
                    $("#status").text("Wczytywanie danych.");
                }
            );
        });
    }

    downloadSelected(code, startDate, endDate) {
        return this.downloadJSON("http://api.nbp.pl/api/exchangerates/rates/a/" + code + "/" + startDate + "/" + endDate + "/?format=json");
    }

    downloadJSON(link) {
        return new WinJS.Promise((complete) => {
            WinJS.xhr({ url: link, type: "GET" }).done(
                (result) => {
                    if (result.status === 200) {
                        complete(JSON.parse(result.responseText));
                    } else {
                        $("#status").text("Wystąpił błąd...");
                    }
                    $("#loading").toggle();
                    $("#status").text("Wczytano dane");
                },
                (request) => {
                    $("#status").text("Wystąpił błąd...");
                },
                (request) => {
                    $("#loading").show();
                    $("#status").text("Wczytywanie danych...");
                }
            );
        });
    }
};