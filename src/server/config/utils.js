"use strict";
exports.__esModule = true;
var chalk = require("chalk");
/**
 * Attempts to retrieve the value of the attribute indicated by `varName`, and
 * raises an error if it is not defined on the object. (Like #fetch in Ruby.)
 */
exports.demand = function (object, varName) {
    var val = object[varName];
    if (!val) {
        throw Error("Demand Unfufilled: Environment variable \"" + varName + "\" is not defined.");
    }
    return val;
};
exports.getValueSource = function (dotEnv, processEnv) {
    if (dotEnv.error) {
        console.warn(chalk.yellow("No config file was found at " + dotEnv.error.path + ". " +
            "Loading variables directly from environment..."));
        return processEnv;
    }
    console.info(chalk.green('Environment variables loaded from .env:'));
    console.info(chalk.grey(JSON.stringify(dotEnv, null, 2)));
    return dotEnv.parsed;
};
