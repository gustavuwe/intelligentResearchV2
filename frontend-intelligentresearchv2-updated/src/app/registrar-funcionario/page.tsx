'use client'

import EmployeeRegistration from '@/components/registrar-funcionario/register-employee';
import { useState } from 'react'

interface Employee {
  id: number;
  username: string;
}

export default function EmployeeRegistrationPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)


    
    // setTimeout(() => {
    //   const newEmployee: Employee = {
    //     id: Date.now(),
    //     username: username
    //   }
    //   setEmployees([...employees, newEmployee])
    //   setUsername('')
    //   setPassword('')
    //   setIsSubmitting(false)
    // }, 1000)
  }

  const removeEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id))
  }

  return (
    <EmployeeRegistration />
  )
}