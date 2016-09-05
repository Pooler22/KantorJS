class Details extends Page {

    constructor(code) {
        super("details");
        this.code = code;
        this.result = [];
        this.datapickerStart = [];
        this.datapickerEnd = [];
        var parent = this;
        var diagram;

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

                document.querySelector("#generateChart").addEventListener("click", () => {
                    let startDate = parent.datapickerStart.text();
                    let endDate = parent.datapickerEnd.text();

                    if (startDate.substr(0, 4) !== endDate.substr(0, 4)) {
                        var p = [];
                        var index = 0;

                        p[index++] = new WinJS.Promise((complete) => {
                            downloader.downloadSelected(parent.code, startDate, startDate.substr(0, 4) + "-12-31").done((result) => {
                                complete(result);
                            });
                        })

                        for (let i = Number(startDate.substr(0, 4)) + 1 ; i < Number(endDate.substr(0, 4)) ; i++) {
                            p[index++] = new WinJS.Promise((complete) => {
                                downloader.downloadSelected(parent.code, i + "-01-01", i + "-12-31").done((result) => {
                                    complete(result);
                                });
                            })
                        }

                        p[index++] = new WinJS.Promise((complete) => {
                            downloader.downloadSelected(parent.code, endDate.substr(0, 4) + "-01-01", endDate).done((result) => {
                                complete(result);
                            });
                        })

                        WinJS.Promise.join(p).
                       then((test) => {
                           parent.result.rates = [];
                           for (let i = 0; i < test.length; i++) {
                               parent.result.rates = parent.result.rates.concat(test[i].rates);
                           }
                           let values = parent.result.rates.map((value) => { return { x: new Date(value.effectiveDate), y: value.mid } });
                           //                        prepareChart(values);
                           let chartObj = $("#container").ejChart("instance");
                           chartObj.model.series[0].points = values;
                           $("#container").ejChart("redraw");
                       });

                    }
                    else {

                        downloader.downloadSelected(parent.code, startDate, endDate).done((result) => {
                            parent.result = result;
                            let values = parent.result.rates.map((value) => { return { x: new Date(value.effectiveDate), y: value.mid } });
                            let chartObj = $("#container").ejChart("instance");
                            chartObj.model.series[0].points = values;
                            $("#container").ejChart("redraw");

                        });
                    }

                });

                downloader.downloadSelected(parent.code, monthBefore.yyyymmdd(), new Date().yyyymmdd()).done((result) => {
                    parent.result = result;
                    let values = parent.result.rates.map((value) => { return { x: new Date(value.effectiveDate), y: value.mid } });
                    prepareChart(values);
                });

                //datepicker
                parent.datapickerEnd.on('changeDate', function () {
                   testDate(); 
                });
                parent.datapickerStart.on('changeDate', function () {
                   testDate(); 
                });
            });
        });

        function testDate() {
            let btn = $("#generateChart")[0];
            
            let startDate = parent.datapickerStart.text();
            let endDate = parent.datapickerEnd.text();
            if (Number(endDate.substr(0, 4)) < Number(startDate.substr(0, 4))) {
                btn.disabled = true;
            }
            else if (Number(endDate.substr(0, 4)) == Number(startDate.substr(0, 4))) {
                if (Number(endDate.substr(5, 2)) < Number(startDate.substr(5, 2))) {
                    btn.disabled = true;
                }
                else if (Number(endDate.substr(5, 2)) == Number(startDate.substr(5, 2))) {
                    if (Number(endDate.substr(8, 2)) <= Number(startDate.substr(8, 2))) {
                        btn.disabled = true;
                    }
                    else{
                        btn.disabled = false;
                    }
                }
                else {
                    btn.disabled = false;
                }
            }
            else {
                btn.disabled = false;
            }

            WinJS.UI.process(btn);
        }


        function prepareChart(values) {
            diagram = $("#container").ejChart({
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
                    border: { width: 2 }
                },
                series: [{
                    points: values,
                    name: parent.result.code + " " + parent.result.currency,
                }],
                isResponsive: true,
                load: "loadTheme",
                title: { text: parent.result.currency },
                theme: 'gradientdark',
                legend: { visible: true },
                enableCanvasRendering: true,
                exporting: { type: "png", mode: "client", fileName: "ChartSnapshot" }
            });
        }
    }
}