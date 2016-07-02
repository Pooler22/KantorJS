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