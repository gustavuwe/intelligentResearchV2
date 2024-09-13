"use client";

import { Candidate } from "@/app/home/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CustomJWTPayload, getCookie, verifyJWT } from "@/utils/jwtVerification";
import axios from "axios";
import { HomeIcon, Menu } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import Link from "next/link";
import HeatmapSection from "@/components/resultados/heatmapSection";

declare global {
  interface Window {
    L: typeof L;
  }
}

interface Idata {
  neighborhood: string;
  votes: number;
}

interface CandidateData {
  name: string;
  data: Idata[];
}

interface locationsData {
  lat: string;
  long: string;
  intensity: number;
}

interface VoteData {
  lat: string
  long: string
}

interface VoteData2 {
  id: string;
  voterId: string;
  candidateId: string;
  researchId: string;
  lat: string;
  long: string;
  neighborhood: string;
  createdAt: string;
  updatedAt?: string;
}

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const HeatmapLayer = ({ data, intensity, mapCenter }: { data: number[][], intensity: number, mapCenter: number[] }) => {
  const map = useMap();
  const heatLayerRef = useRef<any>(null);

  useEffect(() => {
    if (!map) return;

    // Remove o heatmap antigo, se houver
    if (heatLayerRef.current) {
      console.log("Removing existing heat layer");
      map.removeLayer(heatLayerRef.current);
    }

    const adjustedData = data.map(([ lat, lng ]) => [lat, lng, 0.5 * intensity]);
    console.log("Adjusted Data:", adjustedData);

    // @ts-ignore
    heatLayerRef.current = L.heatLayer(adjustedData, { 
      radius: 25,
      maxZoom: 18,
    }).addTo(map);

    return () => {
      if (heatLayerRef.current) {
        console.log("Cleaning up heat layer");
        map.removeLayer(heatLayerRef.current);
      }
    };
  }, [map, data, intensity, mapCenter]);

  return null;
};

const chartConfig = {
  desktop: {
    label: "Votes",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Component() {
  const router = useRouter();
  const params = useParams();

  const [candidatesData2, setCandidatesData] = useState<CandidateData[]>([]);
  const [fullCandidatesData, setFullCandidatesData] = useState<Candidate[]>([]);
  const [geralData, setGeralData] = useState<CandidateData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateData | null>({ name: "todos os candidatos", data: [] });
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<CustomJWTPayload | null>(null);
  const [isMounted, setIsMounted] = useState(false)
  const [intensity, setIntensity] = useState(1)
  const [isAsideOpen, setIsAsideOpen] = useState(false)
  const [heatmapData2, setHeatmapData2] = useState<number[][]>([]);
  const [mapCenter, setMapCenter] = useState([-11.620693, -49.358930]);
  const [hasSelectedCandidate, setHasSelectedCandidate] = useState(false);

  useEffect(() => {
    setIsMounted(true)
  }, [heatmapData2])

  useEffect(() => {
    async function checkAuth() {
      const cookieToken = getCookie('token');
      setToken(cookieToken);

      if (cookieToken) {
        try {
          const payload = await verifyJWT();
          if (payload) {
            setUserData(payload);
            if (payload.role === 'ADMIN') {
              setIsAdmin(true);
            } else {
              router.push('/login');
            }
          } else {
            router.push('/login');
          }
        } catch (error) {
          router.push('/login')
          console.error('Failed to verify JWT:', error);
        }
      }

      setIsLoading(false);
    }

    checkAuth();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      const researchId = params?.id;
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/candidate/findByResearchId/${researchId}`, {
          withCredentials: true,
        });

        console.log(response)
  
        if (response.status === 200) {
          const data: CandidateData[] = [];

          setFullCandidatesData(response.data.candidates)
          response.data.candidates.forEach((candidate: any) => {
            const candidateData: CandidateData = { name: candidate.name, data: [] };
  
            candidate.Voters.forEach((voter: any) => {
              const neighborhoodData = candidateData.data.find(d => d.neighborhood === voter.neighborhood);
  
              if (neighborhoodData) {
                neighborhoodData.votes += 1;
              } else {
                candidateData.data.push({ neighborhood: voter.neighborhood, votes: 1 });
              }
            });
  
            data.push(candidateData);
          });
  
          setCandidatesData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  useEffect(() => {
    console.log("heatmapDataaaaaaaa:", heatmapData2[0]?.[0])
    if (heatmapData2?.length > 0) {
      const lat = !isNaN(Number(heatmapData2[0]?.[0])) ? heatmapData2[0]?.[0] : -6.262140;
      const long = !isNaN(Number(heatmapData2[0]?.[1])) ? heatmapData2[0]?.[1] : -36.514332;
      setMapCenter([lat, long]);
    }
  }, [heatmapData2]); // O efeito vai rodar sempre que heatmapData2 mudar

  useEffect(() => {
    if (candidatesData2.length > 0) {
      const geralDataVariable: CandidateData[] = [{ name: "todos os candidatos", data: [] }];

      candidatesData2.forEach((candidate) => {
        const totalVotes = candidate.data.reduce((sum, item) => sum + item.votes, 0);
        geralDataVariable[0].data.push({ neighborhood: candidate.name, votes: totalVotes });
      });

      setGeralData(geralDataVariable);
      setSelectedCandidate(geralDataVariable[0]);
    }
  }, [candidatesData2]);

  useEffect(() => {
    const data: Candidate | undefined = fullCandidatesData.find((d) => d.name === selectedCandidate?.name)

    console.log("candidato: ", data)
    
    const allLocations: number[][] = []

    // @ts-ignore
    data?.Vote.forEach((vote: VoteData2) => {
      const location: number[] = [parseFloat(vote.lat), parseFloat(vote.long)]
      allLocations.push(location)
    })

    setHeatmapData2(allLocations)
    
  }, [fullCandidatesData, selectedCandidate])

  if (isLoading || !isMounted) {
    return <Loading />;
  }

  if (!selectedCandidate) {
    return <p>Erro ao carregar os dados</p>;
  }
  

  return (
    <>
    <div className="flex flex-col md:flex-row max-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 border-r bg-muted/40">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Candidatos</h2>
          <div className="space-y-2">
            {candidatesData2.map((candidate) => (
              <Button
                key={candidate.name}
                variant={
                  selectedCandidate.name === candidate.name ? "default" : "ghost"
                }
                className="w-full justify-start"
                onClick={() => {
                  setSelectedCandidate(candidate);
                  setHasSelectedCandidate(true);
                }}
              >
                {candidate.name}
              </Button>
            ))}
          </div>
        </div>
      </aside>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden">
        <Sheet onOpenChange={setIsAsideOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="p-2" onClick={() => setIsAsideOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4">
            <SheetHeader>
              <SheetTitle>Candidatos</SheetTitle>
            </SheetHeader>
            <div className="space-y-2">
              {candidatesData2.map((candidate) => (
                <SheetClose asChild key={candidate.name}>
                <Button
                  key={candidate.name}
                  variant={
                    selectedCandidate.name === candidate.name ? "default" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => { setSelectedCandidate(candidate); setIsAsideOpen(!isAsideOpen) }}
                >
                  {candidate.name}
                </Button>
                </SheetClose>
              ))}
              <SheetClose asChild className="text-center">
                <Button
                  className="gap-2 justify-start w-full bg-gray-600"
                  variant="default"
                >
                  <Link href="/home" className="flex flex-row gap-2">
                    <HomeIcon size={18}/> Home
                  </Link>
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de votos para {selectedCandidate.name}</CardTitle>
            <CardDescription>Por bairro</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                data={selectedCandidate.data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                width={500}
                height={300}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="neighborhood" tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="votes" fill="var(--color-desktop)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Visualização de votos
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
    {hasSelectedCandidate === true ? (
      <section className={`mt-[120px] md:mt-[200px] lg:mt-[400px] min-h-[1000px] bg-white rounded-lg shadow-lg overflow-hidden ${isAsideOpen === true ? "hidden" : ""}`}>
      <div className="py-12 px-6 md:px-12">
        <h1 className="font-bold text-4xl md:text-6xl text-center tracking-tight text-gray-800 mb-8">
          Heatmap
        </h1>
        <div className="w-full space-y-6">
          <div className="h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <MapContainer
              center={[mapCenter[0], mapCenter[1]]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <HeatmapLayer data={heatmapData2} intensity={intensity} mapCenter={mapCenter} />
            </MapContainer>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-6">
            <label
              htmlFor="intensity-slider"
              className="text-sm font-medium text-gray-700"
            >
              Intensidade:
            </label>
            <input
              id="intensity-slider"
              type="range"
              min="0.2"
              max="10"
              step="0.2"
              value={intensity}
              onChange={(e) => setIntensity(parseFloat(e.target.value))}
              className="w-3/4 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700 w-12 text-right">
              {intensity.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </section>
    ) : null}
    {/* <HeatmapSection 
  isAsideOpen={isAsideOpen}
  mapCenter={mapCenter}
  heatmapData2={heatmapData2}
  intensity={intensity}
  setIntensity={setIntensity}
/> */}
    </>
  );
}



const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};