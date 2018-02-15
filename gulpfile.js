const gulp = require('gulp'),
      nodemon = require('gulp-nodemon');

gulp.task('default', ()=>{
  nodemon({
      script: 'server/main.js',
      ext: 'js',
      env: {
        PORT: 8000
      },
      ignore: ['./node_modules/**']
  })
  .on('restart', ()=>{
      console.log('Restarting');
  });
});
