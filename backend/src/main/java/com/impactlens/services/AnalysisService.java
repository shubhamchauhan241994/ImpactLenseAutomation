package com.impactlens.services;

import java.util.UUID;

import org.springframework.security.core.Authentication;

import com.impactlens.dto.AnalysisRequest;
import com.impactlens.dto.AnalysisResponse;

public interface AnalysisService {
    
    /**
     * Analyze a Jira ticket and generate comprehensive report
     */
    AnalysisResponse analyzeTicket(AnalysisRequest request, Authentication authentication);
    
    /**
     * Get the status of an ongoing analysis
     */
    AnalysisResponse getAnalysisStatus(UUID analysisId, Authentication authentication);
    
    /**
     * Get analysis history for the current user
     */
    Iterable<AnalysisResponse> getAnalysisHistory(int page, int size, Authentication authentication);
    
    /**
     * Delete a specific analysis result
     */
    void deleteAnalysis(UUID analysisId, Authentication authentication);
} 