Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();

    return [this.getFullYear(), "-", (mm.toString()[1] ? mm : "0" + mm.toString()[0]), "-", (dd.toString()[1] ? dd : "0" + dd.toString()[0])].join('');
};

class InternetConnection {

    static isInternetConnection() {
        let internetconection = new window.Windows.Networking.Connectivity.NetworkInformation.
            getInternetConnectionProfile();
        return ((!("getNetworkConnectivityLevel" in internetconection)) ||
            ((internetconection.getNetworkConnectivityLevel()) < 3))
            ? false
            : true;
    }
};