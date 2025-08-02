package com.impactlens.testframework.core;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

/**
 * Represents the result of a test execution
 */
public class TestResult {
    private String testName;
    private boolean success;
    private String errorMessage;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private long durationMs;
    private Map<String, Object> metrics;
    private List<String> logs;
    private TestSeverity severity;
    private String category;
    
    public enum TestSeverity {
        LOW, MEDIUM, HIGH, CRITICAL
    }
    
    public TestResult() {
        this.metrics = new HashMap<>();
        this.logs = new ArrayList<>();
        this.startTime = LocalDateTime.now();
    }
    
    public TestResult(String testName) {
        this();
        this.testName = testName;
    }
    
    // Getters and Setters
    public String getTestName() { return testName; }
    public void setTestName(String testName) { this.testName = testName; }
    
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    
    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }
    
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    
    public long getDurationMs() { return durationMs; }
    public void setDurationMs(long durationMs) { this.durationMs = durationMs; }
    
    public Map<String, Object> getMetrics() { return metrics; }
    public void setMetrics(Map<String, Object> metrics) { this.metrics = metrics; }
    
    public List<String> getLogs() { return logs; }
    public void setLogs(List<String> logs) { this.logs = logs; }
    
    public TestSeverity getSeverity() { return severity; }
    public void setSeverity(TestSeverity severity) { this.severity = severity; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    // Utility methods
    public void addMetric(String key, Object value) {
        this.metrics.put(key, value);
    }
    
    public void addLog(String log) {
        this.logs.add(log);
    }
    
    public void complete() {
        this.endTime = LocalDateTime.now();
        this.durationMs = java.time.Duration.between(startTime, endTime).toMillis();
    }
    
    public void fail(String errorMessage) {
        this.success = false;
        this.errorMessage = errorMessage;
        complete();
    }
    
    public void pass() {
        this.success = true;
        complete();
    }
    
    @Override
    public String toString() {
        return String.format("TestResult{testName='%s', success=%s, duration=%dms, category='%s'}", 
            testName, success, durationMs, category);
    }
} 