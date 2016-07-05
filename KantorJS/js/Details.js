class Details extends Page {

    constructor(code) {
        super("details");
        this.code = code;

        this.setActivePage().done(() => {
            WinJS.UI.processAll().done(() => {
                $("#container").ejChart({
                    primaryXAxis: {
                        title: { text: 'Year' },
                        valueType: 'category'
                    },
                    primaryYAxis: {
                        labelFormat: "{value}%",
                        title: { text: 'Efficiency' },
                    },
                    commonSeriesOptions:
                    {
                        type: 'line',
                        enableAnimation: true,
                        tooltip: { visible: true, template: 'Tooltip' },
                        border: { width: 1 }
                    },
                    series: [{
                        points: [
                            { x: 2005, y: 28 }, { x: 2006, y: 25 }, { x: 2007, y: 26 }, { x: 2008, y: 27 },
                            { x: 2009, y: 32 }, { x: 2010, y: 35 }, { x: 2011, y: 30 }
                        ],
                        name: 'India'
                    }],
                    isResponsive: true,
                    load: "loadTheme",
                    title: { text: 'Efficiency of oil-fired power production' },
                    theme: 'gradientdark',
                    legend: { visible: true }
                });
            });
        });
    }
}