package com.impactlens.services;

import java.util.List;

import com.impactlens.dto.AnalysisResponse;
import com.impactlens.entities.JiraTicket;

public interface OpenAIService {
    
    /**
     * Extract keywords from a Jira ticket
     */
    List<String> extractKeywords(JiraTicket ticket);
    
    /**
     * Calculate relevance score between two tickets
     */
    double calculateRelevanceScore(JiraTicket sourceTicket, JiraTicket relatedTicket);
    
    /**
     * Perform gap analysis
     */
    AnalysisResponse.GapAnalysis performGapAnalysis(JiraTicket sourceTicket, List<JiraTicket> relatedTickets);
    
    /**
     * Generate regression testing areas
     */
    List<AnalysisResponse.RegressionArea> generateRegressionAreas(JiraTicket sourceTicket, List<JiraTicket> relatedTickets);
    
    /**
     * Generate summary for analysis
     */
    String generateSummary(JiraTicket ticket, List<JiraTicket> relatedTickets);
} 