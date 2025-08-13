import { easeInOut } from 'framer-motion';
import { linear } from 'popmotion';

export const skeletonVariants = {
	loading: {
		opacity: [0, 1, 0.5, 1],
		transition: {
			duration: 1,
			repeat: Number.POSITIVE_INFINITY,
			ease: linear,
		},
	},
	loaded: {
		opacity: 1,
	},
};

export const selectTransitionVariants = {
	initial: { opacity: 0, x: -10 },
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.3,
			ease: easeInOut,
		},
	},
	exit: {
		opacity: 0,
		x: 10,
		transition: {
			duration: 0.3,
			ease: easeInOut,
		},
	},
};
