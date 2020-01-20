//   /app/controllers/studentController.ts
import * as mongoose from 'mongoose';
import Student from '../models/student';
import { Request, Response, NextFunction } from 'express';
import HttpException from '../Execptions/HttpException';
import { matchedData } from 'express-validator/filter'
import { validationResult } from 'express-validator/check'

export class StudentController {

    public async addNewStudent(req: Request, res: Response, next: NextFunction) {
        try {
             let validationErrors = validationResult(req).array({
                onlyFirstError: true
            });
            if (validationErrors.length > 0) {
                //deleteTempImages(req);
                throw new HttpException(422, validationErrors)
            }
            let data = matchedData(req)
            let newStudent = await Student.create(data);
            res.send(newStudent)
        } catch (err) {
            next(err);
        }

    }

    public getStudents(req: Request, res: Response) {
        Student.find({}, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json(data);
        });
    }

    public getStudentById(req: Request, res: Response, next: NextFunction) {
        if (!req.params.studentId) return next(new HttpException(422, 'Post not found'));
        Student.findById(req.params.studentId, (err, data) => {
            if (err) {
                next(new HttpException(404, 'Post not found'));
            }
            res.json(data);
        });
    }

    public updateStudent(req: Request, res: Response) {
        Student.findOneAndUpdate({ _id: req.params.studentId }, req.body, { new: true },
            (err, data) => {
                if (err) {
                    res.send(err);
                }
                res.json(data);
            });
    }

    public deleteStudent(req: Request, res: Response) {
        Student.findOneAndRemove({ _id: req.params.studentId }, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted student!' });
        });
    }
}
