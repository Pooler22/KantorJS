class Page {

    constructor(name) {
        this.name = name;
    }
    setActivePage() {
        var content = document.querySelector("#content1");
        return WinJS.UI.Fragments.renderCopy("pages/" + this.name + ".html", content);
    }
}