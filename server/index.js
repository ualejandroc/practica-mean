import http from 'http'
import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import {mongoUrl, port } from './config'


//para debug
const debug = new Debug('practica-mean:root') 


mongoose.Promise=global.Promise

async function start() {
//coneccion a mongoose
mongoose.connect(mongoUrl, {useMongoClient:true})

app.listen(port, ()=>{
    debug(`server running at port ${port}  `)
})

}

start()