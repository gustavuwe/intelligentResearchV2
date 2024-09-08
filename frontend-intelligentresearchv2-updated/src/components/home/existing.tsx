"use client";
import { useResearches, useResearchesByCreatorId } from "@/api/research";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Loading } from "../loading";
import { DialogAddNewVote } from "./dialog-add-new-vote";
import { AlertDialogRemoveResearch } from "./alert-remove-research";
import { DialogAddNewCandidate } from "./dialog-add-new-candidate";
import { useEffect, useState } from "react";
import { verifyJWT } from "@/utils/jwtVerification";
import { api } from "@/api";

export const Existing = ({ isAdmin }: { isAdmin: boolean }) => {

  const [creatorId, setCreatorId] = useState<string>("");
  // const { data, error, isLoading } = useResearches();
  // const { data, error, isLoading } = useResearchesByCreatorId(creatorId);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const payload = verifyJWT();

    const fetchData = async (id: string) => {
      try {
        const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/research/creator/${id}`);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    if (payload) {
      fetchData(payload.sub);
    }
  }, [])

  if (isLoading || error) {
    return (
      <div>
        <Loading />
        {error && (
          <p className="text-red-500">An unexpected error ocurred: {error}</p>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pesquisas existentes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {!data?.researches?.length ? (
            <NotFound />
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {data?.researches?.map((research) => (
                <AccordionItem value={research.id} key={research.id}>
                  <AccordionTrigger>{research.title}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Data:</strong> {research.endDate}
                      </p>
                      <p className="truncate max-w-[230px]">
                        <strong>{research.candidates.length}</strong> Candidatos{" "}
                      </p>
                      <p>
                        <strong>Quantidade de Votos:</strong>{" "}
                        {research.Vote.length}
                      </p>
                      <DialogAddNewVote researchID={research.id} />
                      <DialogAddNewCandidate researchID={research.id} />
                      {isAdmin && (
                        <AlertDialogRemoveResearch researchID={research.id} />
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

const NotFound = () => {
  return (
    <p className="text-center text-muted-foreground">
      Nenhuma pesquisa encontrada.
    </p>
  );
};
