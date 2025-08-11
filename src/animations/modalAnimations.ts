import { easeInOut } from 'popmotion';

export const overlayVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
	exit: { opacity: 0 },
};

export const modalVariants = {
	hidden: { opacity: 0, scale: 0.9, y: -20 },
	visible: { opacity: 1, scale: 1, y: 0 },
	exit: { opacity: 0, scale: 0.9, y: -20 },
};

export const modalTransition = {
	duration: 0.3,
	ease: easeInOut,
};
