var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	karma = require('karma');

gulp.task('less', function () {
	var csssource = path.join(__dirname, '/resources/css/');

	return gulp.src(csssource + 'app.less')
    .pipe(less()).
    on('error', function(err) {
    	console.log(err.message);
    })
    .pipe(gulp.dest(csssource));
});

gulp.task('test-karma', function(done) {
	var server = karma.Server;
	new server({
		configFile: path.join(__dirname, 'karma.conf.js'),
		singleRun: true
	}, done).start();
});


gulp.task('default', ['less', 'test-karma']); 