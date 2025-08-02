import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { analyzeTicket } from '@/lib/api'

export function useAnalysis() {
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: ({ ticketId, options }: { ticketId: string; options: any }) =>
      analyzeTicket(ticketId, options),
    onSuccess: (data) => {
      setAnalysisResult(data)
      setError(null)
      toast.success('Analysis completed successfully!')
    },
    onError: (err: any) => {
      const errorMessage = err.response?.data?.message || err.message || 'Analysis failed'
      setError(errorMessage)
      setAnalysisResult(null)
      toast.error(errorMessage)
    },
  })

  const analyzeTicketHandler = async (ticketId: string, options: any) => {
    mutation.mutate({ ticketId, options })
  }

  return {
    analyzeTicket: analyzeTicketHandler,
    isLoading: mutation.isPending,
    analysisResult,
    error,
    reset: () => {
      setAnalysisResult(null)
      setError(null)
    },
  }
} 