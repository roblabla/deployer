var fs = require("fs");
var path = require("path");
var glob = require("glob");
var mkdirp = require("mkdirp");
var argv = process.argv.slice(2);
console.log(process.argv);
if (argv[0] === "MoveMeNow" || argv[0] === "IPWhitelist")
{
  glob("/tmp/" + argv[0] + "_" + argv[1] + "/" + "*.jar", function (err, files) {
    if (err)
      throw err;
    if (files.length === 1)
      simpleDeploy(argv[0], files[0], argv[2]);
    else
      throw new Error("ERMERGERD TOO MANY FILES : /tmp/" + argv[0] + "_" + argv[1] + "/" + "*.jar");
  });
}
else
  throw new Error("Unknown deployment");

function simpleDeploy(name, filename, buildnum)
{
  mkdirp(path.join("/srv", "http", "dl", name), function(err) {
    if (err)
      throw err;
    fs.rename(filename, path.join("/srv", "http", "dl", name, path.basename(filename, ".jar") + "-" + buildnum + ".jar"), function(err) {
      if (err)
        throw err;
      else
        console.log(path.join("/srv", "http", "dl", name, path.basename(filename, ".jar") + "-" + buildnum + ".jar"));
    });
  });
}
