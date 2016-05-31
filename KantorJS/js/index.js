//check this link: http://pkapust.kis.p.lodz.pl/HTML5/

var internet = new InternetConnection().isInternetConnection();

var calendar = document.querySelector("#dataSelect");
var control = new WinJS.UI.DatePicker(calendar, { current: new Date() });

var myArray = new WinJS.Binding.List([]);


var link = 'http://www.nbp.pl/kursy/xml/lastA.xml';

var options = {
    url: link,
    type: 'GET'
};

downloadData(link);

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




WinJS.Namespace.define("Sample.ListView", {
    data: myArray
});

WinJS.UI.processAll().done(function () {

    var showButton = document.querySelector(".showButton");
    showButton.addEventListener("click", function () {
        var contentDialog = document.querySelector(".win-contentdialog").winControl;
        contentDialog.show();
    });


    var showButton1 = document.querySelector(".showButton1");
    showButton1.addEventListener("click", function () {
        //to do changeDate();
    });

});


