import {Router} from 'express';

// Init router and path
const router = Router();

router.get('/', (req, res) => {
	res.json({
		message: 'Welcome to our api',
		data: [],
	});
});

// Export the base-router
export default router;
