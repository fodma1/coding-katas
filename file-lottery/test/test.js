'use strict';

var assert = require('assert');
var sinon = require('sinon');
var path = require('path');
var fs = require('fs');
var path = require('path');

var fileLottery = require('../src/fileLottery.js').fileLottery;
var getFileType = require('../src/fileLottery.js').getFileType;

suite('fileLottery', function() {

  test ("If the passed argument does not exist, then empty string should be returned", function() {
    var EXPECTED_FILENAME = "";

    var stubExistsSync = sinon.stub(fs, "existsSync");
    stubExistsSync.withArgs("test_resources/testfile.txt").returns(false);
    stubExistsSync.withArgs("./nonexistent.txt").returns(false);
    stubExistsSync.withArgs("./dir/nonexistent").returns(false);
    stubExistsSync.withArgs("/Users/dir/nonexistent").returns(false);

    var checkInput = function (input) {
      var f = new fileLottery(input);
      assert.equal(EXPECTED_FILENAME, f.getNextFileName());
      assert.equal(EXPECTED_FILENAME, f.getNextFileName());
    }
    checkInput('nonexistent');
    checkInput('./nonexistent.txt');
    checkInput('./dir/nonexistent');
    checkInput('/Users/dir/nonexistent');

    fs.existsSync.restore();
  });

  test ('If the passed argument is a file, then its name should be returned', function() {
    var EXPECTED_FILENAME = "testfile.txt";

    var stubExistsSync = sinon.stub(fs, "existsSync");
    stubExistsSync.withArgs("test_resources/testfile.txt").returns(true);
    stubExistsSync.withArgs("./test_resources/testfile.txt").returns(true);

    var stubStatSync = sinon.stub(fs, "statSync");
    stubStatSync.withArgs("test_resources/testfile.txt").returns({
      isDirectory : function(){return false;}
    });
    stubStatSync.withArgs("./test_resources/testfile.txt").returns({
      isDirectory : function(){return false;}
    });

    var checkInput = function (input) {
      var f = new fileLottery(input);
      assert.equal(EXPECTED_FILENAME, f.getNextFileName());
      assert.equal(EXPECTED_FILENAME, f.getNextFileName());
    }
    checkInput('test_resources/testfile.txt');
    checkInput('./test_resources/testfile.txt');

    fs.existsSync.restore();
    fs.statSync.restore();
  });

  test ('If the passed argument is an empty directory, then empty string should be returned', function() {
    var EXPECTED_FILENAME = "";

    var stubExistsSync = sinon.stub(fs, "existsSync");
    stubExistsSync.withArgs("test_resources/empty_dir").returns(true);
    stubExistsSync.withArgs("./test_resources/empty_dir").returns(true);

    var stubStatSync = sinon.stub(fs, "statSync");
    stubStatSync.withArgs("test_resources/empty_dir").returns({
      isDirectory : function(){return true;}
    });
    stubStatSync.withArgs("./test_resources/empty_dir").returns({
      isDirectory : function(){return true;}
    });

    var stubReaddirSync = sinon.stub(fs, "readdirSync");
    stubReaddirSync.withArgs("test_resources/empty_dir").returns([]);
    stubReaddirSync.withArgs("./test_resources/empty_dir").returns([]);

    var checkInput = function (input) {
      var f = new fileLottery(input);
      assert.equal(EXPECTED_FILENAME, f.getNextFileName());
      assert.equal(EXPECTED_FILENAME, f.getNextFileName());
    }
    checkInput('test_resources/empty_dir');
    checkInput('./test_resources/empty_dir');

    fs.existsSync.restore();
    fs.statSync.restore();
    fs.readdirSync.restore();
  });

  test ('If the passed argument is a directory with one file, \
          then the file name should be returned on each call', function() {
    var EXPECTED_FILENAME = "onefile.txt";

    var stubExistsSync = sinon.stub(fs, "existsSync");
    stubExistsSync.withArgs("test_resources/dir_with_one_file").returns(true);
    stubExistsSync.withArgs("./test_resources/dir_with_one_file").returns(true);

    var stubStatSync = sinon.stub(fs, "statSync");
    stubStatSync.withArgs("test_resources/dir_with_one_file").returns({
      isDirectory : function(){return true;}
    });
    stubStatSync.withArgs("./test_resources/dir_with_one_file").returns({
      isDirectory : function(){return true;}
    });

    var stubReaddirSync = sinon.stub(fs, "readdirSync");
    stubReaddirSync.withArgs("test_resources/dir_with_one_file").returns([EXPECTED_FILENAME]);
    stubReaddirSync.withArgs("./test_resources/dir_with_one_file").returns([EXPECTED_FILENAME]);

    var checkInput = function (input) {
      var f = new fileLottery(input);
      assert.equal(EXPECTED_FILENAME, f.getNextFileName());
      assert.equal(EXPECTED_FILENAME, f.getNextFileName());
    }
    checkInput('test_resources/dir_with_one_file');
    checkInput('./test_resources/dir_with_one_file');

    fs.existsSync.restore();
    fs.statSync.restore();
    fs.readdirSync.restore();
  });

  test ('If the passed argument is a directory with more than one file, \
          then one of the file namee should be returned on each call', function() {
    var EXPECTED_FILENAME = [ "file1.txt", 
                              "file2.txt", 
                              "file3.txt", 
                              "file4.txt", 
                              "file5.txt", 
                              "file6.txt"];

    var stubExistsSync = sinon.stub(fs, "existsSync");
    stubExistsSync.withArgs("test_resources/dir_with_multiple_files").returns(true);
    stubExistsSync.withArgs("./test_resources/dir_with_multiple_files").returns(true);

    var stubStatSync = sinon.stub(fs, "statSync");
    stubStatSync.withArgs("test_resources/dir_with_multiple_files").returns({
      isDirectory : function(){return true;}
    });
    stubStatSync.withArgs("./test_resources/dir_with_multiple_files").returns({
      isDirectory : function(){return true;}
    });

    var stubReaddirSync = sinon.stub(fs, "readdirSync");
    stubReaddirSync.withArgs("test_resources/dir_with_multiple_files").returns(EXPECTED_FILENAME);
    stubReaddirSync.withArgs("./test_resources/dir_with_multiple_files").returns(EXPECTED_FILENAME);

    var stubRandom = sinon.stub(Math, "random",function(){
      var cntr = 0;
      return function() {
        cntr = cntr % EXPECTED_FILENAME.length;
        return cntr++ / EXPECTED_FILENAME.length;
      };
    }());

    var checkInput = function (input) {
      // If something is failing, the stubs won't be restored. How should I avoid this?
      var f = new fileLottery(input);
      for (var i = 0; i < EXPECTED_FILENAME.length + 3; i++ )
        assert.equal(EXPECTED_FILENAME[i % EXPECTED_FILENAME.length], f.getNextFileName());
    }
    checkInput('test_resources/dir_with_multiple_files');
    checkInput('./test_resources/dir_with_multiple_files');

    fs.existsSync.restore();
    fs.statSync.restore();
    fs.readdirSync.restore();
  });
});

suite('getFileType', function() {
  test ("If the passed path doesn't exists, an 'notExists' should be returned", function() {
    var EXPECTED_FILENAME = "notExists";
    var stub = sinon.stub(fs, "existsSync");
    stub.withArgs("test_resources/testdir").returns(false);
    var checkInput = function (input) {
      assert.equal(EXPECTED_FILENAME, getFileType(input));
    }
    checkInput('test_resources/testfile.txt');
    checkInput('./nonexistent.txt');
    checkInput('./dir/nonexistent');
    checkInput('/Users/dir/nonexistent');
    fs.existsSync.restore();
  });
  
  test ("If the passed path is a directory, 'dir' should be returned", function() {
    var EXPECTED_FILENAME = "dir";

    var stubExistsSync = sinon.stub(fs, "existsSync");
    stubExistsSync.withArgs("test_resources/testdir").returns(true);

    var stubStatSync = sinon.stub(fs, "statSync");
    stubStatSync.withArgs("test_resources/testdir").returns({
      isDirectory : function(){return true;}
    });

    var checkInput = function (input) {
      assert.equal(EXPECTED_FILENAME, getFileType(input));
    }
    checkInput('test_resources/testdir');

    fs.existsSync.restore();
    fs.statSync.restore();
  });

  test ("If the passed path is a file, 'file' should be returned", function() {
    var EXPECTED_FILENAME = "file";

    var stubExistsSync = sinon.stub(fs, "existsSync");
    stubExistsSync.withArgs("test_resources/testfile.txt").returns(true);

    var stubStatSync = sinon.stub(fs, "statSync");
    stubStatSync.withArgs("test_resources/testfile.txt").returns({
      isDirectory : function(){return false;}
    });

    var checkInput = function (input) {
      assert.equal(EXPECTED_FILENAME, getFileType(input));
    }
    checkInput('test_resources/testfile.txt');

    fs.existsSync.restore();
    fs.statSync.restore();
  });

});

