package com.impactlens.controllers;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.impactlens.dto.AnalysisRequest;
import com.impactlens.dto.AnalysisResponse;
import com.impactlens.services.AnalysisService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/analysis")
@Tag(name = "Analysis", description = "Analysis management endpoints")
@CrossOrigin(origins = "*")
public class AnalysisController {
    
    private static final Logger logger = LoggerFactory.getLogger(AnalysisController.class);
    
    @Autowired
    private AnalysisService analysisService;
    
    @PostMapping("/analyze")
    @Operation(summary = "Analyze a Jira ticket", description = "Perform comprehensive analysis of a Jira ticket")
    public ResponseEntity<AnalysisResponse> analyzeTicket(
            @Valid @RequestBody AnalysisRequest request,
            Authentication authentication) {
        
        logger.info("Starting analysis for ticket: {}", request.getTicketId());
        
        try {
            AnalysisResponse response = analysisService.analyzeTicket(request, authentication);
            logger.info("Analysis completed for ticket: {} in {}ms", 
                request.getTicketId(), response.getMetadata().getProcessingTime());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Analysis failed for ticket: {}", request.getTicketId(), e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/status/{analysisId}")
    @Operation(summary = "Get analysis status", description = "Check the status of an ongoing analysis")
    public ResponseEntity<AnalysisResponse> getAnalysisStatus(
            @PathVariable UUID analysisId,
            Authentication authentication) {
        
        logger.info("Checking status for analysis: {}", analysisId);
        
        try {
            AnalysisResponse response = analysisService.getAnalysisStatus(analysisId, authentication);
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Failed to get analysis status: {}", analysisId, e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/history")
    @Operation(summary = "Get analysis history", description = "Retrieve analysis history for the current user")
    public ResponseEntity<Iterable<AnalysisResponse>> getAnalysisHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication) {
        
        logger.info("Retrieving analysis history for user: {}", authentication.getName());
        
        try {
            Iterable<AnalysisResponse> history = analysisService.getAnalysisHistory(page, size, authentication);
            return ResponseEntity.ok(history);
            
        } catch (Exception e) {
            logger.error("Failed to retrieve analysis history", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @DeleteMapping("/{analysisId}")
    @Operation(summary = "Delete analysis", description = "Delete a specific analysis result")
    public ResponseEntity<Void> deleteAnalysis(
            @PathVariable UUID analysisId,
            Authentication authentication) {
        
        logger.info("Deleting analysis: {}", analysisId);
        
        try {
            analysisService.deleteAnalysis(analysisId, authentication);
            return ResponseEntity.noContent().build();
            
        } catch (Exception e) {
            logger.error("Failed to delete analysis: {}", analysisId, e);
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @GetMapping("/health")
    @Operation(summary = "Health check", description = "Check if the analysis service is healthy")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Analysis service is healthy");
    }
} 