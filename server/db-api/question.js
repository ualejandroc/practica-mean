import Debug from 'debug'
import {Question, Answer} from '../models'

const debug = new Debug('practica-mean:db-api:questions') 

export default {

    fetchOne:(obj)=>{
        return Question.findOne(obj)
    },

    findAll: (sort = '-createdAt' ) => {
        debug('Finding all questions')
        return  Question.find().populate('answers').sort(sort)
    },

    findById: async (id)=>{
        debug(`Finding question with id: ${id}`)
        var qObj= new Question()
        var qu= await  Question
                    .findById( id  )                    
                    .populate('user')  //este es el campo dentro del modelo question
                    .populate({
                        path: 'answer',
                        options:{sort: '-createdAt'},
                        populate:{
                            path:'user',
                            model: 'User'
                        }
                    })//.cast(Question, qObj)
                    .exec()
        
        console.log(qu)          
        
        return qu

    },

    create: (q)=>{
        console.log(`creating question ${q}`)
        const question = new Question(q)
        return question.save()
    },

    createAnswer : async (q,a) =>{
        var question= new Question(q)
        const answer = new Answer(a)
        const savedAnswer = await answer.save()    

        question = await Question
                    .findByIdAndUpdate(q._id, 
                        { $addToSet: {answer: savedAnswer }},  //
                        {upsert: true, new: true, runValidators: true},
                        function(err, res) {
                            if (err) {
                            console.log("err:"+ err);
                            }
                            
                          });

        //console.log("Objeto question base:"+ JSON.stringify( question.answer) )
        question= question.answer.push(savedAnswer)

        await question.save()
        return savedAnswer
    }

}