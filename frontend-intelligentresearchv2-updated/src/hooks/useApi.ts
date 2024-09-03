"use client";

import { api } from "@/api";
import { ApiContext } from "@/contexts/api";
import { AxiosRequestConfig, isAxiosError } from "axios";
import React, { useContext } from "react";

type MutateMethods = 'post' | 'put' | 'delete'

export const useAPIQuery = <T>(path: string, options: AxiosRequestConfig): {
  data: T | null
  error: string | null
  isLoading: boolean
} => {
  const { registerQuery } = useContext(ApiContext);
  const [data, setData] = React.useState<T | null>({} as T)
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await api.get(path, options)
      setData(response.data)
      setError(null)
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err.response?.data?.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    registerQuery(path, fetchData)
    fetchData()
  }, [path, JSON.stringify(options)])

  return { data, error, isLoading }
}

export const useAPIMutation = <T>(path: string, method: MutateMethods, options: AxiosRequestConfig): {
  mutate: (values?: any) => Promise<{ data: T | null; error: string | null } | null>
  revalidateQuery: (path: string) => void
  error: string | null
  isLoading: boolean
} => {
  const { revalidateQuery } = useContext(ApiContext);
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const mutate = async (values?: any) => {
    setIsLoading(true)
    try {
      const response = await api[method](path, values, options)
      setError(null)
      return { data: response.data, error: null }
    } catch (err) {
      setError(isAxiosError(err) ? err.response?.data?.message : "Um error inesperado ocorreu!")
      return { data: null, error: isAxiosError(err) ? err.response?.data?.message : "Um error inesperado ocorreu!" }
    } finally {
      setIsLoading(false)
    }
  }


  return { mutate, error, isLoading, revalidateQuery }
}