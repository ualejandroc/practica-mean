import Debug from 'debug'
import {secret} from '../config'
import jwt from 'jsonwebtoken'


const debug = new Debug('practica-mean:auth-middleware')


// export const users={
//     firstName: 'Sasha',
//         lastName: 'Lifszyc',
//         email: 'sacha@gmail.com',
//         password:'12345',
//         _id:123
// }

// export const findUserByEmail=e => users.find((user)=>user.email ==e)

export const required = (req, res, next)=>{
    //console.log('Tiene datos de token:'+  req.query.token)
    jwt.verify(req.query.token,/* secret  */ 'miclave', (err,token)=>{
        if(err){
            console.log('JWTF was not encrypted with our secret')
            return res.status(401).json({
                message: 'Unauthorized',
                error: err
            })
        }
        console.log(`Token verified ${JSON.stringify(  token)}` );
        req.user = token//{"email":"mail1@mail.com","fullName":"New","_id":"5ca9ae8cff0e7902342222da","iat":1555293451,"exp":1555379851}
        next()
    })
}