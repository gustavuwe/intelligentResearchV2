"use client";

import { useAPIQuery } from "@/hooks/useApi";
import { Vote } from "./Vote";

export type Candidate = {
  id?: string;
  name: string;
  imgUrl: string;
  votes: number;
  researchId: string;
  Voters: String[];
  Vote: Vote[];
}

type CandidateResponse = {
  candidates: Candidate[];
}

export const useCandidates = () => useAPIQuery<CandidateResponse>('/candidate', { withCredentials: true })
export const useCandidatesByResearchId = (researchId: string) => useAPIQuery<CandidateResponse>(`/candidate/findByResearchId/${researchId}`, { withCredentials: true })