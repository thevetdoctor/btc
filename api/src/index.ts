import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { graphqlHTTP } from 'express-graphql';
import Schema from './schema/schema';
import { data } from './schema/data';
import { details } from './schema/details';
import path from 'path';
import randomId from 'oba-random-id';

console.log(randomId(10, 'numeric'));
console.log(Math.sin(90 * (Math.PI / 180)));
const str = `Smile ${String.fromCodePoint(0x1F600)}, you are on TV`;
console.log(str);
console.log('xxx'.replace(/(?:)/g, '_'));

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

app.use(express.static(path.join(__dirname, '../../ui/build')));

// Set home/default route
app.get('/home', (req: any, res: any) =>
        res.status(StatusCodes.OK).send({
        message: 'Nuri makes life much better!',
        blocksCount: data.length,
        sampleDetail: Object.keys(details)
    })
);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../ui/build', 'index.html'));
});

// Declare server port listen logic
app.listen(port, () => console.log(`Server listening @ port: ${port}`));
