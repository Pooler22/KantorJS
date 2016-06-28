//check this link: http://pkapust.kis.p.lodz.pl/HTML5/

var downloader = new Downloader();
var myArray = new WinJS.Binding.List([]);
var myArrayTxt = [];

$("#listView").toggle();
if (new InternetConnection().isInternetConnection()) {
    $("#internetConnection").text("Internet connection: true");
}
else{
    $("#internetConnection").text("Internet connection: false");
}

WinJS.Namespace.define("Sample.ListView", {
    data: myArray
});

downloader.downloadLast();
myArrayTxt = downloader.downloadYears();

var datepicker = $('#txtDate').datepicker({
    endDate: new Date(),
    daysOfWeekDisabled: [0, 6]
});

WinJS.UI.processAll().done(function () {

    let showButton1 = document.querySelector("#selectDate");

    showButton1.addEventListener("click", () => {
        clearList();
        let test = myArrayTxt.filter(x=>x.substring(5) == getSelectedDate());
        downloader.downloadSelected(test);
    });
});

function clearList() {
    myArray.splice(0, myArray.length);
}

function getSelectedDate() {
    let year = "" + datepicker.datepicker('getDate').getFullYear() - 2000;
    let month = "" + (datepicker.datepicker('getDate').getMonth() + 1);
    let day = "" + datepicker.datepicker('getDate').getDate();
    return "" + year + (month[1] ? month : "0" + month[0]) + (day[1] ? day : "0" + day[0]);
}
