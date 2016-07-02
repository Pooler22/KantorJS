class Start extends Page {
    constructor() {
        super();
        this.name = "start";
        this.setContent();

        WinJS.Namespace.define("Sample.ListView", {
            data: myArray
        });


        downloader.downloadSelectedCourses().then(
            function() {
                downloader.downloadYears();
            }
        ).then(function() {
            // disabledDate = //todo convert myArrayTxt to date array
        }).done();


        var datepicker = $('#txtDate').datepicker({
            endDate: new Date(), //'06-28-2016',
            daysOfWeekDisabled: [0, 6]
        });

        WinJS.UI.processAll().done(function() {


            let showButton1 = document.querySelector("#selectDate");
            showButton1.addEventListener("click", () => {
                clearList();
                downloader.downloadSelectedCourses(myArrayTxt.filter(x => x.substring(5) === getSelectedDate()));
            });

            function itemInvokedHandler(eventObject) {
                eventObject.detail.itemPromise.done(function(invokedItem) {
                    //var tname = invokedItem.data.tname;
                    //var a = "wow";
                    $("#content1").load("pages/details.html");
                });
            }

            if (false) {
                document.querySelector('#content').winControl.oniteminvoked = itemInvokedHandler;
            }


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

    }
}