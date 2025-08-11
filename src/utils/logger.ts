// src/utils/logger.ts

type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'debug';

const levels: Record<LogLevel, number> = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const colors: Record<LogLevel, string> = {
	error: 'color: red; font-weight: bold',
	warn: 'color: orange',
	info: 'color: green',
	http: 'color: magenta',
	debug: 'color: gray',
};

const isDevelopment =
	import.meta.env.MODE === 'development' ||
	process.env.NODE_ENV === 'development';

let currentLevel: LogLevel = isDevelopment ? 'debug' : 'warn';

function shouldLog(level: LogLevel) {
	return levels[level] <= levels[currentLevel];
}

function formatMessage(level: LogLevel, message: unknown[]) {
	const prefix = `[${level.toUpperCase()}]`;
	if (typeof window === 'undefined') {
		// Node.js (terminal) — usa cores ANSI
		const ansiColors: Record<LogLevel, string> = {
			error: '\x1b[31m', // vermelho
			warn: '\x1b[33m', // amarelo
			info: '\x1b[32m', // verde
			http: '\x1b[35m', // magenta
			debug: '\x1b[90m', // cinza
		};
		const reset = '\x1b[0m';
		return [ansiColors[level], prefix, ...message, reset];
	}
	// Browser — usa CSS para cor
	return [`%c${prefix}`, colors[level], ...message];
}

export const logger = {
	error: (...msg: unknown[]) => {
		if (shouldLog('error')) {
			console.error(...formatMessage('error', msg));
		}
	},
	warn: (...msg: unknown[]) => {
		if (shouldLog('warn')) {
			console.warn(...formatMessage('warn', msg));
		}
	},
	info: (...msg: unknown[]) => {
		if (shouldLog('info')) {
			console.info(...formatMessage('info', msg));
		}
	},
	http: (...msg: unknown[]) => {
		if (shouldLog('http')) {
			console.log(...formatMessage('http', msg));
		}
	},
	debug: (...msg: unknown[]) => {
		if (shouldLog('debug')) {
			console.debug(...formatMessage('debug', msg));
		}
	},
	setLevel: (level: LogLevel) => {
		if (level in levels) currentLevel = level;
	},
};
