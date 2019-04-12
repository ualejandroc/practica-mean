import  express from "express"
import { 
    required, 
     questionMiddeleware, 
} from "../middleware";



import {question} from '../db-api'

//utils
import {handleError} from '../utils'

import {User, Answer} from '../models'

const app = express.Router()

/********************** */

/* GET home page. */
app.get('/view', function(req, res, next) {
    res.render('question');
  });

app.post('/insert', async function(req, res, next) {
    var user= new User({_id: req.body.user})
    // var answer = new Answer({_id: req.body.answer})
    var answer = new Answer()
    var item = {
        title: req.body.title,
        description: req.body.description,
        icon: req.body.icon,
        password: req.body.password,
        createdAt: req.body.createdAt,
        user:user,
        answer: answer,
    };


   console.log(item)
    // var data = new User(item);
    // await data.save();
    const savedQuestion= question.create(item);
  
    res.redirect('/questions/view');
  });





app.get('/get', function(req, res, next) {
    question.findAll().find()
        .then(function(doc) {
          res.render('question', {items: doc});
        });
  });

  ////////////






//ahira queda asi
app.get('/', async (req, res)=>{
    try{
      const {sort} = req.query
      let questions = await question.findAll(sort)  
      res.status(200).json(questions)
    //   console.log(questions)
    }catch(err){
        handleError(err,res) 
    }
})

/***** */

//cuando el frontend reciba   api/questions/:id
app.get('/:id', async (req, res)=> {
    // const {id} = req.params
    // const q = question.find(question=> question._id == +id)
    //res.status(200).json(q)

    try{
        const q =  await question.findById(req.params.id)       
        res.status(200).json(q)        
    }catch(error){
        handleError(error,res)
    }

    
})


app.post("/",  /*required,  questionMiddeleware, */   async (req,res)=>{   
  
    
    const {title, description, icon} = req.body
    const q = {
        title, 
        description, 
        icon,
        user : req.user._id   
    }

    try{
        const savedQuestion = await question.create(q)
        response.status(201).json(savedQuestion)        
    }
    catch(error){
        handleError(error,res)
    }
    
})

///// ANswers //////

app.post('/:id/answer', /* required, questionMiddeleware ,*/  async (res,requ)=>{
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


/********************** */

/* GET home page. */
app.get('/ans/view', function(req, res, next) {
    res.render('answers');
  });

app.post('/ans/insert/', async function(req, res, next) {
    var user= new User({_id: req.body.user})
    // var answer = new Answer({_id: req.body.answer})
    var answer = new Answer()
    var item = {        
        description: req.body.description,        
        createdAt: req.body.createdAt,
        user:user,
    };

   console.log(item)
    const savedQuestion= await answer.save(item);
  
    res.redirect('/api/questions/ans/view');
  });





app.get('/ans/get', function(req, res, next) {
    var answer = new Answer()
    answer.findAll().find()
        .then(function(doc) {
          res.render('answers', {items: doc});
        });
  });

  ////////////





export default app