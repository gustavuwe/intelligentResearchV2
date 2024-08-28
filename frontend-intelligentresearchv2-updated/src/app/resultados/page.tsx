"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChart3Icon,
  LineChartIcon,
  PieChartIcon,
  ScatterChartIcon,
} from "lucide-react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Research } from "../home/page";

const researchCards = [
  {
    title: "Market Trends",
    description: "Analyze market trends over time",
  },
  {
    title: "Growth Projections",
    description: "View company growth projections",
  },
  {
    title: "Market Share",
    description: "Examine market share distribution",
  },
];

export default function Component() {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = useState(0);
  const [researches, setResearches] = useState<Research[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
          withCredentials: true,
        });

        console.log(response)

        if (response.status !== 200) {
          router.push("/login");
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        router.push("/login");
      }
    };

    verifyToken();
  }, [router]);

  useEffect(() => {
    const verifyTokenAdmin = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-admin`,
          {
            withCredentials: true,
          }
        );

        if (response.status !== 200) {
          setIsAdmin(false);
          router.push("/login");
        } else {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Token verification failed:", err);
        setIsAdmin(false);
        router.push("/login");
      }
    };

    verifyTokenAdmin();
  }, [isAdmin, router]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/research`);
      setResearches(response.data.researches);
    };
    fetchData();
  }, []);

  if (isLoading || isAdmin !== true) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Resultado das pesquisas</h1>
      <p className="text-muted-foreground mb-6">
        Selecione uma pesquisa para ver os gráficos e análises detalhados.
      </p>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researches.map((card, index) => (
            <Card
              key={index}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedCard === index ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedCard(index)}
            >
              <Link href={`/resultados/${card.id}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span>{card.title}</span>
                  </CardTitle> 
                </CardHeader>
                <CardContent>
                  <div className="h-32 bg-muted rounded-md flex items-center justify-center">
                    <span className="text-muted-foreground">
                      Clique para ver o gráfico
                    </span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};
