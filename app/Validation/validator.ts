import {body} from 'express-validator/check'
import HttpException from '../Execptions/HttpException';
export default class Validation{
    public addUser(){
        let userValidation = [
        body('FirstName').not().isEmpty().withMessage(()=>{
            return new HttpException(422,"NameRequired")
        })
    ]
    return userValidation
    }
}