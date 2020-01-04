import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import slsExpressMiddleware from 'aws-serverless-express/middleware';

import controllerA from '../functions/endpoint_a';
import controllerB from '../functions/endpoint_b';

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

app.use(bodyParser.json({ limit: '6mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '6mb', extended: true }));
/**
 * ROUTES
 */
Router.get('/endpoint-a', controllerA);
Router.get('/endpoint-b', controllerB);

/**
 * Apply Router
 */
app.use('/', Router);

/**
 * Creates our express-like handler for proxy-plus
 */
export default app;
