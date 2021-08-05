import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { graphqlHTTP } from 'express-graphql';
import Schema from './schema/schema';

// Declare the express app
const app = express();

// Declare port
const port = process.env.PORT || 4000;

// Declare middleware for logging requests
const middleware = (req: { method: string, url: {} }, res: any, next: () => void) => {
    console.log(req.method, req.url, Date.now());
    next();
}

// Set cross origin access
app.use((req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'POST');
    
    next();
});

app.use(middleware);

// Set graphQL route
app.use(
    "/graphql", (req: any, res: any) => {
        graphqlHTTP({
            schema: Schema,
            pretty: true,
            graphiql: {
                headerEditorEnabled: true
            },
            customFormatErrorFn: (err: any) => {
                console.log('err:', err.message);
                return err.message;
            }
        })(req, res)
    });
    
// Set home/default route
app.get('/', (req: any, res: any) =>
        res.status(StatusCodes.OK).send({
        message: 'Nuri makes life much better!',
    })
);

// Declare server port listen logic
app.listen(port, () => console.log(`Server listening @ port: ${port}`));