'use client'

import EmployeeRegistration from '@/components/registrar-funcionario/register-employee';
import { useAuthentication } from '@/hooks/useAuthentication';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'

interface Employee {
  id: number;
  username: string;
}

export default function EmployeeRegistrationPage() {
  const router = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { authenticated, isAdmin } = useAuthentication();
  const [isMounted, setIsMounted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
  }

  useEffect(() => {
    if (!authenticated && !isAdmin) {
      router.push("/login");
    } else {
      setIsMounted(true);  // Indicates that component has been mounted
    }
  }, [authenticated, router, isAdmin]);

  const removeEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id))
  }

  if (!isMounted) {
    return null;  // Avoid rendering anything until the component is mounted
  }

  return (
    <EmployeeRegistration />
  )
}