import connectDB from "../../../../lib/mongoose";
import Employee from "../../../../models/Employee";
import { NextResponse } from "next/server";



export async function PUT(req,{params}){
    try{
        await connectDB()
        const {id} = await params
        const {name,email,phone,position} = await req.json()
        if(!name || !email || !phone || !position){
            return NextResponse.json({
                message: "All fields are required",
                data: null
            },{status:400})
        }

        const employee = await Employee.findByIdAndUpdate(id, {name,email,phone,position}, {new: true})
        return NextResponse.json({
            message: "Employee updated successfully",
            data: employee
        })
    }
    catch(error){
        return NextResponse.json({
            message:"Failed to update employee",
            error:error.message
        },{status:500})
    }
}
export async function DELETE(req,{params}){
    try{
        await connectDB()
        const {id} = await params
        const employee = await Employee.findByIdAndDelete(id)
        if(!employee){
            return NextResponse.json({
                message: "Employee not found",
                data: null
            },{status:404})
        }
        return NextResponse.json({
            message: "Employee deleted successfully",
            data: employee
        })
    }
    catch(error){
        return NextResponse.json({
            message: "Failed to delete employee",
            error: error.message
        },{status:500})
    }
}