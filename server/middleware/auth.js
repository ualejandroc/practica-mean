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
    jwt.verify(req.query.token, secret, (err,token)=>{
        if(err){
            debug('JWTF was not encrypted with our secret')
            return res.status(401).json({
                message: 'Unauthorized',
                error: err
            })
        }
        debug(`Token verified ${token}` );
        req.user = token.user
        next()
    })
}