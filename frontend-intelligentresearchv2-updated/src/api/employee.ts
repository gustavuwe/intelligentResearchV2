import { useAPIMutation, useAPIQuery } from "@/hooks/useApi";
import { z } from "zod";

export type Employee = {
  id?: string;
  username: string;
  employerId: string;
  user: {
    id?: string;
    username: string;
  }
};

type usernames = {
    username: string;
}

export const registerEmployeeSchema = z.object({
  username: z.string(),
  password: z.string(),
  employerId: z.string(),
});

type EmployeeResponse = {
  employees: {
    employees: Employee[];
  };
};

type EmployeeUsernamesResponse = {
    employees: {
        employeesUsernames: usernames[];
    }
}

export const useRegisterEmployee = () =>
  useAPIMutation<EmployeeResponse>(`/employee/register-employee`, "post", {
    withCredentials: true,
  });

export const useGetEmployeesByEmployerId = (employerId: string) =>
  useAPIQuery<EmployeeResponse>(`/employee/findByEmployerId/${employerId}`, {
    withCredentials: true,
  });

export type RegisterEmployeeSchema = z.infer<typeof registerEmployeeSchema>;
