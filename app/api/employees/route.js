import { NextResponse } from "next/server";
import Employee from "../../../models/Employee";
import connectDB from "../../../lib/mongoose";
export async function GET(){
    try{
        await connectDB()
        const employees = await Employee.find()

        if(!employees){
            return NextResponse.json({
                message: "No employees found",
                data:[]
            },{status:404})
        }
        return NextResponse.json({
            message: "Employees fetched successfully",
            data: employees
        })
    }
    catch(error){
        return NextResponse.json({
            message: "Failed to fetch employees",
            error: error.message
        },{status:500})
    }
}
// for inserting multiple employees at once, we can use insertMany() method of mongoose
// export async function POST(request){
//     try{
//         await connectDB()
//         const body = await request.json()
        
//         if(!body || !Array.isArray(body) || body.length === 0){
//             return NextResponse.json({
//                 message: "Invalid request body. Please provide an array of employees.",
//                 data:[]
//             },{status:400})
//         }
//         const employee = await Employee.insertMany(body)
//         return NextResponse.json({
//             message: "Employee created successfully",
//             data: employee
//         })
//     }
//     catch(error){
//         return NextResponse.json({
//             message: "Failed to POST employees",
//             error: error.message
//         },{status:500})
//     }
// }

export async function POST(req){
    try{
        await connectDB()
        const {name,email,phone,position} = await req.json()
        if(!name || !email || !phone || !position){
            return NextResponse.json({
                message: "All fields are required",
                data: null
            },{status:400})
        }

        const existingEmployee = await Employee.findOne({
            $or: [{ email }, { phone }]
        })
        if(existingEmployee){
            return NextResponse.json({
                message: "Email or phone already exists",
                data: null
            },{status:409})
        }

        const employee = await Employee.create({name,email,phone,position})
        
        return NextResponse.json({
            message: "Employee created successfully",
            data: employee
        })
    }
    catch(error){
        if(error.code === 11000){
            return NextResponse.json({
                message: "Email or phone already exists",
                data: null
            },{status:409})
        }
        return NextResponse.json({
            message:"Failed to create employee",
            error:error.message
        },{status:500})
    }
}