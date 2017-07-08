const config = require('./functional/config')

module.exports = {
  src_folders: 'test/functional',
  output_folder: 'test/functional/reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',
  globals_path: '',

  selenium: {
    start_process: false,
    server_path: '',
    log_path: '',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': '',
      'webdriver.gecko.driver': '',
      'webdriver.edge.driver': '',
    },
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false, // !config.ci,
        path: 'test/functional/screenshots',
      },
      desiredCapabilities: {
        browserName: 'chrome',
        marionette: true,
      },
    },
  },
}
