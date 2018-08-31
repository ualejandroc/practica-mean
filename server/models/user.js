import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = Schema({
    firstName:{type:String, required: boolean},
    lastName:{type:String, required: boolean},
    email:{type:String, required: boolean, unique: true, index: true},
    password:{type:String, required: boolean},
    createdAt:{type: Date, default: Date.now, required:boolean}
})

UserSchema.plugin(uniqueValidator)

export default  mongoose.model('User', UserSchema)
