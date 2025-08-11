import { easeInOut } from 'popmotion';

export const skeletonVariants = {
	loading: {
		opacity: [0.6, 1, 0.6],
		transition: {
			duration: 1.5,
			repeat: Number.POSITIVE_INFINITY,
			ease: 'easeInOut',
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
