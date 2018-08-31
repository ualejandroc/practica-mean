import  express from "express"
import { 
    required, 
     questionMiddeleware, 
    // questionsMiddeleware    // esto ya no va porque se va a usar la base de datos
} from "../middleware";

import {question} from '../db-api'

//utils
import {handleError} from '../utils'

import {User} from '../models'

const app = express.Router()

// const currentUser={
//     firstName: 'Sasha',
//         lastName: 'Lifszyc',
//         email: 'sacha@gmail.com',
//         password:'12345'
// }




// function userMiddleware(req, res, next){
//     req.user=currentUser
//     next()
// }


/************ */
//cuando el frontend reciba   api/questions
// app.get('/', 
// questionsMiddeleware ,
// (req, res)=> res.status(200).json(req.questions))
//lo anterir ya no se usa por la base de datos

//ahira queda asi
app.get('/', async (req, res)=>{
    try{
      const {sort} = req.query
      await question.findAll(sort)  
      res.status(200).json(question)
    }catch(err){
        handleError(err,res) 
    }
})

/***** */

//cuando el frontend reciba   api/questions/:id
app.get('/:id', (req, res)=> {
    // const {id} = req.params
    // const q = question.find(question=> question._id == +id)
    //res.status(200).json(q)

    try{
        const q = await question.findById(req.params.id)
        res.status(200).json(q)        
    }catch(error){
        handleError(error,res)
    }

    
})


app.post("/", required, questionsMiddeleware,async (req,res)=>{   //antes usabamos userMiddleware en lugar de required
    // const question = req.body
    // question._id=+ new Date()  // por el mas adelante devuelve segundos desde 1970
    // question.user= req.user     // esto proviene del middleware
    // question.createdAt= new Date()
    // question.answers = []

    // req.questions.push(question)

    const {title, description, icon} = req.body
    const q = {
        title, 
        description, 
        icon,
        user : req.user._id   //mongoose llena el objeto automaticamente
    }

    try{
        const savedQuestion = await question.create(q)
        response.status(201).json(savedQuestion)        
    }
    catch(error){
        handleError(error,res)
    }
    
})


app.post('/:id/answer', required, questionMiddeleware, async (res,requ)=>{
    const answer = req.body
    const q = req.question   // ya tenemos este question por el questionMiddeleware
    answer.createdAt= new Date()
    answer.user= new User(    // este user se llena por el userMiddleware
                    req.user
    )
    // q.answers.push(answer)
    try{
        const savedAnswer = await question.createAnswer(q, answer)
        response.status(201).json(savedAnswer)        
    }
    catch(error){
        handleError(error,res)
    }


    res.status(201).json()

})

export default app