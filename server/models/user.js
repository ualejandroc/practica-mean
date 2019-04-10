import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

import {mongoUrl} from  '../config'
var mongoUrls=  new String( mongoUrl).toString()

mongoose.connect("mongodb+srv://ualejandroc:12345@cluster0-w4pp5.mongodb.net/test?retryWrites=true", { useNewUrlParser: true } );
// mongoose.connect(mongoUrl , { useNewUrlParser: true } );



mongoose.set('useCreateIndex', true);

const UserSchema = Schema({
    firstName:{type:String, required: Boolean},
    lastName:{type:String, required: Boolean},
    email:{type:String, required: Boolean, unique: true, index: true},
    password:{type:String, required: Boolean},
    createdAt:{type: Date, default: Date.now, required:Boolean}
})

UserSchema.plugin(uniqueValidator)

export default  mongoose.model('User', UserSchema)
