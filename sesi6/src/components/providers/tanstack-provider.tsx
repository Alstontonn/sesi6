"use client";
import { QueryClient, QueryClientProvider, QueryClientProviderProps } from "@tanstack/react-query"
import { useState } from "react"

interface TanstackProviderProps{
    children: React.ReactNode
}

export const TanstackProvider = ({ children }: {children: React.ReactNode}) => {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
}