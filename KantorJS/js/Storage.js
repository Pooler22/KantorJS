class Storage {

    constructor() {
        this.applicationData = Windows.Storage.ApplicationData.current;
        this.localFolder = applicationData.localFolder;
    }
    save(dataSaved, fileName) {
        return this.localFolder.createFileAsync(fileName, Windows.Storage.CreationCollisionOption.replaceExisting)
            .then((file) => {
                 return Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(dataSaved));
            });
    }

    readTimestamp(fileName) {
        this.localFolder.getFileAsync(fileName)
           .then((sampleFile)  =>{
               return Windows.Storage.FileIO.readTextAsync(sampleFile);
           }).done(function (timestamp) {
               // Data is contained in timestamp 
           }, function () {
               // Timestamp not found 
           });
    }
}