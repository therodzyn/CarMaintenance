module.exports = function(grunt) {

	grunt.initConfig({

		sass: {

			dist: {

		      	options: {

		        	style: 'expanded'

		    	},

		      	files: {

		        	'public/css/styles.css': 'sass/main.scss'

		    	}

			}

		},

		 watch: {

		 	dist: {

		 		files: ['sass/*.scss', "sass/**/*.scss"],
		    	tasks: ['sass']

		 	}

		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", ["watch"]);

};