"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import 'dotenv/config'
import { BlocksIcon, ChevronRight, Clock, HomeIcon, LogInIcon, MapPin, MedalIcon, MenuIcon, Search, Zap } from "lucide-react"
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Component() {
  const [email, setEmail] = useState('')
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 text-white overflow-hidden">
      <header className="px-4 lg:px-6 h-14 flex items-center fixed w-full z-50 bg-black bg-opacity-50 backdrop-blur-md justify-between">
        <Link className="flex items-center justify-center" href="/">
          <Zap className="h-6 w-6 text-yellow-400" />
          <span className="ml-2 font-bold text-xl">IntelligentResearch</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-yellow-400 transition-colors" href="#features">
            Recursos
          </Link>
          <Link className="text-sm font-medium hover:text-yellow-400 transition-colors" href="#benefits">
            Benefícios
          </Link>
        </nav>
        <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="bg-black bg-opacity-10 backdrop-blur-md">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className="pb-4  border-b border-solid">
                  <SheetTitle className="text-left font-bold">Menu</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-4 py-5">
                  <SheetClose asChild>
                    <Button
                      className="gap-2 justify-start bg-black hover:bg-gray-800"
                      variant="default"
                    >
                      <Link href="/" className="flex flex-row gap-2 bg-black bg-opacity-50 backdrop-blur-md">
                        <HomeIcon size={18}/> Inicio
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="gap-2 justify-start"
                      variant="ghost"
                    >
                      <Link href="#features" className="flex flex-row gap-2">
                        <BlocksIcon size={18}/> Recursos
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="gap-2 justify-start"
                      variant="ghost"
                    >
                      <Link href="#benefits" className="flex flex-row gap-2">
                        <MedalIcon size={18}/> Benefícios
                      </Link>
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button
                      className="gap-2 justify-start"
                      variant="outline"
                    >
                      <Link href="/login" className="flex flex-row gap-2">
                        <LogInIcon size={18}/> Entrar
                      </Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
      </header>
      <main>
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Abstract background"
              className="w-full h-full object-cover"
              layout="fill"
            />
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none animate-pulse">
                  Revolucione Sua Pesquisa
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl italic">
                  Descubra, Analise e Conquiste com a IntelligentResearch
                </p>
              </div>
              <Button className="inline-flex h-12 items-center justify-center rounded-full bg-yellow-400 px-8 text-lg font-bold text-black shadow transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-white">
                Comece a Explorar
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="pt-2">Já é cliente? <Link href="/login" className="bg-yellow-400 px-3 py-[3px] rounded-md text-black font-bold hover:px-[20px] transition-all">Entre</Link></p>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronRight className="h-10 w-10 rotate-90" />
          </div>
        </section>
        <section id="features" className="py-20 bg-white text-black skew-y-3 transform -mt-20">
          <div className="container px-4 md:px-6 -skew-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Recursos Inovadores</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center group hover:bg-purple-100 p-6 rounded-xl transition-colors">
                <Search className="h-12 w-12 text-purple-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold">Assistente Inteligente de Pesquisa</h3>
                <p className="text-gray-500">Algoritmos Inteligentes que entendem suas necessidades de pesquisa e sugerem recursos relevantes.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center group hover:bg-blue-100 p-6 rounded-xl transition-colors">
                <MapPin className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold">Geo-Localização de Pesquisa</h3>
                <p className="text-gray-500">Armazene dados de localização com nosso sistema avançado de geo-tagging.</p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center group hover:bg-green-100 p-6 rounded-xl transition-colors">
                <Clock className="h-12 w-12 text-green-600 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold">Ferramentas Para Economizar Tempo</h3>
                <p className="text-gray-500">Geração de gráficos baseados em dados, e separados por localização.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="benefits" className="h-[700px] py-20 bg-gray-900 text-white transform -mt-20 md:h-[550px] lg:h-[450px]">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 -skew-y-[-1deg]">Por que escolher a IntelligentResearch?</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 -skew-y-[-1deg]">
              {[
                "Salve o tempo do pesquisador em até 60%",
                "Acesse um dashboard da sua pesquisa completa com gráficos baseados na localização",
                "Economize recursos",
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors">
                  <Zap className="h-6 w-6 text-yellow-400 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" className="py-20 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 skew-y-3 transform -mt-20">
          <div className="container px-4 md:px-6 -skew-y-3 h-[300px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-white">
              Exclusividade
            </h2>
            <p className="mx-auto text-center font-bold max-w-[600px] text-white md:text-xl/relaxed lg:text-2xl/relaxed">Seja um dos pioneiros a desfrutar da <span className="text-blue-300">NOSSA</span> tecnologia para pesquisas.</p>
          </div>
        </section>
        <section className="py-20 bg-black text-white transform -mt-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Pronto para Revolucionar sua Pesquisa?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Junte-se a pessoas que já estão usando a IntelligentResearch para revolucionar suas pesquisas.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                    placeholder="Insira seu email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" className="bg-yellow-400 text-black font-bold hover:bg-yellow-300">
                    Começar
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  Entre em contato com a nossa equipe para começar suas pesquisas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-900 text-white py-8 px-4 md:px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Zap className="h-6 w-6 text-yellow-400 mr-2" />
            <span className="font-bold text-xl">IntelligentResearch</span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-sm hover:text-yellow-400 transition-colors" href="#">
              Termos de Serviço
            </Link>
            <Link className="text-sm hover:text-yellow-400 transition-colors" href="#">
              Política de Privacidade
            </Link>
            <Link className="text-sm hover:text-yellow-400 transition-colors" href="#">
              Contate-nos
            </Link>
          </nav>
        </div>
        <div className="mt-8 text-center text-sm text-gray-400">
          © 2024 IntelligentResearch Inc. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}