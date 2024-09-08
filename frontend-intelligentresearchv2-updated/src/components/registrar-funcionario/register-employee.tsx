"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, UserMinus, UserPlus } from "lucide-react";
import {
  RegisterEmployeeSchema,
  useGetEmployeesByEmployerId,
  useRegisterEmployee,
} from "@/api/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyJWT } from "@/utils/jwtVerification";
import { useForm } from "react-hook-form";
import {
  registerEmployeeFormSchema,
  RegisterEmployeeFormSchema,
} from "@/api/schemas/employee";
import { toast } from "sonner";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { useDeleteByUserId } from "@/api/auth";
import axios from "axios";
import { api } from "@/api";

interface Employee {
  id?: string;
  employerId: string;
  user: {
    id?: string;
    username: string;
  }
}

export default function EmployeeRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employerId, setEmployerId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [employeesData, setEmployeesData] = useState<Employee[]>([]);
  const [isEmployeesLoading, setIsEmployeesLoading] = useState(true);

  const {
    mutate: registerEmployee,
    revalidateQuery,
    isLoading,
    error,
  } = useRegisterEmployee();

  const { data } = useGetEmployeesByEmployerId(employerId);

  const { mutate: deleteByUserId } = useDeleteByUserId(userId);

  const form = useForm<RegisterEmployeeFormSchema>({
    resolver: zodResolver(registerEmployeeFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    async function fetchEmployerId() {
      const payload = await verifyJWT();
      if (payload) {
        setEmployerId(payload.sub);  // Define employerId após a verificação do JWT
      }

      if (employerId) {
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/employee/findByEmployerId/${employerId}`);
        setEmployeesData(response.data.employees.employees);
        setIsEmployeesLoading(false);
      }
    }
    fetchEmployerId();
  }, [employerId]);

  const handleSubmit = async (
    values: RegisterEmployeeSchema,
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log(values);
    console.log(employerId);
    const response = await registerEmployee({
      username: values.username,
      password: values.password,
      employerId: employerId || "",
    });

    if (response?.error) {
      return toast.error("Houve um erro ao tentar registrar o funcionário");
    }

    setIsSubmitting(false);
    toast.success("Funcionário registrado com sucesso!");
    revalidateQuery("/employee");
  };

  const removeEmployee = async (id: string) => {
    console.log(id)
    const response = await deleteByUserId(id);

    if (response?.error) {
      return toast.error("Aconteceu um erro ao tentar excluir o funcionário");
    }

    revalidateQuery("/employee");
    toast.success("Funcionário excluído com sucesso!");
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        Registro de Funcionários
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary">
              Adicionar Funcionário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
               {/* @ts-ignore */}
              <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome de usuário</FormLabel>
                      <Input className="col-span-2 h-8" {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <Input className="col-span-2 h-8" {...field} />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Registrar Funcionário
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary">
              Funcionários Registrados
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[350px] overflow-y-auto">
            {isEmployeesLoading ? (
              <Loading />
            ) : (
              employeesData.length == 0 ? (
                <NotFound />
              ) : (
                <ul className="space-y-4">
                  {employeesData?.map((employee) => (
                    <li
                      key={employee.user.id}
                      className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                    >
                      <span className="font-medium">{employee.user.username}</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          if (employee.user.id) { removeEmployee(employee.user.id) }}}
                      >
                        <UserMinus className="h-4 w-4 mr-2" />
                        Remover
                      </Button>
                    </li>
                  ))}
                </ul>
            )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const NotFound = () => {
  return (
    <p className="text-center text-muted-foreground">
      Nenhum funcionário adicionado.
    </p>
  );
};

const Loading = () => {
  return (
    <div role="status" className="mt-[15%] items-center justify-center flex overflow-hidden">
    <svg aria-hidden="true" className="text-center w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        {/* @ts-ignore */}
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
  );
}