"use client"
import React, { useEffect } from 'react'
import style from './Table.module.css'
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { deleteEmployee, fetchAllEmployees, updateEmployee } from '@/lib/features/employees/employeesSlice';
interface Employee{
    _id:string,
    name:string,
    email:string,
    phone:string,
    position:string
}
function Table() {
    const data = useSelector((state: { employees: { data: Employee[] } }) => state.employees.data)
    const [showForm, setShowForm] = React.useState(false)
    const [formData, setFormData] = React.useState<Employee|null>(null)
    const dispatch = useDispatch<any>()
    // fetch data from api/employees and set it to data state
    async function fetchData() {
        dispatch(fetchAllEmployees())
    }
    // call fetchData on component mount
    useEffect(() => {
        fetchData()
    }, [])
    async function handleDelete(id: number) {
       dispatch(deleteEmployee(id))
    }
    // edit user functions
    function handleEdit(data:Employee) {
        setFormData(data)
        setShowForm(true)
    }
    async function handleEditSubmit() {
       dispatch(updateEmployee(formData))
       setFormData(null)
       setShowForm(false)
    }
  return (
    <div className={style["table-container"]}>
        {showForm && formData !== null && (
            <div className={style["overlay"]} onClick={() => setShowForm(false)}></div>
        )}


        <table className={style["table"]}>
            <thead className={style["table-header"]}>
                <tr className={style["table-row"]}>
                    <th className={style["table-cell"]}>Id</th>
                    <th className={style["table-cell"]}>Name</th>
                    <th className={style["table-cell"]}>Email</th>
                    <th className={style["table-cell"]}>Phone</th>
                    <th className={style["table-cell"]}>Position</th>
                    <th className={style["table-cell"]}>Actions</th>
                </tr>
            </thead>
            <tbody className={style["table-body"]}>
                {data.map((employee: any,index:number) => (
                    <tr className={style["table-row"]} key={employee._id}>
                        <td className={style["table-cell"]}>{index+1}</td>
                        <td className={style["table-cell"]}>{employee.name}</td>
                        <td className={style["table-cell"]}>{employee.email}</td>
                        <td className={style["table-cell"]}>{employee.phone}</td>
                        <td className={style["table-cell"]}>{employee.position}</td>
                        <td className={`${style["table-cell"]} ${style["action-buttons"]}`}>
                            <div className={style["edit-button"]} onClick={() => handleEdit(employee)}>
                                <FaRegEdit className={style["edit-icon"]} />
                                <button >
                                    Edit
                                </button>
                            </div>
                            <div className={style["delete-button"]}  onClick={() => handleDelete(employee._id)}>
                                <MdOutlineDeleteForever className={style["delete-icon"]} />
                                <button>
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot className={style["table-footer"]}>
                <tr className={style["table-row"]}>
                    <td className={style["table-cell"]} colSpan={6}>@copyright 2023 Employee Management</td>
                </tr>
            </tfoot>    
        </table>

        {showForm && formData !== null && (
            <div className={style["edit-form-container"]}>
                <div className={style["edit-form-header"]}>
                    <h2 className=''>Edit Employee</h2>
                    <RxCross2 onClick={()=>setShowForm(false)} className={style['close-icon']}/>
                </div>
                <form className={style["edit-form"]}>
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
                        <button className={style['update-btn']} type="submit"
                        onClick={()=>handleEditSubmit()}>Update</button>
                    </div>
            </div>
        )}
    </div>
  )
}

export default Table