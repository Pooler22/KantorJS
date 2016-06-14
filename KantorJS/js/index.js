//check this link: http://pkapust.kis.p.lodz.pl/HTML5/




var internet = new InternetConnection().isInternetConnection();
var downloader = new Downloader();
var myArray = new WinJS.Binding.List([]);
var myArrayTxt = [];

downloader.downloadYears();

var datepicker = $('#sandbox-container').datepicker({
    orientation: "bottom auto",
});

WinJS.Namespace.define("Sample.ListView", {
    data: myArray
});

function clearList() {
    myArray.splice(0, myArray.length);
}

WinJS.UI.processAll().done(function () {

    var showButton = document.querySelector(".showButton");
    showButton.addEventListener("click", () => {
        var contentDialog = document.querySelector(".win-contentdialog").winControl;
        contentDialog.show();
    });

    var showButton1 = document.querySelector(".showButton1");
    showButton1.addEventListener("click", () => {
        clearList();

        var year  = datepicker.datepicker('getDate').getFullYear() - 2000;
        var month = datepicker.datepicker('getDate').getFullYear() - 2000;
        var day = datepicker.datepicker('getDate').getDate();
        var date = year + month + day;

        console.log(myArrayTxt);
        

        var arraycontainsturtles = (myArrayTxt.indexOf(date) > -1);

        downloader.downloadSelected("a001z160104");

    });

    downloader.downloadLast();

});


