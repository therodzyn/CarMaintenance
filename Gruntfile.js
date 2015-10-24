module.exports = function(grunt) {

	grunt.initConfig({

		sass: {

			dist: {
		      	options: {
		        	style: 'expanded'
		    	},

		      	files: {
		        	'public/css/app-styles.css': 'sass/app.scss'
		        	// 'public/css/index-styles.css': 'sass/index.scss'
		    	}
			}

		},

		handlebars: {

			dist: {

				options: {
					processName: function(filename) {
						return filename.replace(/.*\/(\w+)\.hbs/, '$1');
					},
				},
				files: {
					"public/js/templates.js": "templates/*.hbs"
				}

			}

		},

		watch: {

		 	dist: {
				files: ['sass/*.scss', "sass/**/*.scss"],
				tasks: ['sass']
				// files: ["templates/*.hbs"],
				// tasks: ['handlebars']
		 	}

		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask("default", ["watch"]);

};