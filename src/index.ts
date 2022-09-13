import * as exphbs from 'express-handlebars';
import express from 'express';
import path from 'path';

import * as Middlewares from './Middlewares';
import * as Helpers from './Helpers';
import * as Routes from './Routes';

export class App {
    public app: express.Application;
    public port: number;

    constructor(port: number) {
        this.app = express();
        this.port = port;

        this.init();
    }

    public init() {
        this.app.engine('.hbs', exphbs.create({
            extname: '.hbs',
            layoutsDir: path.join(__dirname, './Views/Layouts'),
            partialsDir: path.join(__dirname, './Views/Partials'),
            helpers: Object.keys(Helpers).reduce((acc, key) => {
                acc[key] = Helpers[key];
                return acc;
            }, {})
        }).engine);

        this.app.use(
            Object.keys(Routes).reduce((acc, key) => {
                acc.use(Routes[key]);
                return acc;
            }, express.Router())
        )

        this.app.use(
            Object.keys(Middlewares).reduce((acc, key) => {
                acc.use(Middlewares[key]);
                return acc;
            }, express.Router())
        );

        this.app.set('view engine', '.hbs');
        this.app.set('views', path.join(__dirname, './Views'));
        this.app.use(express.static(path.join(__dirname, './Public')));

        this.listen();
        return this;
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });

        return this;
    }
}