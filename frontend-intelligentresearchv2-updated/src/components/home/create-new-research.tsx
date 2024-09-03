import { useCreateResearch } from "@/api/research";
import {
  createResearchFormSchema,
  CreateResearchFormSchema,
} from "@/api/schemas/research";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentDate } from "@/utils/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export const CreateNewResearch = () => {
  const {
    mutate: createResearch,
    isLoading,
    revalidateQuery,
  } = useCreateResearch();

  const form = useForm<CreateResearchFormSchema>({
    resolver: zodResolver(createResearchFormSchema),
    defaultValues: {
      date: "",
      description: "",
      title: "",
    },
  });

  const handleSubmit = async (values: CreateResearchFormSchema) => {
    const response = await createResearch({
      title: values.title,
      candidates: [],
      Vote: [],
      startDate: getCurrentDate(),
      endDate: values.date,
      description: values.description,
    });

    if (response?.error) {
      return toast.error("Um erro ocorreu ao tentar criar a pesquisa");
    }

    revalidateQuery("/research");
    toast.success("Pesquisa criada com sucesso!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar uma nova pesquisa</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nome da pesquisa"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Insira a descrição da pesquisa"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Nome da pesquisa"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Criar pesquisa
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
