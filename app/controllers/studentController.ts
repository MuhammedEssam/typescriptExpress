//   /app/controllers/studentController.ts
import * as mongoose from 'mongoose';
import Student from '../models/student';
import { Request, Response, NextFunction } from 'express';

// const StudentMongooseModel = mongoose.model('Student', StudentSchema);

export class StudentController {

    public async addNewStudent(req: Request, res: Response, next: NextFunction) {
        try {
            let newStudent = await Student.create(req.body);
            res.send(newStudent)
        } catch (err) {
            next(err)
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

    public getStudentById(req: Request, res: Response) {
        Student.findById(req.params.studentId, (err, data) => {
            if (err) {
                res.send(err);
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
