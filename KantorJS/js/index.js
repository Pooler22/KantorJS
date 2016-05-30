var divControlCreation = document.querySelector("#divControlCreation");


    // Create a JavaScript date object for date September 1, 1990.
    // Note, JavaScript months are 0 based so September is referenced by 8, not 9
    var initialDate = new Date(1990, 8, 1, 0, 0, 0, 0);

    // Create a new DatePicker control with value of initialDate inside element "myDatePickerDiv"
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
        var node;
        for (var i = 0; i < xmlDoc.getElementsByTagName('pozycja').length; i++)
        {
            node = xmlDoc.getElementsByTagName('pozycja')[i];
            myArray.push({
                    nazwa_waluty : node.getElementsByTagName('nazwa_waluty')[0].childNodes[0].nodeValue,
                    przelicznik : node.getElementsByTagName('przelicznik')[0].childNodes[0].nodeValue,
                    kod_waluty : node.getElementsByTagName('kod_waluty')[0].childNodes[0].nodeValue,
                    kurs_sredni: node.getElementsByTagName('kurs_sredni')[0].childNodes[0].nodeValue
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


