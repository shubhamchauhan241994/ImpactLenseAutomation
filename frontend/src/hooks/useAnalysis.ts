import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { api, AnalysisRequest, AnalysisResponse } from '@/lib/api'

export function useAnalysis() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: (request: AnalysisRequest) => api.analyzeTicket(request),
    onSuccess: (data: AnalysisResponse) => {
      setAnalysisResult(data)
      setError(null)
      toast.success('Analysis completed successfully!')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || 'Analysis failed'
      setError(errorMessage)
      setAnalysisResult(null)
      toast.error(errorMessage)
    },
  })

  const analyzeTicket = async (ticketId: string, options: any) => {
    const request: AnalysisRequest = {
      ticketId,
      options: {
        includeComments: options.includeComments ?? true,
        includeAttachments: options.includeAttachments ?? false,
        analysisDepth: options.analysisDepth ?? 'detailed',
        maxRelatedTickets: options.maxRelatedTickets ?? 20,
        minRelevanceScore: options.minRelevanceScore ?? 0.3,
      },
    }

    mutation.mutate(request)
  }

  const clearResults = () => {
    setAnalysisResult(null)
    setError(null)
  }

  return {
    analyzeTicket,
    isLoading: mutation.isPending,
    analysisResult,
    error,
    clearResults,
  }
} 