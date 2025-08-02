'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, ExternalLink, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

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
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Analysis Summary
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{result.metadata?.processingTime || 0}ms</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>{result.metadata?.ticketsAnalyzed || 0} tickets analyzed</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300">
          {result.report?.summary || 'Analysis completed successfully.'}
        </p>
      </div>

      {/* Related Tickets */}
      {result.report?.relatedTickets && result.report.relatedTickets.length > 0 && (
        <div className="card">
          <button
            onClick={() => toggleSection('relatedTickets')}
            className="flex items-center justify-between w-full text-left"
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
            <div className="mt-4 space-y-4">
              {result.report.relatedTickets.map((ticket: any, index: number) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-blue-600 dark:text-blue-400">
                          {ticket.ticketKey}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {ticket.status}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        {ticket.summary}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>Relevance: {(ticket.relevanceScore * 100).toFixed(1)}%</span>
                        <span>Type: {ticket.relationshipType}</span>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <ExternalLink className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  {ticket.impactDescription && (
                    <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm text-blue-800 dark:text-blue-200">
                      {ticket.impactDescription}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Gap Analysis */}
      {result.report?.gapsIdentified && result.report.gapsIdentified.length > 0 && (
        <div className="card">
          <button
            onClick={() => toggleSection('gaps')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Identified Gaps ({result.report.gapsIdentified.length})
            </h3>
            {expandedSections.has('gaps') ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.has('gaps') && (
            <div className="mt-4 space-y-4">
              {result.report.gapsIdentified.map((gap: any, index: number) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {gap.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(gap.severity)}`}>
                          {gap.severity}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        {gap.description}
                      </p>
                      {gap.impact && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <strong>Impact:</strong> {gap.impact}
                        </p>
                      )}
                      {gap.suggestions && gap.suggestions.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Suggestions:
                          </p>
                          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {gap.suggestions.map((suggestion: string, idx: number) => (
                              <li key={idx}>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Regression Testing Areas */}
      {result.report?.regressionAreas && result.report.regressionAreas.length > 0 && (
        <div className="card">
          <button
            onClick={() => toggleSection('regression')}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Regression Testing Areas ({result.report.regressionAreas.length})
            </h3>
            {expandedSections.has('regression') ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.has('regression') && (
            <div className="mt-4 space-y-4">
              {result.report.regressionAreas.map((area: any, index: number) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {area.area}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(area.riskLevel)}`}>
                        {area.riskLevel} Risk
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    {area.description}
                  </p>
                  {area.rationale && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      <strong>Rationale:</strong> {area.rationale}
                    </p>
                  )}
                  {area.testCases && area.testCases.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Test Cases:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {area.testCases.map((testCase: string, idx: number) => (
                          <li key={idx}>{testCase}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Recommendations */}
      {result.report?.recommendations && result.report.recommendations.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Recommendations
          </h3>
          <ul className="space-y-2">
            {result.report.recommendations.map((recommendation: string, index: number) => (
              <li key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
} 