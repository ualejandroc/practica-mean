import  express from "express"

//
import bodyParser from 'body-parser'

import {question, auth} from './routes'

//path para version de produccion
import path from 'path'


const app =  express()

//
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


if(process.env.NODE_ENV=='development'){

    app.user((req,res,next)=>{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers','Origin, X-Request-With, Content-Type, Accept ' )
        res.setHeader('Access-Control-Allow-Methods','POST, GET, PATCH, DELETE, OPTIONS ' )
        next()

    })
}

//Preguntamos si estamos en produccion
if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.join(process.cwd(),'dist')))      // esta linea devuelve la ruta del servidor process.cwd()
    
}


//ya no nedesitamos esta ruta de barra
//app.get('/',(req,res)=>res.send('hola desde express'))

//ahora necesitamos que este modulo de questions 
//nos defina como devolver algo
app.use('/api/questions', question)
app.use('/api/auth', auth)



export default app
