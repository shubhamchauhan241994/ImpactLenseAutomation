import { motion } from 'framer-motion'
import { TicketInputForm } from '@/components/TicketInputForm'
import { AnalysisResults } from '@/components/AnalysisResults'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { useAnalysis } from '@/hooks/useAnalysis'
import { Search, Zap, TrendingUp, Shield } from 'lucide-react'

export function HomePage() {
  const { analyzeTicket, isLoading, analysisResult, error } = useAnalysis()

  const handleAnalyze = async (ticketId: string, options: any) => {
    await analyzeTicket(ticketId, options)
  }

  const features = [
    {
      icon: Search,
      title: 'Deep Analysis',
      description: 'Comprehensive analysis of Jira tickets and their dependencies'
    },
    {
      icon: Zap,
      title: 'AI-Powered',
      description: 'Advanced AI algorithms to identify impact and relationships'
    },
    {
      icon: TrendingUp,
      title: 'Impact Assessment',
      description: 'Quantify the business impact of changes and decisions'
    },
    {
      icon: Shield,
      title: 'Risk Mitigation',
      description: 'Identify potential risks and suggest mitigation strategies'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                ImpactLens
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                AI-Driven Jira Impact Analysis Tool
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                Analyze the impact of Jira tickets, identify dependencies, and make informed decisions with our advanced AI-powered platform.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Analysis Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="card"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Analyze Your Jira Ticket
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Enter a Jira ticket ID to start your impact analysis
            </p>
          </div>
          
          <TicketInputForm 
            onSubmit={handleAnalyze}
            isLoading={isLoading}
          />
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center mt-8"
          >
            <LoadingSpinner />
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Analyzing ticket and finding related issues...
            </p>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 mt-8"
          >
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Analysis Error
            </h3>
            <p className="text-red-600 dark:text-red-300">
              {error}
            </p>
          </motion.div>
        )}

        {/* Analysis Results */}
        {analysisResult && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <AnalysisResults result={analysisResult} />
          </motion.div>
        )}
      </div>
    </div>
  )
} 