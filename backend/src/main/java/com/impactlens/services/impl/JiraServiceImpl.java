package com.impactlens.services.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.impactlens.entities.JiraTicket;
import com.impactlens.services.JiraService;

@Service
public class JiraServiceImpl implements JiraService {
    
    private static final Logger logger = LoggerFactory.getLogger(JiraServiceImpl.class);
    
    @Override
    public JiraTicket fetchTicket(String ticketKey) {
        logger.info("Fetching ticket from Jira: {}", ticketKey);
        
        // Mock implementation for development
        JiraTicket ticket = new JiraTicket();
        ticket.setTicketKey(ticketKey);
        ticket.setTicketId("12345");
        ticket.setSummary("Sample ticket for " + ticketKey);
        ticket.setDescription("This is a sample ticket description for development purposes.");
        ticket.setStatus("To Do");
        ticket.setPriority("Medium");
        ticket.setAssignee("developer@example.com");
        ticket.setReporter("product@example.com");
        ticket.setCreatedAt(LocalDateTime.now().minusDays(1));
        ticket.setUpdatedAt(LocalDateTime.now());
        ticket.setLastSyncedAt(LocalDateTime.now());
        ticket.setRawData("{\"mock\": \"data\"}");
        
        return ticket;
    }
    
    @Override
    public JiraTicket updateTicket(String ticketKey) {
        logger.info("Updating ticket from Jira: {}", ticketKey);
        return fetchTicket(ticketKey);
    }
    
    @Override
    public Iterable<JiraTicket> searchTickets(String query) {
        logger.info("Searching tickets in Jira with query: {}", query);
        
        // Mock implementation for development
        List<JiraTicket> tickets = new ArrayList<>();
        
        for (int i = 1; i <= 5; i++) {
            JiraTicket ticket = new JiraTicket();
            ticket.setTicketKey("PROJ-" + (100 + i));
            ticket.setTicketId(String.valueOf(12345 + i));
            ticket.setSummary("Related ticket " + i + " for query: " + query);
            ticket.setDescription("This is a related ticket found for the search query.");
            ticket.setStatus("In Progress");
            ticket.setPriority("High");
            ticket.setAssignee("developer@example.com");
            ticket.setReporter("product@example.com");
            ticket.setCreatedAt(LocalDateTime.now().minusDays(i));
            ticket.setUpdatedAt(LocalDateTime.now());
            ticket.setLastSyncedAt(LocalDateTime.now());
            ticket.setRawData("{\"mock\": \"search_result_" + i + "\"}");
            
            tickets.add(ticket);
        }
        
        return tickets;
    }
    
    @Override
    public String getTicketComments(String ticketKey) {
        logger.info("Fetching comments for ticket: {}", ticketKey);
        return "Sample comments for " + ticketKey;
    }
    
    @Override
    public String getTicketAttachments(String ticketKey) {
        logger.info("Fetching attachments for ticket: {}", ticketKey);
        return "Sample attachments for " + ticketKey;
    }
} 