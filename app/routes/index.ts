// /app/routes/index.ts
import {Request, Response} from "express";
import {StudentController} from '../controllers/studentController';
import Validator from '../Validation/validator'
export class Routes { 

    studentController: StudentController = new StudentController();
    userVaildator : Validator = new Validator()
    public routes(app: any): void { 
        app.route('/')
            .get((req: Request, res: Response) => {            
                res.status(200).send('Hello World!');
        });  
        
        // Get all students
        app.route('/api/students')
            .get(this.studentController.getStudents);

        // Create a new student
        app.route('/api/students')
            .post(this.userVaildator.addUser(),this.studentController.addNewStudent);

        // get a specific student
        app.route('/api/students/:studentId')
            .get(this.studentController.getStudentById);

        // update a specific student
        app.route('/api/students/:studentId')
            .put(this.studentController.updateStudent);
        
        // delete a specific student
        app.route('/api/students/:studentId')
            .delete(this.studentController.deleteStudent);

    }
}
