'use strict';

var _chalk = _interopRequireDefault(require("chalk"));

var _figlet = _interopRequireDefault(require("figlet"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _enigma = _interopRequireDefault(require("./enigma.js"));

var _questions = _interopRequireDefault(require("./questions.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-polyfill');

const askSettings = async () => {
  const settings = await _inquirer.default.prompt(_questions.default);
  return settings;
};

const encrypt = settings => {
  var enigma = new _enigma.default([{
    definition: settings.rotor1_definition,
    position: settings.rotor1_position
  }, {
    definition: settings.rotor2_definition,
    position: settings.rotor2_position
  }, {
    definition: settings.rotor3_definition,
    position: settings.rotor3_position
  }], settings.entrywheel_definition, settings.plugboard_definition, settings.reflector_definition);
  enigma.encrypt(settings.text);
};

const init = async () => {
  const enigma = _chalk.default.redBright(_figlet.default.textSync('ENIGMA', {
    font: 'Cybermedium'
  }));

  const settings = await askSettings();
  encrypt(settings);
};

init();