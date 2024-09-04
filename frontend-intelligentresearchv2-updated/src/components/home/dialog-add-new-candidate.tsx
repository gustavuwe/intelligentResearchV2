"use client";

import { useCandidatesByResearchId, useCreateCandidate } from "@/api/candidate";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, SendIcon, UserIcon, VoteIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Loading } from "../loading";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { CreateCandidateFormSchema, createCandidateFormSchema } from "@/api/schemas/candidate";
import { toast } from "sonner";
import { useState } from "react";

// export type Candidate = {
//   id?: string;
//   name: string;
//   imgUrl: string;
//   votes: number;
//   researchId: string;
//   Voters: String[];
//   Vote: Vote[];
// }


export const DialogAddNewCandidate = ({ researchID }: { researchID: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {  mutate: createCandidate, isLoading, revalidateQuery } = useCreateCandidate(researchID);

  const form = useForm<CreateCandidateFormSchema>({
    resolver: zodResolver(createCandidateFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (values: CreateCandidateFormSchema) => {
    setIsOpen(!isOpen);
    const response = await createCandidate({
      name: values.name,
      imgUrl: "", // maybe implement imgUrl feature later
      votes: 0,
      researchId: researchID,
      Voters: [],
      Vote: [],
    });

    if (response?.error) {
      return toast.error("Houve um erro ao tentar adicionar um candidato");
    }

    revalidateQuery("/candidate");
    toast.success("Candidato adicionado com sucesso!");
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">
          <PlusIcon className="h-4 w-4 mr-2" />
          Adicionar Candidato
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Candidato</DialogTitle>
        </DialogHeader>
            <div>
              <Label htmlFor="candidate">Candidato</Label>
              <p className="text-sm text-muted-foreground">
                Insira o nome do candidato
              </p>
            </div>
            <Form {...form}>
              <form className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center gap-4">
                  <FormLabel>Nome</FormLabel>
                  <Input className="col-span-2 h-8" {...field} />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isLoading}>
              <SendIcon className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
            </form>
            </Form>
      </DialogContent>
    </Dialog>
  );
};
