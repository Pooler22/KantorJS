var downloader = new Downloader();
var page;
var data = loadData();

function loadData() {
    //todo: load data from file, selected page
    return { page: true };
}

if (data.page) {
    page = new Start();
} else {
    page = new Details();
}