package com.impactlens.testframework.reporting;

import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Value;

import com.impactlens.testframework.core.TestResult;
import com.impactlens.testframework.core.TestReport;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Test Report Generator for ImpactLens
 * Generates comprehensive test reports in various formats
 */
@Component
public class TestReportGenerator {
    
    private static final Logger logger = LoggerFactory.getLogger(TestReportGenerator.class);
    
    @Value("${test.report.output.dir:test-reports}")
    private String reportOutputDir;
    
    public TestReport generateComprehensiveReport(Map<String, TestResult> testResults) {
        TestReport report = new TestReport();
        
        try {
            logger.info("📋 Generating comprehensive test report");
            
            // Add all test results to the report
            for (Map.Entry<String, TestResult> entry : testResults.entrySet()) {
                report.addTestResult(entry.getKey(), entry.getValue());
            }
            
            // Generate recommendations based on test results
            generateRecommendations(report);
            
            // Add summary metrics
            addSummaryMetrics(report);
            
            logger.info("✅ Comprehensive test report generated successfully");
            
        } catch (Exception e) {
            logger.error("Failed to generate comprehensive test report", e);
        }
        
        return report;
    }
    
    public void saveReport(TestReport report) {
        try {
            // Create output directory if it doesn't exist
            File outputDir = new File(reportOutputDir);
            if (!outputDir.exists()) {
                outputDir.mkdirs();
            }
            
            // Generate report filename
            String timestamp = report.getGeneratedAt().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String filename = String.format("test_report_%s_%s.html", timestamp, report.getReportId().substring(0, 8));
            String filepath = outputDir.getAbsolutePath() + File.separator + filename;
            
            // Generate HTML report
            String htmlContent = generateHTMLReport(report);
            
            // Write to file
            try (FileWriter writer = new FileWriter(filepath)) {
                writer.write(htmlContent);
            }
            
            report.setReportPath(filepath);
            logger.info("📄 Test report saved to: {}", filepath);
            
        } catch (IOException e) {
            logger.error("Failed to save test report", e);
        }
    }
    
    private void generateRecommendations(TestReport report) {
        List<String> recommendations = new ArrayList<>();
        
        // Analyze test results and generate recommendations
        if (report.getFailedTests() > 0) {
            recommendations.add("Review and fix failed tests before deployment");
        }
        
        if (report.getTestCoverage() < 80) {
            recommendations.add("Increase test coverage to at least 80%");
        }
        
        if (report.getTotalDurationMs() > 300000) { // 5 minutes
            recommendations.add("Optimize test execution time");
        }
        
        // Add AI-specific recommendations
        recommendations.add("Consider implementing AI-powered test case generation");
        recommendations.add("Implement continuous monitoring with AI agents");
        recommendations.add("Use AI for predictive test failure analysis");
        
        report.setRecommendations(recommendations);
    }
    
    private void addSummaryMetrics(TestReport report) {
        report.addSummaryMetric("total_execution_time_minutes", report.getTotalDurationMs() / 60000.0);
        report.addSummaryMetric("average_test_duration_ms", report.getTotalDurationMs() / (double) report.getTotalTests());
        report.addSummaryMetric("success_rate_percentage", (double) report.getPassedTests() / report.getTotalTests() * 100);
        report.addSummaryMetric("failure_rate_percentage", (double) report.getFailedTests() / report.getTotalTests() * 100);
    }
    
    private String generateHTMLReport(TestReport report) {
        StringBuilder html = new StringBuilder();
        
        html.append("<!DOCTYPE html>\n");
        html.append("<html lang=\"en\">\n");
        html.append("<head>\n");
        html.append("    <meta charset=\"UTF-8\">\n");
        html.append("    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n");
        html.append("    <title>ImpactLens Test Report</title>\n");
        html.append("    <style>\n");
        html.append("        body { font-family: Arial, sans-serif; margin: 20px; }\n");
        html.append("        .header { background: #f0f0f0; padding: 20px; border-radius: 5px; }\n");
        html.append("        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }\n");
        html.append("        .metric { background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 5px; text-align: center; }\n");
        html.append("        .metric h3 { margin: 0; color: #333; }\n");
        html.append("        .metric p { font-size: 24px; font-weight: bold; margin: 10px 0; }\n");
        html.append("        .passed { color: #28a745; }\n");
        html.append("        .failed { color: #dc3545; }\n");
        html.append("        .partial { color: #ffc107; }\n");
        html.append("        .recommendations { background: #e7f3ff; padding: 20px; border-radius: 5px; margin: 20px 0; }\n");
        html.append("        .recommendations ul { margin: 10px 0; }\n");
        html.append("        .recommendations li { margin: 5px 0; }\n");
        html.append("    </style>\n");
        html.append("</head>\n");
        html.append("<body>\n");
        
        // Header
        html.append("    <div class=\"header\">\n");
        html.append("        <h1>🤖 ImpactLens AI-Based Test Report</h1>\n");
        html.append("        <p><strong>Report ID:</strong> ").append(report.getReportId()).append("</p>\n");
        html.append("        <p><strong>Generated:</strong> ").append(report.getGeneratedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))).append("</p>\n");
        html.append("        <p><strong>Overall Status:</strong> <span class=\"").append(report.getOverallStatus().toLowerCase()).append("\">").append(report.getOverallStatus()).append("</span></p>\n");
        html.append("    </div>\n");
        
        // Summary Metrics
        html.append("    <div class=\"summary\">\n");
        html.append("        <div class=\"metric\">\n");
        html.append("            <h3>Total Tests</h3>\n");
        html.append("            <p>").append(report.getTotalTests()).append("</p>\n");
        html.append("        </div>\n");
        html.append("        <div class=\"metric\">\n");
        html.append("            <h3>Passed Tests</h3>\n");
        html.append("            <p class=\"passed\">").append(report.getPassedTests()).append("</p>\n");
        html.append("        </div>\n");
        html.append("        <div class=\"metric\">\n");
        html.append("            <h3>Failed Tests</h3>\n");
        html.append("            <p class=\"failed\">").append(report.getFailedTests()).append("</p>\n");
        html.append("        </div>\n");
        html.append("        <div class=\"metric\">\n");
        html.append("            <h3>Test Coverage</h3>\n");
        html.append("            <p>").append(String.format("%.1f%%", report.getTestCoverage())).append("</p>\n");
        html.append("        </div>\n");
        html.append("        <div class=\"metric\">\n");
        html.append("            <h3>Total Duration</h3>\n");
        html.append("            <p>").append(String.format("%.1f min", report.getTotalDurationMs() / 60000.0)).append("</p>\n");
        html.append("        </div>\n");
        html.append("    </div>\n");
        
        // Test Results Details
        html.append("    <h2>📊 Test Results Details</h2>\n");
        html.append("    <table border=\"1\" style=\"width: 100%; border-collapse: collapse;\">\n");
        html.append("        <tr style=\"background: #f0f0f0;\">\n");
        html.append("            <th style=\"padding: 10px;\">Category</th>\n");
        html.append("            <th style=\"padding: 10px;\">Test Name</th>\n");
        html.append("            <th style=\"padding: 10px;\">Status</th>\n");
        html.append("            <th style=\"padding: 10px;\">Duration (ms)</th>\n");
        html.append("            <th style=\"padding: 10px;\">Severity</th>\n");
        html.append("        </tr>\n");
        
        for (Map.Entry<String, TestResult> entry : report.getTestResults().entrySet()) {
            TestResult testResult = entry.getValue();
            String statusClass = testResult.isSuccess() ? "passed" : "failed";
            
            html.append("        <tr>\n");
            html.append("            <td style=\"padding: 10px;\">").append(entry.getKey()).append("</td>\n");
            html.append("            <td style=\"padding: 10px;\">").append(testResult.getTestName()).append("</td>\n");
            html.append("            <td style=\"padding: 10px;\" class=\"").append(statusClass).append("\">").append(testResult.isSuccess() ? "PASSED" : "FAILED").append("</td>\n");
            html.append("            <td style=\"padding: 10px;\">").append(testResult.getDurationMs()).append("</td>\n");
            html.append("            <td style=\"padding: 10px;\">").append(testResult.getSeverity()).append("</td>\n");
            html.append("        </tr>\n");
        }
        
        html.append("    </table>\n");
        
        // Recommendations
        if (!report.getRecommendations().isEmpty()) {
            html.append("    <div class=\"recommendations\">\n");
            html.append("        <h2>💡 AI-Powered Recommendations</h2>\n");
            html.append("        <ul>\n");
            for (String recommendation : report.getRecommendations()) {
                html.append("            <li>").append(recommendation).append("</li>\n");
            }
            html.append("        </ul>\n");
            html.append("    </div>\n");
        }
        
        // Footer
        html.append("    <div style=\"margin-top: 40px; padding: 20px; background: #f0f0f0; border-radius: 5px; text-align: center;\">\n");
        html.append("        <p><em>Generated by ImpactLens AI-Based Test Framework</em></p>\n");
        html.append("        <p><em>Powered by AI Agents for Intelligent Testing</em></p>\n");
        html.append("    </div>\n");
        
        html.append("</body>\n");
        html.append("</html>\n");
        
        return html.toString();
    }
} 