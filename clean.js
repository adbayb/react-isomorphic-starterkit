const del = require('del');

var folder;
if(process.argv[2]) 
	folder = process.argv[2];
else 
	folder = 'public';
 
del([folder+'/**', '!'+folder, '!'+folder+'/index.html']).then(paths => {
	if(paths.length > 0) 
		console.log(folder+' folder successfully cleaned (index.html remains)');
	else 
		console.log('Error or '+folder+' folder not need to be cleaned');
});
