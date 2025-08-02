import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight, ExternalLink, AlertTriangle, CheckCircle, Clock, TrendingUp, Users, Calendar } from 'lucide-react'

interface AnalysisResultsProps {
  result: any
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary']))

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
      case 'low':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20'
    }
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel?.toLowerCase()) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
      case 'low':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20'
    }
  }

  return (
    <div className="space-y-6">
      {/* Analysis Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analysis Summary
          </h3>
          <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="font-medium">{result.metadata?.processingTime || 0}ms</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">{result.metadata?.ticketsAnalyzed || 0} tickets analyzed</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {result.report?.summary || 'Analysis completed successfully.'}
          </p>
        </div>
      </motion.div>

      {/* Key Metrics */}
      {result.report?.metrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Impact Score
            </h4>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {result.report.metrics.impactScore || 'N/A'}
            </p>
          </div>
          
          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Affected Teams
            </h4>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {result.report.metrics.affectedTeams || 0}
            </p>
          </div>
          
          <div className="card text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Timeline Impact
            </h4>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {result.report.metrics.timelineImpact || 'N/A'}
            </p>
          </div>
        </motion.div>
      )}

      {/* Related Tickets */}
      {result.report?.relatedTickets && result.report.relatedTickets.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <button
            onClick={() => toggleSection('relatedTickets')}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Related Tickets ({result.report.relatedTickets.length})
            </h3>
            {expandedSections.has('relatedTickets') ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.has('relatedTickets') && (
            <div className="space-y-4">
              {result.report.relatedTickets.map((ticket: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {ticket.ticketKey}
                        </span>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(ticket.severity)}`}>
                          {ticket.severity || 'Unknown'}
                        </span>
                        {ticket.relevanceScore && (
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Relevance: {(ticket.relevanceScore * 100).toFixed(1)}%
                          </span>
                        )}
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {ticket.summary}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {ticket.description}
                      </p>
                    </div>
                    <a
                      href={ticket.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Risk Assessment */}
      {result.report?.riskAssessment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <button
            onClick={() => toggleSection('riskAssessment')}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Risk Assessment
            </h3>
            {expandedSections.has('riskAssessment') ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.has('riskAssessment') && (
            <div className="space-y-4">
              {result.report.riskAssessment.risks?.map((risk: any, index: number) => (
                <div key={index} className="border-l-4 border-red-500 pl-4 py-2">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getRiskLevelColor(risk.level)}`}>
                      {risk.level}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {risk.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {risk.description}
                  </p>
                  {risk.mitigation && (
                    <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-300">
                        <strong>Mitigation:</strong> {risk.mitigation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Recommendations */}
      {result.report?.recommendations && result.report.recommendations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recommendations
          </h3>
          <div className="space-y-4">
            {result.report.recommendations.map((rec: any, index: number) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    {rec.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {rec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
} 