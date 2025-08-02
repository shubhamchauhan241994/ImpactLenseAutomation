'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { TicketInputForm } from '@/components/ticket-input-form'
import { AnalysisResults } from '@/components/analysis-results'
import { LoadingSpinner } from '@/components/loading-spinner'
import { useAnalysis } from '@/hooks/use-analysis'

export default function Home() {
  const [ticketId, setTicketId] = useState('')
  const { analyzeTicket, isLoading, analysisResult, error } = useAnalysis()

  const handleAnalyze = async (ticketId: string, options: any) => {
    await analyzeTicket(ticketId, options)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ImpactLens
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              AI-Driven Jira Impact Analysis Tool
            </p>
          </div>

          <div className="grid gap-8">
            {/* Ticket Input Section */}
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Analyze Jira Ticket
              </h2>
              <TicketInputForm 
                onSubmit={handleAnalyze}
                isLoading={isLoading}
              />
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="card text-center">
                <LoadingSpinner />
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Analyzing ticket and finding related issues...
                </p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  Analysis Error
                </h3>
                <p className="text-red-600 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}

            {/* Analysis Results */}
            {analysisResult && !isLoading && (
              <AnalysisResults result={analysisResult} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
} 