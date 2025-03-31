import { DateUtils } from './DateUtils';

export class Logger {
  // Private constructor to prevent instantiation
  private constructor() {}
  private static LogType = {
    INFO: 'INFO',
    DEBUG: 'DEBUG',
    WARN: 'WARN',
    ERROR: 'ERROR',
  };
  private static Colors = {
    INFO: '\u001b[32m',
    DEBUG: '\u001b[34m',
    WARN: '\u001b[33M',
    ERROR: '\u001b[31m',
    RESET: '\u001b[0m',
  };

  /**
   * Log an info message
   * @param msg log message
   */
  static Info(msg: string, append: string = '') {
    this.Log(this.LogType.INFO, msg + append);
  }

  /**
   * Log a debug message
   * @param msg log message
   */
  static Debug(msg: string, append: string = '') {
    this.Log(this.LogType.DEBUG, msg + append);
  }

  /**
   * Log a error message
   * @parnam msg log message
   */
  static Error(msg: string, append: string = '') {
    this.Log(this.LogType.ERROR, msg + append);
  }

  /**
   * Log a warn message
   * @param msg log message
   */
  static Warn(msg: string, append: string = '') {
    this.Log(this.LogType.WARN, msg + append);
  }

  private static Log(type: string, msg: string) {
    const timestamp = DateUtils.getTimestamp();
    switch (type) {
      case this.LogType.WARN:
        console.log(
          `[${timestamp}] ${this.Colors.WARN}[WARN]${this.Colors.RESET} ${msg}`
        );
        break;
      case this.LogType.INFO:
        console.log(
          `[${timestamp}] ${this.Colors.INFO}[INFO]${this.Colors.RESET} ${msg}`
        );
        break;
      case this.LogType.DEBUG:
        console.log(
          `[${timestamp}] ${this.Colors.DEBUG}[DEBUG]${this.Colors.RESET} ${msg}`
        );
        break;
      case this.LogType.ERROR:
        console.log(
          `[${timestamp}] ${this.Colors.ERROR}[ERROR]${this.Colors.RESET} ${msg}`
        );
        break;
      default:
        console.log(
          `[${timestamp}] ${this.Colors.DEBUG}[DEBUG]${this.Colors.RESET} ${msg}`
        );
        break;
    }
  }
}
