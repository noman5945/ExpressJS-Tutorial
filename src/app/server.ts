import { Server } from 'http';
import app from './app'
const port=5000;

let server:Server

//initialize server block/functions
async function bootStrap() {
    server=app.listen(port,()=>{
        console.log(`server running at ${port}`)
    })
}

bootStrap()