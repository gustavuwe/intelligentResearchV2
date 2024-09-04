"use client";

import { useCandidatesByResearchId } from "@/api/candidate";
import { createVoteSchema, CreateVoteSchema, useCreateVote, useSendVote } from "@/api/Vote";
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
import { toast } from "sonner";
import { createVoterSchema, CreateVoterSchema, useCreateVoter } from "@/api/voter";
import { useEffect, useState } from "react";

export const DialogAddNewVote = ({ researchID }: { researchID: string }) => {
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const { isLoading, data, error } = useCandidatesByResearchId(researchID);
  // const { mutate: createVoter, revalidateQuery: revalidateQueryVoter } = useCreateVoter();
  // const { mutate: createVote, revalidateQuery } = useCreateVote(researchID);

  const { mutate: sendVote, revalidateQuery: revalidateQueryVote } = useSendVote();

  const form = useForm<CreateVoteSchema>({
    resolver: zodResolver(createVoteSchema),
    defaultValues: {
      candidateId: "",
      voterName: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());
    });
  })

  const handleSubmit = async (values: CreateVoteSchema) => {
    // const responseVoter = await createVoter({
    //   name: values.name,
    //   phoneNumber: values.phoneNumber ?? "",
    //   candidateId: values.candidateId,
    //   Vote: [],
    // });

    // if (responseVoter?.error) {
    //   return toast.error("Houve um erro ao tentar adicionar um voto");
    // }

    // revalidateQueryVoter("/voter");

    // const response = await createVote({
    //   candidateId: values.candidateId,
    //   // @ts-ignore
    //   voterId: responseVoter?.data?.voter[0]?.id,
    //   researchId: researchID,
    // });

    // if (response?.error) {
    //   return toast.error("Houve um erro ao tentar adicionar um voto");
    // }

    // revalidateQuery("/vote");
    // toast.success("Voto adicionado com sucesso!");

    setIsOpen(!isOpen);

    const response = await sendVote({
      voterName: values.voterName,
      phoneNumber: values.phoneNumber ?? "",
      candidateId: values.candidateId,
      researchId: researchID,
      lat: latitude,
      long: longitude,
      Vote: [],
    });

    if (response?.error) {
      return toast.error("Houve um erro ao tentar enviar o voto");
    }

    revalidateQueryVote("/vote");
    toast.success("Voto enviado com sucesso!");
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
          <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar candidato"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        { /* @ts-ignore */ }
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
              name="voterName"
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
