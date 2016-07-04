class Details extends Page {
    constructor() {
        super("details");
        this.setActivePage().done(function (test) {
            console.log(test);
            WinJS.UI.processAll().done(function () {
                
            });
        });
    }
}