//check this link: http://pkapust.kis.p.lodz.pl/HTML5/

var internet = new InternetConnection().isInternetConnection();
var downloader = new Downloader();
var myArray = new WinJS.Binding.List([]);
var myArrayTxt = [];

downloader.downloadYears();

var datepicker = $('#data-picker').datepicker({
    orientation: "bottom auto",
});

WinJS.Namespace.define("Sample.ListView", {
    data: myArray
});

function clearList() {
    myArray.splice(0, myArray.length);
}

WinJS.UI.processAll().done(function () {

    let showButton1 = document.querySelector(".showButton1");
    showButton1.addEventListener("click", () => {
        clearList();

        let year = "" +datepicker.datepicker('getDate').getFullYear() - 2000;
        let month = "" + (datepicker.datepicker('getDate').getMonth() + 1);
        let day = "" + datepicker.datepicker('getDate').getDate();
        let date = "" + year + (month[1] ? month : "0" + month[0]) + (day[1] ? day : "0" + day[0]);

        console.log(myArrayTxt);
        let test  = myArrayTxt.filter(x=>x.substring(5) == date);
        //var arraycontainsturtles = (myArrayTxt.indexOf(date) > -1);
        downloader.downloadSelected(test);
    });

    downloader.downloadLast();

});


