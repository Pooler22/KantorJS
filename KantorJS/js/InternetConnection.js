var InternetConnection = (function () {
    var object = function () {
    };

    object.prototype.isInternetConnection = () => {
        var internetconection = new Windows.Networking.Connectivity.NetworkInformation.getInternetConnectionProfile();
        if ((!('getNetworkConnectivityLevel' in internetconection)) || ((internetconection.getNetworkConnectivityLevel()) < 3)) {
            return false;
        }
        else {
            return true;
        }
    }
    return object;
})();

