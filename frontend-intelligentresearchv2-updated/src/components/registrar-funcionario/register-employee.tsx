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

interface Employee {
  id?: number;
  userId: string;
  employerId: string;
}

export default function EmployeeRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employerId, setEmployerId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

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
    console.log(data)
    const payload = verifyJWT();
    if (payload) {
      setEmployerId(payload.sub);
    }
  }, [employerId, data]);

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
      employerId,
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
            {data?.employees?.employees === undefined || !data?.employees?.employees.length ? (
                <NotFound />
              ) : (
                <ul className="space-y-4">
                  {data.employees.employees?.map((employee) => (
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
