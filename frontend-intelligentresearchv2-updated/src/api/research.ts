import { useAPIMutation, useAPIQuery } from "@/hooks/useApi";
import { Candidate } from "./candidate";
import { Vote } from "./Vote";

export type Research = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  candidates: Candidate[];
  Vote: Vote[];
}
export type ResearchResponse = {
  researches: Research[];

}
export const useResearches = () => useAPIQuery<ResearchResponse>('/research', { withCredentials: true })

export const useResearchesByCreatorId = (creatorId: string) => useAPIQuery<ResearchResponse>(`/research/creator/${creatorId}`, { withCredentials: true })

export const useCreateResearch = () => useAPIMutation<ResearchResponse>('/research/register', 'post', { withCredentials: true })

export const useRemoveResearch = (researchID: string) => useAPIMutation<ResearchResponse>(`/research/delete/${researchID}`, 'delete', { withCredentials: true })