class Start extends Page {
    constructor() {
        super("start");

        this.setActivePage().done(() => {
            WinJS.UI.processAll().done(() => {
                document.querySelector('#content').winControl.oniteminvoked = clickItem;

            });

            let showButton1 = document.querySelector("#selectDate");
            showButton1.addEventListener("click", () => {
                clearList();
                downloader.downloadSelectedCourses(myArrayTxt.filter(x => x.substring(5) === getSelectedDate()));
            });
        });

        WinJS.Namespace.define("Sample.ListView", {
            data: myArray
        });

        downloader.downloadSelectedCourses().then(
            () => {
                downloader.downloadYears();
            }
        ).then(() => {
            // disabledDate = //todo convert myArrayTxt to date array
        }).done();


        var datepicker = $('#txtDate').datepicker({
            endDate: new Date(),
            daysOfWeekDisabled: [0, 6]
        });

        function clickItem(eventObject) {
            eventObject.detail.itemPromise.done((invokedItem) => {
                page = new Details(invokedItem.data.kod_waluty);
            });
        }

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