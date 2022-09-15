import './preStart'; // Must be the first import
import app from '@server';
import Logger from './services/Logger';

// Start the server
const logger = new Logger(__filename);
const port = Number(process.env.PORT || 6000);
app.listen(port, () => {
	logger.info(`Express server started on port: ${port}`);
});
