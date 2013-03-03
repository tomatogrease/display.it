exports.config =
  # See http://brunch.readthedocs.org/en/latest/config.html for documentation.
  files:
    javascripts:
      joinTo:
        'javascripts/app.js': /^app/
        'javascripts/vendor.js': /^vendor/
        'test/javascripts/test.js': /^test(\/|\\)(?!vendor)/
        'test/javascripts/test-vendor.js': /^test(\/|\\)(?=vendor)/
      order:
        # Make sure to load jquery fist.
        # TODO: Customize bootstrap js/less. Will need to edit app/less/bootstrap.less.
        before: [
          'vendor/jquery.js',
          'vendor/bootstrap/js/bootstrap-transition.js',
          'vendor/bootstrap/js/bootstrap-alert.js',
          'vendor/bootstrap/js/bootstrap-button.js',
          'vendor/bootstrap/js/bootstrap-carousel.js',
          'vendor/bootstrap/js/bootstrap-collapse.js',
          'vendor/bootstrap/js/bootstrap-dropdown.js',
          'vendor/bootstrap/js/bootstrap-modal.js',
          'vendor/bootstrap/js/bootstrap-tooltip.js',
          'vendor/bootstrap/js/bootstrap-popover.js',
          'vendor/bootstrap/js/bootstrap-scrollspy.js',
          'vendor/bootstrap/js/bootstrap-tab.js',
          'vendor/bootstrap/js/bootstrap-typeahead.js',
          'vendor/bootstrap/js/bootstrap-affix.js'
        ]

    stylesheets:
      joinTo:
        'stylesheets/app.css': /^(app|vendor)/
        'test/stylesheets/test.css': /^test/
      order:
        before: ['vendor/bootstrap/less/bootstrap.less']
        after: []

    templates:
      joinTo: 'javascripts/app.js'

  conventions:
      ignored:
        # exclude less, documentation, and tests folder from auto build process
        /^vendor(\/|\\)bootstrap(\/|\\)(?=less|docs|(?=js(\/|\\)tests))/