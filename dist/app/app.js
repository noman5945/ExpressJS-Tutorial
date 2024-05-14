"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//app.ts file does the entire backend functionalities 
const app = (0, express_1.default)();
const port = 5000;
app.use(express_1.default.json());
app.use(express_1.default.text());
//middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
/********Router**********/
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);
userRouter.post('/create-user', (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    res.json({
        success: true,
        message: "User created",
        data: newUser
    });
});
courseRouter.post('/create-course', (req, res) => {
    const newCourse = req.body;
    console.log(newCourse);
    res.json({
        success: true,
        message: "Course created",
        data: newCourse
    });
});
//Router error handler 
app.all("*", (req, res) => {
    res.json({
        success: false,
        messege: "Route not found"
    });
});
/**
 * Router End
 *******************************/
app.get("/", logger, (req, res, next) => {
    try {
        res.send("App ts godzilla");
    }
    catch (error) {
        next(error);
        //this will send error to glbal error handler
        // console.log(error)
        // res.json({
        //     success:false,
        //     messege:"Error occured"
        // })
    }
});
/**
 * Global error handler
 */
app.use((error, req, res, next) => {
    if (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            messege: "Something went wrong"
        });
    }
    next();
});
exports.default = app;
