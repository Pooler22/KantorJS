class Downloader {

    downloadLastCourses() {
        return this.downloadXML("http://www.nbp.pl/kursy/xml/lastA.xml");
    }

    downloadSelectedCourses(code) {
        this.downloadXML(`http://www.nbp.pl/kursy/xml/` + code + `.xml`);
    }

    downloadXML(link) {
        return new WinJS.Promise(function (complete) {
            WinJS.xhr({ url: link, type: "GET" }).done(
                function completed(result) {
                    if (result.status === 200) {
                        let xmlDoc = new DOMParser().parseFromString(result.responseText, "text/xml");
                        let xmlTree = xmlDoc.getElementsByTagName("pozycja");
                        //TODO: myArray jako parametr
                        for (let i = 0; i < xmlTree.length; i++) {
                            let node = xmlTree[i];
                            myArray.push({
                                nazwa_waluty: node.getElementsByTagName("nazwa_waluty")[0].childNodes[0].nodeValue,
                                przelicznik: node.getElementsByTagName("przelicznik")[0].childNodes[0].nodeValue,
                                kod_waluty: node.getElementsByTagName("kod_waluty")[0].childNodes[0].nodeValue,
                                kurs_sredni: node.getElementsByTagName("kurs_sredni")[0].childNodes[0].nodeValue
                            });
                        }
                        complete(myArray);
                    } else {
                        //TODO: Error nie pobrano
                    }
                    $("#loading").toggle();
                    //$("#content").toggle();
                    $("#status").text("Wczytano dane");
                },
                function error(request) {
                    $("#status").text("Wystąpił błąd...");
                },
                function progress(request) {
                    $("#loading").show();
                    //TODO: paroswanie w trakcie
                    $("#status").text("Wczytywanie danych...");
                }
            );
        });
    }

    downloadYears() {
        let tab = [];
        let currentYear = new Date().getFullYear();
        for (let i = 2002; i < currentYear - 1; i++) {
            //todo: promis z przeliczaniem postepu 
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
                    //WinJS.UI.processAll();
                    myArrayTxt = myArrayTxt.concat(request.responseText.split("\r\n").filter((x) => x.substring(0, 1) === "a"));
                } else {
                    //todo: info o niepowodzeniu pobrania
                }
                $("#status").text("Wczytano dane");
            },
            function error(request) {
                $("#status").text("Wystąpił błąd...");
                //TODO: informacja o bledzie
            },
            function progress(request) {
                $("#status").text("Wczytywanie danych");
                //TODO: paroswanie w trakcie
            }
        );
    }
};