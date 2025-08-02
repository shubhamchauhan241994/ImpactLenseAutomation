import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export interface AnalysisRequest {
  ticketId: string
  options: {
    includeComments: boolean
    includeAttachments: boolean
    analysisDepth: 'basic' | 'detailed' | 'comprehensive'
    maxRelatedTickets: number
    minRelevanceScore: number
  }
}

export interface AnalysisResponse {
  analysisId: string
  status: string
  report: {
    summary: string
    gapsIdentified: Array<{
      category: string
      description: string
      severity: string
      impact: string
      suggestions: string[]
    }>
    relatedTickets: Array<{
      ticketKey: string
      summary: string
      status: string
      priority: string
      relevanceScore: number
      relationshipType: string
      impactDescription: string
    }>
    regressionAreas: Array<{
      area: string
      description: string
      riskLevel: string
      testCases: string[]
      rationale: string
    }>
    recommendations: string[]
  }
  metadata: {
    processingTime: number
    ticketsAnalyzed: number
    cacheHit: boolean
    completedAt: string
    modelUsed: string
  }
}

export const analyzeTicket = async (ticketId: string, options: any): Promise<AnalysisResponse> => {
  const response = await api.post('/api/analysis/analyze', {
    ticketId,
    options,
  })
  return response.data
}

export const getAnalysisStatus = async (analysisId: string): Promise<AnalysisResponse> => {
  const response = await api.get(`/api/analysis/status/${analysisId}`)
  return response.data
}

export const getAnalysisHistory = async (page = 0, size = 20): Promise<AnalysisResponse[]> => {
  const response = await api.get('/api/analysis/history', {
    params: { page, size },
  })
  return response.data
}

export const deleteAnalysis = async (analysisId: string): Promise<void> => {
  await api.delete(`/api/analysis/${analysisId}`)
}

export const getCacheStatus = async () => {
  const response = await api.get('/api/cache/status')
  return response.data
}

export const clearCache = async () => {
  await api.delete('/api/cache/clear')
}

export default api 