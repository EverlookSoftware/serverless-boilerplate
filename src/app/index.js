import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import slsExpressMiddleware from 'aws-serverless-express/middleware';

const Router = express.Router();

/**
 * Define our 'express-like' app
 */
const app = express();

/**
 * Middleware
 */
app.use(cors());
app.use(bodyParser.json());
app.use(slsExpressMiddleware.eventContext());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * ROUTES
 */
// Router.post('/users', addSingleUser);

/**
 * Apply Router
 */
app.use('/', Router);

/**
 * Creates our express-like handler for proxy-plus
 */
export default app;
