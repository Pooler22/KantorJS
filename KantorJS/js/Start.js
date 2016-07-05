class Start extends Page {
    constructor() {
        super("start");

        this.setActivePage().done(() => {
            WinJS.Namespace.define("Sample.ListView", {
                data: myArray
            });
            downloader.downloadYears();
            downloader.downloadSelectedCourses().done(() => {
            // disabledDate = //todo convert myArrayTxt to date array
        });
            var parent = this;
            WinJS.UI.processAll().done(() => {
                parent.datepicker = $('#txtDate').datepicker({
                    endDate: new Date(),
                    daysOfWeekDisabled: [0, 6]
                });

                document.querySelector('#content').winControl.oniteminvoked = parent.openDetailsPage;

                document.querySelector("#selectDate").addEventListener("click", () => {
                    parent.clearList();
                    downloader.downloadSelectedCourses(myArrayTxt.filter(x => x.substring(5) === parent.getSelectedDate(parent)));
                });
            });
        });
    }

    clearList() {
        myArray.splice(0, myArray.length);
    }

    openDetailsPage(eventObject) {
        eventObject.detail.itemPromise.done((invokedItem) => {
            page = new Details(invokedItem.data.kod_waluty);
        });
    }

    getSelectedDate(parent) {
        let year = "" + parent.datepicker.datepicker('getDate').getFullYear() - 2000;
        let month = "" + (parent.datepicker.datepicker('getDate').getMonth() + 1);
        let day = "" + parent.datepicker.datepicker('getDate').getDate();
        return "" + year + (month[1] ? month : "0" + month[0]) + (day[1] ? day : "0" + day[0]);
    }
}