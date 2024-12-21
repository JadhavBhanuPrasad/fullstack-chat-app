import User from '../models/UserModel.js'
import { sign } from 'jsonwebtoken'

const maxAge = 3*24*60*60*1000

const createToken = (email,userId) => {
 return sign( {email,userId} , process.env.JWT_TOKEN, {expiresIn : maxAge} )
}

export const signup = async (req,res,next)=>{
try{
    const {email,password} = req.body;
    if(!email || !password) {
        return res.status(400).send("Email and Password is required")
    }
    const user = User.create( {email,password})
    response.cookie("jwt",createToken(email,password),{
        maxAge,
        secure:true,
        sameSite : "None"
    })
    return res.status(201).json( {
        user : {
            id : user.id,
            email : user.email,
            profileSetup : user.profileSetup
        }
    })
}
catch(err){

}
}