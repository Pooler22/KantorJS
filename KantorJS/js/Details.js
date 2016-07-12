class Details extends Page {

    constructor(code) {
        super("details");
        this.code = code;
        this.result = [];
        this.datapickerStart = [];
        this.datapickerEnd = [];
        var parent = this;

        this.setActivePage().done(() => {
            WinJS.UI.processAll().done(() => {

                let monthBefore = new Date();
                monthBefore = new Date(monthBefore.setMonth(monthBefore.getMonth() - 1));


                document.querySelector("#back").addEventListener("click", () => {
                    page = new Start();
                });
                parent.datapickerStart = $('#datapickerStart').datepicker({
                    endDate: new Date(),
                    autoclose: true,
                });
                parent.datapickerStart.text(monthBefore.yyyymmdd());
                parent.datapickerStart.on('changeDate', function () {
                    parent.datapickerStart.text(parent.datapickerStart.data('datepicker').dates[0].yyyymmdd());
                });

                parent.datapickerEnd = $('#datapickerEnd').datepicker({
                    endDate: new Date(),
                    autoclose: true,
                });
                parent.datapickerEnd.text(new Date().yyyymmdd());
                parent.datapickerEnd.on('changeDate', function () {
                    parent.datapickerEnd.text(parent.datapickerEnd.data('datepicker').dates[0].yyyymmdd());
                });

                downloader.downloadSelected(parent.code, monthBefore.yyyymmdd(), new Date().yyyymmdd()).done((result) => {
                    parent.result = result;
                    let values = parent.result.rates.map((value) => { return { x: new Date(value.effectiveDate), y: value.mid } });
                    $("#container").ejChart({
                        primaryXAxis: {
                            title: { text: 'Year' },
                            labelFormat: 'dd MMM yyyy'
                        },
                        primaryYAxis: {
                            title: { text: 'Value' },
                        },
                        commonSeriesOptions:
                        {
                            type: 'line',
                            enableAnimation: true,
                            tooltip: { visible: true, template: 'Tooltip' },
                            border: { width: 1 }
                        },
                        series: [{
                            points: values,
                            name:  parent.result.code + " " + parent.result.currency
                        }],
                        isResponsive: true,
                        load: "loadTheme",
                        title: { text: parent.result.currency },
                        theme: 'gradientdark',
                        legend: { visible: true }
                    });
                });
            });
        });
    }
}