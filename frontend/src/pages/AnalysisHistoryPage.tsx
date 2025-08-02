import { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { History, Clock, TrendingUp, AlertTriangle } from 'lucide-react'
import { api } from '@/lib/api'
import { formatDistanceToNow } from 'date-fns'

export function AnalysisHistoryPage() {
  const [page] = useState(0)
  const [size] = useState(20)

  const { data: history, isLoading, error } = useQuery({
    queryKey: ['analysis-history', page, size],
    queryFn: () => api.getAnalysisHistory(page, size),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <TrendingUp className="w-5 h-5 text-green-500" />
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
            <History className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Analysis History
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            View your previous Jira ticket analyses
          </p>
        </motion.div>

        <div className="card">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading analysis history...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 dark:text-red-300">Failed to load analysis history</p>
            </div>
          ) : history && history.length > 0 ? (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Ticket ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Processing Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Summary
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {history.map((item: any) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.ticketId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getStatusIcon(item.status)}
                            <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {formatDistanceToNow(new Date(item.metadata?.createdAt || item.createdAt), { addSuffix: true })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                          {item.metadata?.processingTime ? `${item.metadata.processingTime}ms` : '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                          <div className="max-w-xs truncate">
                            {item.report?.summary || 'No summary available'}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No analysis history found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 