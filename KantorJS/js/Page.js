class Page {

    constructor(name) {
        this.name = name;
    }
    setContent() {
        var content = document.querySelector("#content1");
        WinJS.UI.Fragments.renderCopy("pages/" + this.name + ".html", content).done(function() {
            WinJS.UI.processAll();
        });
    }
}