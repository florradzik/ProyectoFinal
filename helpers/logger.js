const log4js = require("log4js")

log4js.configure({
  appenders: {
    loggerInfo: { type: "console" },
    loggerError: { type: "file", filename: "./logs/error.log" },
    loggerWarning: { type: "file", filename: "./logs/warn.log" },
  },
  categories: {
    default: { appenders: ["loggerInfo"], level: "trace" },
    consola: { appenders: ["loggerInfo"], level: "info" },
    errorArchivo: { appenders: ["loggerError", "loggerInfo"], level: "error" },
    warningArchivo: {
      appenders: ["loggerWarning", "loggerInfo"],
      level: "warn",
    },
  },
})

const logger = log4js.getLogger()
const loggErrorFile = log4js.getLogger("errorArchivo")
const loggWarningFile = log4js.getLogger("warningArchivo")

module.exports = { logger, loggErrorFile, loggWarningFile }
