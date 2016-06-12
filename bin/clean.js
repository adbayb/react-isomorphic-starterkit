const del = require("del");

var folder;
if(process.argv[2])
	folder = process.argv[2];
else
	folder = "dist";

del([folder + "/**"]).then(paths => {
	if(paths.length > 0)
		console.log(folder + " folder successfully removed");
	else
		console.log("No need to remove " + folder + " folder");
});
