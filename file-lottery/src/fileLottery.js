var fs = require('fs');

var fileLottery = function(directoryPath, randomIndexFn) {
    this.directoryPath = directoryPath;
    this.fileType = getFileType(directoryPath);
    this.randomIndexFn = randomIndexFn;
    this.fileArray = this.fileType == "dir" ? shuffle(fs.readdirSync(this.directoryPath), this.randomIndexFn) : [];
    this.fileIndex = 0;
}

fileLottery.prototype.getNextFileName = function() {
    if (this.fileType == "notExists") return "";
    if (this.fileType == "dir") {
        if (this.fileArray.length == 0) return "";
        if (this.fileIndex == this.fileArray.length) {
            this.fileArray = shuffle(this.fileArray, this.randomIndexFn);
            this.fileIndex = 0;
        }
        return this.fileArray[this.fileIndex++];
    }
    return getFileNameFromPath(this.directoryPath);
};

function getFileNameFromPath(path) {
    return path.split('/').pop();
}

function getFileType(path) {
    var exists = fs.existsSync(path);
    if (!exists) return "notExists";
    var fileStat = fs.statSync(path);
    return fileStat.isDirectory() ? "dir" : "file";
}

function shuffle(inputArray, randomIndexFn) {
    var outputArray = inputArray.slice();
    var length = outputArray.length;
    for (var i = 0; i < length; i++) {
        var index = randomIndexFn ? randomIndexFn(length) : randomIndex(length);
        var tmpElement = outputArray[index];
        outputArray[index] = outputArray[i];
        outputArray[i] = tmpElement;
    }
    return outputArray;
}

function randomIndex(size) {
    return Math.floor(Math.random() * size);
}

module.exports.fileLottery = fileLottery;
module.exports.getFileType = getFileType;