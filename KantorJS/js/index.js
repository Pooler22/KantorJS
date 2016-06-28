//check this link: http://pkapust.kis.p.lodz.pl/HTML5/

var internet = new InternetConnection().isInternetConnection();
var downloader = new Downloader();
var myArray = new WinJS.Binding.List([]);
var myArrayTxt = [];

WinJS.Namespace.define("Sample.ListView", {
    data: myArray
});

function clearList() {
    myArray.splice(0, myArray.length);
}

downloader.downloadYears();

var datepicker = $('#txtDate').datepicker({
    endDate: new Date(),
    //datesDisabled: [new Date()],
    daysOfWeekDisabled: [0, 6]
});

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

    

    function asyncAdd() {
        return new WinJS.Promise(function (complete) {
            downloader.downloadLast();
            complete();
        });
    }

    asyncAdd().done(function () {
        for (var i = 0; i < myArray.length; i++) {
            myArray[i].likeClick1 = WinJS.Utilities.markSupportedForProcessing(function (e) {
                userLike1(e);
            });
        }
        function userLike1(eventobj) {
            document.getElementById("like").style.display = "none";
        }
    });


});