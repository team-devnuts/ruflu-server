// const appRoot = require('app-root-path');
// const process = require('process');
const winston = require("winston");

const { combine, timestamp, label, printf } = winston.format;

// eslint-disable-next-line
const myFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${label}] ${level}: ${message}`
);

const options = {
  file: {
    // 로그 파일 저장시... 작성
  },
  console: {
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(
      winston.format.colorize({ all: true }),
      label({ label: "express_server" }),
      timestamp(),
      myFormat
    ),
  },
  levels: {
    // 숫자가 낮을 수록 우선순위가 높습니다.
    error: 0,
    debug: 1,
    warn: 2,
    info: 3,
    data: 4,
    verbose: 5,
    silly: 6,
    custom: 7,
  },
  colors: {
    // 각각의 레벨에 대한 색상을 지정해줍니다.
    error: "red",
    debug: "blue",
    warn: "yellow",
    info: "green",
    data: "magenta",
    verbose: "cyan",
    silly: "grey",
    custom: "yellow",
  },
};
winston.addColors(options.colors);

// eslint-disable-next-line
const logger = new winston.createLogger({
  levels: options.levels,
  level: "custom",
  transports: [new winston.transports.Console(options.console)],
  exitOnError: true, // do not exit on handled exceptions
});

/*
logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};
*/

module.exports = logger;
