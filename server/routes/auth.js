import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import {secret} from  '../config'
// import {findUserByEmail, users} from '../middleware'

import {User } from '../models'

import {
    hashSync as hash,
    compareSync as comparePassword
} from 'bcryptjs'


const app = express.Router()
const debug = new Debug('practica-mean:auth')


// const comparePassword=(providerPassword, userPassword)=>{
//     return providerPassword==userPassword
// }


/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('index');
  });

app.post('/insert', async function(req, res, next) {
    var item = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        createdAt: req.body.createdAt,
    };
   console.log(item)
    var data = new User(item);
    await data.save();
  
    res.redirect('/api/auth/');
  });





app.get('/get', function(req, res, next) {
    User.find()
        .then(function(doc) {
          res.render('index', {items: doc});
        });
  });

  ////////////


app.post('/signin',async (req,res,next)=>{
    const {email, password} = req.body
    // const user = findUserByEmail(email)

    const user = await User.findOne({email})   //va a encoentrar el usuario con ese email


    if(!user){
        debug(`User with email ${email} not found`)
        return handleLoginFailed(res);
    }

    if (!comparePassword(password, user.password)){
        debug(`Password do not match`);
        return handleLoginFailed(res, 'El correo y la contrasena no coinciden');
    }

    const token = createToken(user)

   
    res.status(200).json({
        messege: 'Login Succeded',
        token,
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
})

    // la ruta esta montada sobre /api/auth/
    // lo que resultaria en /api/auth/signup
app.post('/signup', async (req,res)=>{
        const{ firstName, lastName, email, password } =req.body
   

        const u = new User({
            firstName,
            lastName: lastName,
            email,
            password: hash(password, 10)
        })

        debug( `Crating new user: ${u }` )
        // 
        const user = await u.save()

        const token = createToken(user)

        res.status(201).json({
            message: 'User saved',
            token,
            userId:user._id,
            firstName,
            lastName,
            email
        })

    } )

    function handleLoginFailed(res, message){
        return res.status(401).json({
            message: 'Login failed',
            error: message||'Email and password do not match '
        })

    }

    const createToken=(user) =>  
     jwt.sign({user}, secret, {expiresIn:86400})




export default app