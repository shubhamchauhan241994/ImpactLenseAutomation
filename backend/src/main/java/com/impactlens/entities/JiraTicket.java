package com.impactlens.entities;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "jira_tickets")
public class JiraTicket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(name = "ticket_key", unique = true, nullable = false, length = 50)
    private String ticketKey;
    
    @Column(name = "ticket_id", nullable = false, length = 50)
    private String ticketId;
    
    @Column(columnDefinition = "TEXT")
    private String summary;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(length = 50)
    private String status;
    
    @Column(length = 20)
    private String priority;
    
    @Column(length = 100)
    private String assignee;
    
    @Column(length = 100)
    private String reporter;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "raw_data", columnDefinition = "JSONB")
    private String rawData;
    
    @Column(name = "last_synced_at")
    private LocalDateTime lastSyncedAt;
    
    @Column(name = "ttl_expires_at")
    private LocalDateTime ttlExpiresAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;
    
    // Constructors
    public JiraTicket() {}
    
    public JiraTicket(String ticketKey, String ticketId) {
        this.ticketKey = ticketKey;
        this.ticketId = ticketId;
    }
    
    // Getters and Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public String getTicketKey() {
        return ticketKey;
    }
    
    public void setTicketKey(String ticketKey) {
        this.ticketKey = ticketKey;
    }
    
    public String getTicketId() {
        return ticketId;
    }
    
    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }
    
    public String getSummary() {
        return summary;
    }
    
    public void setSummary(String summary) {
        this.summary = summary;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getPriority() {
        return priority;
    }
    
    public void setPriority(String priority) {
        this.priority = priority;
    }
    
    public String getAssignee() {
        return assignee;
    }
    
    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }
    
    public String getReporter() {
        return reporter;
    }
    
    public void setReporter(String reporter) {
        this.reporter = reporter;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    public String getRawData() {
        return rawData;
    }
    
    public void setRawData(String rawData) {
        this.rawData = rawData;
    }
    
    public LocalDateTime getLastSyncedAt() {
        return lastSyncedAt;
    }
    
    public void setLastSyncedAt(LocalDateTime lastSyncedAt) {
        this.lastSyncedAt = lastSyncedAt;
    }
    
    public LocalDateTime getTtlExpiresAt() {
        return ttlExpiresAt;
    }
    
    public void setTtlExpiresAt(LocalDateTime ttlExpiresAt) {
        this.ttlExpiresAt = ttlExpiresAt;
    }
    
    public User getCreatedBy() {
        return createdBy;
    }
    
    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }
    
    @Override
    public String toString() {
        return "JiraTicket{" +
                "id=" + id +
                ", ticketKey='" + ticketKey + '\'' +
                ", ticketId='" + ticketId + '\'' +
                ", summary='" + summary + '\'' +
                ", status='" + status + '\'' +
                ", priority='" + priority + '\'' +
                ", assignee='" + assignee + '\'' +
                ", lastSyncedAt=" + lastSyncedAt +
                '}';
    }
} 