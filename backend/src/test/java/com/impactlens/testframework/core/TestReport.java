package com.impactlens.testframework.core;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

/**
 * Represents a comprehensive test report
 */
public class TestReport {
    private String reportId;
    private LocalDateTime generatedAt;
    private String overallStatus;
    private double testCoverage;
    private int totalTests;
    private int passedTests;
    private int failedTests;
    private int skippedTests;
    private long totalDurationMs;
    private Map<String, TestResult> testResults;
    private Map<String, Object> summaryMetrics;
    private List<String> recommendations;
    private String reportPath;
    
    public TestReport() {
        this.reportId = java.util.UUID.randomUUID().toString();
        this.generatedAt = LocalDateTime.now();
        this.testResults = new HashMap<>();
        this.summaryMetrics = new HashMap<>();
        this.recommendations = new ArrayList<>();
    }
    
    // Getters and Setters
    public String getReportId() { return reportId; }
    public void setReportId(String reportId) { this.reportId = reportId; }
    
    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }
    
    public String getOverallStatus() { return overallStatus; }
    public void setOverallStatus(String overallStatus) { this.overallStatus = overallStatus; }
    
    public double getTestCoverage() { return testCoverage; }
    public void setTestCoverage(double testCoverage) { this.testCoverage = testCoverage; }
    
    public int getTotalTests() { return totalTests; }
    public void setTotalTests(int totalTests) { this.totalTests = totalTests; }
    
    public int getPassedTests() { return passedTests; }
    public void setPassedTests(int passedTests) { this.passedTests = passedTests; }
    
    public int getFailedTests() { return failedTests; }
    public void setFailedTests(int failedTests) { this.failedTests = failedTests; }
    
    public int getSkippedTests() { return skippedTests; }
    public void setSkippedTests(int skippedTests) { this.skippedTests = skippedTests; }
    
    public long getTotalDurationMs() { return totalDurationMs; }
    public void setTotalDurationMs(long totalDurationMs) { this.totalDurationMs = totalDurationMs; }
    
    public Map<String, TestResult> getTestResults() { return testResults; }
    public void setTestResults(Map<String, TestResult> testResults) { this.testResults = testResults; }
    
    public Map<String, Object> getSummaryMetrics() { return summaryMetrics; }
    public void setSummaryMetrics(Map<String, Object> summaryMetrics) { this.summaryMetrics = summaryMetrics; }
    
    public List<String> getRecommendations() { return recommendations; }
    public void setRecommendations(List<String> recommendations) { this.recommendations = recommendations; }
    
    public String getReportPath() { return reportPath; }
    public void setReportPath(String reportPath) { this.reportPath = reportPath; }
    
    // Utility methods
    public void addTestResult(String category, TestResult result) {
        this.testResults.put(category, result);
        calculateSummary();
    }
    
    public void addRecommendation(String recommendation) {
        this.recommendations.add(recommendation);
    }
    
    public void addSummaryMetric(String key, Object value) {
        this.summaryMetrics.put(key, value);
    }
    
    private void calculateSummary() {
        this.totalTests = testResults.size();
        this.passedTests = (int) testResults.values().stream().filter(TestResult::isSuccess).count();
        this.failedTests = totalTests - passedTests;
        this.totalDurationMs = testResults.values().stream().mapToLong(TestResult::getDurationMs).sum();
        
        if (totalTests > 0) {
            this.testCoverage = (double) passedTests / totalTests * 100;
        }
        
        if (failedTests == 0) {
            this.overallStatus = "PASSED";
        } else if (failedTests < totalTests) {
            this.overallStatus = "PARTIAL";
        } else {
            this.overallStatus = "FAILED";
        }
    }
    
    public boolean isAllTestsPassed() {
        return "PASSED".equals(overallStatus);
    }
    
    @Override
    public String toString() {
        return String.format("TestReport{reportId='%s', status='%s', coverage=%.2f%%, total=%d, passed=%d, failed=%d}", 
            reportId, overallStatus, testCoverage, totalTests, passedTests, failedTests);
    }
} 