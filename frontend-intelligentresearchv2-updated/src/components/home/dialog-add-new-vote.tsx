"use client";

import { useCandidatesByResearchId } from "@/api/candidate";
import { createVoteSchema, CreateVoteSchema } from "@/api/Vote";
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
import { SendIcon, VoteIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Loading } from "../loading";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const DialogAddNewVote = ({ researchID }: { researchID: string }) => {
  const { data, error, isLoading } = useCandidatesByResearchId(researchID);

  const form = useForm<CreateVoteSchema>({
    resolver: zodResolver(createVoteSchema),
    defaultValues: {
      candidateId: "",
      name: "",
      phoneNumber: "",
    },
  });

  const handleSubmit = async (values: CreateVoteSchema) => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <VoteIcon className="h-4 w-4 mr-2" />
          Adicionar Voto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar voto</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="candidateId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Candidato</FormLabel>
                  {isLoading || error ? (
                    <>
                      <Loading />
                      {error && (
                        <p className="text-red-500">
                          An unexpected error ocurred: {error}
                        </p>
                      )}
                    </>
                  ) : (
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar candidato"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {data?.candidates.map((candidate) => (
                          <SelectItem key={candidate.id} value={candidate.id!}>
                            {candidate.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </FormItem>
              )}
            />
            <div>
              <Label htmlFor="voter">Votante</Label>
              <p className="text-sm text-muted-foreground">
                Insira as informações do votante
              </p>
            </div>
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
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="grid grid-cols-3 items-center gap-4">
                  <FormLabel>Número para contato</FormLabel>
                  <Input className="col-span-2 h-8" {...field} />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              <SendIcon className="h-4 w-4 mr-2" />
              Enviar voto
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
