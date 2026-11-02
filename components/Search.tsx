"use client"
import React from "react";
import { BsSearch } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import style from "./Search.module.css";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import {createEmployee} from "@/lib/features/employees/employeesSlice"
import { useDispatch } from "react-redux";
interface Employee{
    name:string,
    email:string,
    phone:string,
    position:string
}
function Search() {
  const [showForm,setShowForm] = useState(false);
  const [formData,setFormData] = useState<Employee>({name:"",email:"",phone:"",position:""})
  const dispatch = useDispatch<any>()
  async function handleSubmit(){
    dispatch(createEmployee(formData))
    setShowForm(false)
    setFormData({name:"",email:"",phone:"",position:""})
  }
  return (
    <div className={style["search-container"]}>
       {showForm && formData !== null && (
            <div className={style["overlay"]} onClick={() => setShowForm(false)}></div>
        )}

      <div className={style["search-input"]}>
        {/* Magnifying Glass Icon */}
        <BsSearch className={style["search-icon"]} />
        {/* Search Input */}
        <input className={style["search-field"]} type="text" placeholder="Search by name,email, or position" />
      </div>

      <div className={style["add-record-button"]}>
        {/* Plus Icon */}
        <FaPlus />
        <button onClick={()=>setShowForm(true)} className={style["add-record-button-text"]}>Add New Record</button>
      </div>

      {showForm &&  (
            <div className={style["form-container"]}>
                <div className={style["form-header"]}>
                    <h2 className=''>Register New Record</h2>
                    <RxCross2 onClick={()=>setShowForm(false)} className={style['close-icon']}/>
                </div>
                <form className={style["form"]}>
                    <label>
                        Name:
                        <input value={formData?.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} type="text" name="name" />
                    </label>
                    <label>
                        Email:
                        <input value={formData?.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} type="email" name="email" />
                    </label>
                    <label>
                        Phone:
                        <input value={formData?.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} type="text" name="phone" />
                    </label>
                    <label> 
                          Position:
                        <input value={formData?.position} onChange={(e)=>setFormData({...formData,position:e.target.value})} type="text" name="position" />
                    </label>
                    
                </form>
                <div className={style["form-buttons"]}>
                        <button className={style['cancel-btn']} type="button" onClick={() => setShowForm(false)}>Cancel</button>
                        <button className={style['register-btn']} type="button"
                        onClick={()=>handleSubmit()}>Register</button>
                    </div>
            </div>
        )}
    </div>
  );
}

export default Search;
