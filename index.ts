import { App } from "./src";
import 'dotenv/config';

export default new App(process.env.PORT as unknown as number);