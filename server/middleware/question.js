import {question} from '../db-api'
import {handleError} from '../utils'




const questionOld= {
    _id:'1',
    title: 'Como reutilizo un componente ?',
    description: 'Miren esta pregunta..',
    createdAt:new Date(),
    icon: 'devicon-android-plain',
    answers: [],
    user:{
        firstName: 'Sasha',
        lastName: 'Lifszyc',
        email: 'sacha@gmail.com',
        password:'12345'
    }
}

export const questions = new Array(10).fill(question)


export const questionsMiddeleware=(req, res, next)=>{
    req.questions = questions
    next()
}


// export const  questionMiddeleware=(req, res, next)=>{
//     const {id} = req.params
//     req.question = question.find(question=> question._id == +id)
//     next()
// }
export const  questionMiddeleware= async (req, res, next)=>{
    console.log("From QuestionMiddleware:"+req.body.title)
    try{req.question = await question.fetchOne({title: req.body.title})
    next()}
    catch(error){
        handleError(error, res)
    }
}