var UndoManager = require('undo-manager'); // require the lib from node_modules
var singleton;

if (!singleton) {
    singleton = new UndoManager();
}

module.exports = singleton;