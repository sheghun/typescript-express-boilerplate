import dotenv from 'dotenv';
import commandLineArgs from 'command-line-args';

// Setup command line options
const options = commandLineArgs([
	{
		name: 'NODE_ENV',
		alias: 'e',
		defaultValue: 'development',
		type: String,
	},
]);

// Set the env file
const result2 = dotenv.config({
	path: `./env/${options.NODE_ENV as string}.env`,
});

if (result2.error) {
	throw result2.error;
}
