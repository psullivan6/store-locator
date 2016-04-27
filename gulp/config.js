var sourceDirectory   = '_source';
var compiledDirectory = 'release';

module.exports = {
  paths: {
    source: sourceDirectory,
    release: compiledDirectory,
    css: {
      source:  sourceDirectory   + '/css/styles.scss',
      watch:   sourceDirectory   + '/css/**/*.scss',
      release: compiledDirectory + '/css',
      testing: sourceDirectory   + '/css'
    },
    html: {
      source:  [
        sourceDirectory  + '/*.pug',
        '!' + sourceDirectory + '/_layout.pug'
      ],
      watch:   sourceDirectory  + '/**/*.pug',
      release: compiledDirectory,
      testing: sourceDirectory
    },
    js: {
      source:  sourceDirectory   + '/js/scripts.js',
      watch:   sourceDirectory   + '/js/**/*.js',
      release: compiledDirectory + '/js'
    },
    json: {
      source:  sourceDirectory   + '/data/**/*.json',
      watch:   sourceDirectory   + '/data/**/*.json',
      release: compiledDirectory + '/data'
    },
    move: [
      {
        source:  sourceDirectory   + '/images/**',
        release: compiledDirectory + '/images'
      },
      {
        source:  sourceDirectory   + '/fonts/**',
        release: compiledDirectory + '/fonts'
      },
      {
        source:  sourceDirectory   + '/libs/**',
        release: compiledDirectory + '/libs'
      }
    ],
    clean: [
      compiledDirectory,
      sourceDirectory + '/css/*.css',
      sourceDirectory + '/*.html'
    ],
    superclean: [
      compiledDirectory,
      sourceDirectory + '/css/*.css',
      sourceDirectory + '/*.html',
      sourceDirectory + '/libs',
      './node_modules'
    ]
  },
  names: {
    css: 'styles.css',
    js:  'scripts.js'
  }
};