import mongoose, {Schema} from 'mongoose'

const QuestionSchema = Schema({
    type:{type:String, required: boolean},
    description:{type:String, required: boolean},
    icon:{type:String, required: boolean},
    createdAt:{type: Date, default: Date.now, required:boolean},
    user: {type:Schema.Types.ObjectId, ref: 'User', required: true}, //esto indica a mongoose que busque in id en la base
                                                    // y elemento ref:  es el objeto dentro de la base
                                                    // en este caso el nombre que le dimos al modelo User
    answer:[{type: Schema.Types.ObjectId,ref:'Answer', default: []}]    // como answer es Array se necesita los corchetes []
                                                })

const Question = mongoose.model('Question', QuestionSchema)

export default Question