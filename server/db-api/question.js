import Debug from 'debug'
import {Question, Answer} from '../models'

const debug = new Debug('practica-mean:db-api:questions') 

export default {
    findAll: (sort = '-createdAt' ) => {
        debug('Finding all questions')
        return  Question.find().populate('answers').sort(sort)
    },

    findById: async (id)=>{
        debug(`Finding question with id: ${id}`)
        var qu= await  Question
                    .findOne({id})
                    .populate('user')  //este es el campo dentro del modelo question
                    .populate({
                        path: 'answer',
                        options:{sort: '-createdAt'},
                        populate:{
                            path:'user',
                            model: 'User'
                        }
                    }).exec()
        console.log(qu)
        return qu

    },

    create: (q)=>{
        console.log(`creating question ${q}`)
        const question = new Question(q)
        return question.save()
    },

    createAnswer : async (q,a) =>{
        const answer = new Answer(a)
        const savedAnswer = answer.save()
        q.answers.push(savedAnswer)
        await q.save()
        return savedAnswer
    }

}