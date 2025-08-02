package com.impactlens.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class AnalysisRequest {
    
    @NotBlank(message = "Ticket ID is required")
    @Pattern(regexp = "^[A-Z]+-\\d+$", message = "Ticket ID must be in format PROJECT-123")
    private String ticketId;
    
    @NotNull(message = "Analysis options are required")
    private AnalysisOptions options;
    
    public static class AnalysisOptions {
        private boolean includeComments = true;
        private boolean includeAttachments = false;
        private String analysisDepth = "detailed";
        private int maxRelatedTickets = 20;
        private double minRelevanceScore = 0.3;
        
        // Getters and Setters
        public boolean isIncludeComments() {
            return includeComments;
        }
        
        public void setIncludeComments(boolean includeComments) {
            this.includeComments = includeComments;
        }
        
        public boolean isIncludeAttachments() {
            return includeAttachments;
        }
        
        public void setIncludeAttachments(boolean includeAttachments) {
            this.includeAttachments = includeAttachments;
        }
        
        public String getAnalysisDepth() {
            return analysisDepth;
        }
        
        public void setAnalysisDepth(String analysisDepth) {
            this.analysisDepth = analysisDepth;
        }
        
        public int getMaxRelatedTickets() {
            return maxRelatedTickets;
        }
        
        public void setMaxRelatedTickets(int maxRelatedTickets) {
            this.maxRelatedTickets = maxRelatedTickets;
        }
        
        public double getMinRelevanceScore() {
            return minRelevanceScore;
        }
        
        public void setMinRelevanceScore(double minRelevanceScore) {
            this.minRelevanceScore = minRelevanceScore;
        }
    }
    
    // Constructors
    public AnalysisRequest() {}
    
    public AnalysisRequest(String ticketId, AnalysisOptions options) {
        this.ticketId = ticketId;
        this.options = options;
    }
    
    // Getters and Setters
    public String getTicketId() {
        return ticketId;
    }
    
    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }
    
    public AnalysisOptions getOptions() {
        return options;
    }
    
    public void setOptions(AnalysisOptions options) {
        this.options = options;
    }
    
    @Override
    public String toString() {
        return "AnalysisRequest{" +
                "ticketId='" + ticketId + '\'' +
                ", options=" + options +
                '}';
    }
} 