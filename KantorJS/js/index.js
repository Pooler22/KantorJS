var sue = new InternetConnection().isInternetConnection();

var divControlCreation = document.querySelector("#divControlCreation");

var initialDate = new Date();
var control = new WinJS.UI.DatePicker(divControlCreation, { current: initialDate });

WinJS.log && WinJS.log("Imperative DatePicker with initial date: September, 1, 1990", "sample", "status");



var myArray = new WinJS.Binding.List([]);

var options = {
    url: 'http://www.nbp.pl/kursy/xml/lastA.xml',
    type: 'GET'
};

function callback(responseText, status) {
    if (status === 200) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(responseText, "text/xml");
        var xmlTree = xmlDoc.getElementsByTagName('pozycja');
        
        for (var i = 0; i < xmlTree.length; i++)
        {
            node = xmlTree[i];
            myArray.push({
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

WinJS.xhr(options).done(
    function (result) {
        callback(result.responseText, result.status);
    },
    function (result) {
        callback(null, result.status);
    }
);


WinJS.Namespace.define("Sample.ListView", {
    data: myArray
});

WinJS.UI.processAll();


