import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import slsExpressMiddleware from 'aws-serverless-express/middleware';

import getSomething from '../functions/get-something';
import createUser from '../functions/user';

const Router = express.Router();

/**
 * Define our 'express-like' app
 */
const app = express();

/**
 * Middleware
 */
app.use(cors());
app.use(slsExpressMiddleware.eventContext());

/**
 * Allows binary file uploads to your lambdas. 6mb max payload.
 */
app.use(bodyParser.json({ limit: '6mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '6mb', extended: true }));

/**
 * Route definitions.
 */
Router.get('/foo', getSomething);
Router.post('/users', createUser);

/**
 * Apply Router.
 */
app.use('/', Router);

/**
 * Creates our express-like handler for proxy-plus
 */
export default app;
