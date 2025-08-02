package com.impactlens.services.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.impactlens.dto.AnalysisResponse;
import com.impactlens.entities.JiraTicket;
import com.impactlens.services.OpenAIService;

@Service
public class OpenAIServiceImpl implements OpenAIService {
    
    private static final Logger logger = LoggerFactory.getLogger(OpenAIServiceImpl.class);
    
    @Override
    public List<String> extractKeywords(JiraTicket ticket) {
        logger.info("Extracting keywords from ticket: {}", ticket.getTicketKey());
        
        // Mock implementation for development
        return Arrays.asList(
            "feature",
            "user interface",
            "database",
            "API",
            "authentication",
            "performance"
        );
    }
    
    @Override
    public double calculateRelevanceScore(JiraTicket sourceTicket, JiraTicket relatedTicket) {
        logger.info("Calculating relevance score between {} and {}", 
            sourceTicket.getTicketKey(), relatedTicket.getTicketKey());
        
        // Mock implementation - return a random score between 0.3 and 0.9
        return 0.3 + Math.random() * 0.6;
    }
    
    @Override
    public AnalysisResponse.GapAnalysis performGapAnalysis(JiraTicket sourceTicket, List<JiraTicket> relatedTickets) {
        logger.info("Performing gap analysis for ticket: {}", sourceTicket.getTicketKey());
        
        // Mock implementation for development
        AnalysisResponse.GapAnalysis gapAnalysis = new AnalysisResponse.GapAnalysis();
        gapAnalysis.setCategory("Requirements");
        gapAnalysis.setDescription("Potential missing acceptance criteria for edge cases");
        gapAnalysis.setSeverity("Medium");
        gapAnalysis.setImpact("Could lead to incomplete testing coverage");
        gapAnalysis.setSuggestions(Arrays.asList(
            "Add edge case scenarios to acceptance criteria",
            "Consider error handling requirements",
            "Review security implications"
        ));
        
        return gapAnalysis;
    }
    
    @Override
    public List<AnalysisResponse.RegressionArea> generateRegressionAreas(JiraTicket sourceTicket, List<JiraTicket> relatedTickets) {
        logger.info("Generating regression areas for ticket: {}", sourceTicket.getTicketKey());
        
        // Mock implementation for development
        List<AnalysisResponse.RegressionArea> areas = new ArrayList<>();
        
        AnalysisResponse.RegressionArea area1 = new AnalysisResponse.RegressionArea();
        area1.setArea("User Authentication");
        area1.setDescription("Changes may affect login and session management");
        area1.setRiskLevel("High");
        area1.setTestCases(Arrays.asList(
            "Test login with valid credentials",
            "Test login with invalid credentials",
            "Test session timeout",
            "Test logout functionality"
        ));
        area1.setRationale("Authentication changes can have wide-reaching impact");
        areas.add(area1);
        
        AnalysisResponse.RegressionArea area2 = new AnalysisResponse.RegressionArea();
        area2.setArea("Database Operations");
        area2.setDescription("Verify data integrity and query performance");
        area2.setRiskLevel("Medium");
        area2.setTestCases(Arrays.asList(
            "Test CRUD operations",
            "Verify data consistency",
            "Check query performance",
            "Test transaction rollback"
        ));
        area2.setRationale("Database changes can affect data integrity");
        areas.add(area2);
        
        return areas;
    }
    
    @Override
    public String generateSummary(JiraTicket ticket, List<JiraTicket> relatedTickets) {
        logger.info("Generating summary for ticket: {}", ticket.getTicketKey());
        
        return String.format(
            "Analysis of ticket %s identified %d related tickets with potential impacts on %s areas. " +
            "Key areas of concern include authentication, database operations, and user interface changes. " +
            "Recommend thorough regression testing in these areas.",
            ticket.getTicketKey(),
            relatedTickets.size(),
            ticket.getSummary()
        );
    }
} 