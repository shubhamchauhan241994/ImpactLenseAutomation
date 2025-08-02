import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Search, Settings, Sparkles } from 'lucide-react'

const analysisSchema = z.object({
  ticketId: z.string().regex(/^[A-Z]+-\d+$/, 'Ticket ID must be in format PROJECT-123'),
  includeComments: z.boolean().default(true),
  includeAttachments: z.boolean().default(false),
  analysisDepth: z.enum(['basic', 'detailed', 'comprehensive']).default('detailed'),
  maxRelatedTickets: z.number().min(1).max(50).default(20),
  minRelevanceScore: z.number().min(0).max(1).default(0.3),
})

type AnalysisFormData = z.infer<typeof analysisSchema>

interface TicketInputFormProps {
  onSubmit: (ticketId: string, options: any) => Promise<void>
  isLoading: boolean
}

export function TicketInputForm({ onSubmit, isLoading }: TicketInputFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AnalysisFormData>({
    resolver: zodResolver(analysisSchema),
    defaultValues: {
      includeComments: true,
      includeAttachments: false,
      analysisDepth: 'detailed',
      maxRelatedTickets: 20,
      minRelevanceScore: 0.3,
    },
  })

  const onFormSubmit = async (data: AnalysisFormData) => {
    const options = {
      includeComments: data.includeComments,
      includeAttachments: data.includeAttachments,
      analysisDepth: data.analysisDepth,
      maxRelatedTickets: data.maxRelatedTickets,
      minRelevanceScore: data.minRelevanceScore,
    }
    
    await onSubmit(data.ticketId, options)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Ticket ID Input */}
      <div>
        <label htmlFor="ticketId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Jira Ticket ID
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            {...register('ticketId')}
            type="text"
            id="ticketId"
            placeholder="e.g., PROJ-123"
            className="input-field pl-10"
            disabled={isLoading}
          />
        </div>
        {errors.ticketId && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.ticketId.message}
          </p>
        )}
      </div>

      {/* Advanced Options Toggle */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>Advanced Options</span>
        </button>
      </div>

      {/* Advanced Options */}
      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          {/* Include Comments */}
          <div className="flex items-center">
            <input
              {...register('includeComments')}
              type="checkbox"
              id="includeComments"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="includeComments" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Include Comments
            </label>
          </div>

          {/* Include Attachments */}
          <div className="flex items-center">
            <input
              {...register('includeAttachments')}
              type="checkbox"
              id="includeAttachments"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="includeAttachments" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Include Attachments
            </label>
          </div>

          {/* Analysis Depth */}
          <div>
            <label htmlFor="analysisDepth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Analysis Depth
            </label>
            <select
              {...register('analysisDepth')}
              id="analysisDepth"
              className="input-field"
            >
              <option value="basic">Basic</option>
              <option value="detailed">Detailed</option>
              <option value="comprehensive">Comprehensive</option>
            </select>
          </div>

          {/* Max Related Tickets */}
          <div>
            <label htmlFor="maxRelatedTickets" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Max Related Tickets
            </label>
            <input
              {...register('maxRelatedTickets', { valueAsNumber: true })}
              type="number"
              id="maxRelatedTickets"
              min="1"
              max="50"
              className="input-field"
            />
          </div>

          {/* Min Relevance Score */}
          <div>
            <label htmlFor="minRelevanceScore" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Min Relevance Score
            </label>
            <input
              {...register('minRelevanceScore', { valueAsNumber: true })}
              type="number"
              id="minRelevanceScore"
              min="0"
              max="1"
              step="0.1"
              className="input-field"
            />
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => reset()}
          className="btn-secondary"
          disabled={isLoading}
        >
          Reset
        </button>
        <button
          type="submit"
          className="btn-primary flex items-center space-x-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Analyze Ticket</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
} 