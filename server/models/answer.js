import mongoose, {Schema} from 'mongoose'

const {ObjectId} = Schema.Types

mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb+srv://ualejandroc:12345@cluster0-w4pp5.mongodb.net/test?retryWrites=true", { useNewUrlParser: true } );


const AnswerSchema = Schema({ 
    description:{type:String, required: Boolean},
    createdAt:{type: Date, default: Date.now, required:Boolean},
    user: {type:ObjectId, ref:'User', required:true}
})

const Answer = mongoose.model('Answer', AnswerSchema)

export default Answer