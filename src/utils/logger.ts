import { consola } from 'consola';

export const logger = consola.create({
	level: import.meta.env.DEV ? 4 : 2,
});

export const { debug, info, warn, error, success } = logger;
