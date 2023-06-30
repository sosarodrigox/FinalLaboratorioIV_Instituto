import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Datos() {
  return (
    <>
        <ul className='nav'>
            <li className='nav-item'><NavLink to="cursos" className= "nav-link">Cursos</NavLink></li>
            <li className='nav-item'><NavLink to="profesores" className= "nav-link">Profesores</NavLink></li>
            <li className='nav-item'><NavLink to="alumnos" className= "nav-link">Alumnos</NavLink></li>
        </ul>

        <Outlet></Outlet>
    </>
  )
}