import mongoose, {Schema} from 'mongoose'

mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb+srv://ualejandroc:<12345>@cluster0-w4pp5.mongodb.net/test?retryWrites=true", { useNewUrlParser: true } );


const QuestionSchema = Schema({
    title:{type:String, required: Boolean},
    description:{type:String, required: Boolean},
    icon:{type:String, required: Boolean},
    createdAt:{type: Date, default: Date.now, required:Boolean},
    user: {type:Schema.Types.ObjectId, ref: 'User', required: false}, //esto indica a mongoose que busque in id en la base
                                                    // y elemento ref:  es el objeto dentro de la base
                                                    // en este caso el nombre que le dimos al modelo User
    answer:[{type: Schema.Types.ObjectId,ref:'Answer', default: []}]    // como answer es Array se necesita los corchetes []
                                                })

const Question = mongoose.model('Question', QuestionSchema)

export default Question
