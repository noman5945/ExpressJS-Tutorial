import express, { NextFunction, Request, Response } from 'express'

//app.ts file does the entire backend functionalities 
const app=express()
const port=5000

app.use(express.json())
app.use(express.text())

//middleware
const logger=(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.url,req.method,req.hostname)
    next()
}
/********Router**********/
const userRouter=express.Router()
const courseRouter=express.Router()

app.use('/api/v1/users',userRouter)
app.use('/api/v1/courses',courseRouter)

userRouter.post('/create-user',(req:Request,res:Response)=>{
    const newUser=req.body
    console.log(newUser)

    res.json({
        success:true,
        message:"User created",
        data:newUser
    })
})

courseRouter.post('/create-course',(req:Request,res:Response)=>{
    const newCourse=req.body
    console.log(newCourse)

    res.json({
        success:true,
        message:"Course created",
        data:newCourse
    })
})

//Router error handler 
app.all("*",(req:Request,res:Response)=>{
    res.json({
        success:false,
        messege:"Route not found"
    })
})

/**
 * Router End
 *******************************/


app.get("/",logger,(req:Request,res:Response,next:NextFunction)=>{
    try {
        res.send("App ts godzilla")    
    } catch (error) {
        next(error)
        //this will send error to glbal error handler
        // console.log(error)
        // res.json({
        //     success:false,
        //     messege:"Error occured"
        // })
    }
    
})

/**
 * Global error handler
 */
app.use((error:any,req:Request,res:Response,next:NextFunction)=>{
    if(error){
        console.log(error)
        res.status(400).json({
            success:false,
            messege:"Something went wrong"
        })
    }
    next()
})


export default app