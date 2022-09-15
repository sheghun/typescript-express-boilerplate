/**
 * Setup the jet-logger.
 *
 * Documentation: https://github.com/seanpmaxwell/jet-logger
 */

import {createLogger, format, transports} from 'winston';

interface IKeyMap {
	[key: string]: any;
}

const logger = createLogger({
	format: format.combine(format.timestamp(), format.json()),
	transports: [new transports.Console()],
});

export class Logger {
	constructor(private readonly _service: string) {}

	info(message: string, meta: IKeyMap = {}) {
		meta.service = this._service;
		logger.info(message, meta);
	}

	err(message: Error & {service?: string}) {
		message.service = this._service;
		logger.error(message);
	}
}

export default Logger;
