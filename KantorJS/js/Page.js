class Page {

    constructor(name) {
        this.name = name;
    }
    setActivePage() {
        var content = document.querySelector("#content1");
        content.innerHTML = "";
        return WinJS.UI.Fragments.renderCopy("pages/" + this.name + ".html", content);
    }
}