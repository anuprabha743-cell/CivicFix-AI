package com.civicfix.ai.service;

import com.civicfix.ai.dto.ComplaintDtos.*;
import com.civicfix.ai.model.Complaint;
import com.civicfix.ai.model.ComplaintStatus;
import com.civicfix.ai.model.User;
import com.civicfix.ai.repository.ComplaintRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ComplaintService {
    private final ComplaintRepository complaintRepository;

    public ComplaintService(ComplaintRepository complaintRepository) {
        this.complaintRepository = complaintRepository;
    }

    @Transactional
    public Map<String, Object> create(CreateRequest request, User reporter) {
        Complaint complaint = new Complaint();
        complaint.setTitle(request.title().trim());
        complaint.setDescription(request.description().trim());
        complaint.setCategory(request.category());
        complaint.setLatitude(request.latitude());
        complaint.setLongitude(request.longitude());
        complaint.setAddress(request.address());
        complaint.setPhotoUrl(request.photoUrl());
        complaint.setReporter(reporter);
        complaint.setPriorityScore(calculatePriority(request.category(), request.latitude(), request.longitude()));
        Complaint saved = complaintRepository.save(complaint);
        return response(saved, true);
    }

    public List<Map<String, Object>> mine(User reporter) {
        return complaintRepository.findByReporterIdOrderByCreatedAtDesc(reporter.getId())
                .stream().map(complaint -> response(complaint, false)).toList();
    }

    public List<Map<String, Object>> all() {
        return complaintRepository.findAllByOrderByPriorityScoreDescCreatedAtDesc()
                .stream().map(complaint -> response(complaint, true)).toList();
    }

    @Transactional
    public Map<String, Object> updateStatus(Long id, StatusRequest request) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Complaint not found."));
        complaint.setStatus(request.status());
        return response(complaintRepository.save(complaint), true);
    }

    public Map<String, Object> stats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("total", complaintRepository.count());
        stats.put("reported", complaintRepository.countByStatus(ComplaintStatus.REPORTED));
        stats.put("inProgress", complaintRepository.countByStatus(ComplaintStatus.IN_PROGRESS));
        stats.put("resolved", complaintRepository.countByStatus(ComplaintStatus.RESOLVED));
        return stats;
    }

    private int calculatePriority(String category, double latitude, double longitude) {
        int score = 50;
        if ("Road Damage".equals(category) || "Water Leakage".equals(category)) score += 20;
        if ("Garbage".equals(category) || "Drainage".equals(category)) score += 12;

        long nearbyDuplicates = complaintRepository.findAll().stream()
                .filter(existing -> existing.getCategory().equalsIgnoreCase(category))
                .filter(existing -> distanceKm(latitude, longitude,
                        existing.getLatitude(), existing.getLongitude()) < 0.5)
                .count();
        return Math.min(100, score + (int) nearbyDuplicates * 10);
    }

    private double distanceKm(double lat1, double lon1, double lat2, double lon2) {
        double earthRadius = 6371.0;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    private Map<String, Object> response(Complaint complaint, boolean includeReporter) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("id", complaint.getId());
        response.put("title", complaint.getTitle());
        response.put("description", complaint.getDescription());
        response.put("category", complaint.getCategory());
        response.put("latitude", complaint.getLatitude());
        response.put("longitude", complaint.getLongitude());
        response.put("address", complaint.getAddress());
        response.put("photoUrl", complaint.getPhotoUrl());
        response.put("status", complaint.getStatus().name());
        response.put("priorityScore", complaint.getPriorityScore());
        response.put("createdAt", complaint.getCreatedAt());
        response.put("updatedAt", complaint.getUpdatedAt());
        if (includeReporter && complaint.getReporter() != null) {
            response.put("reporterName", complaint.getReporter().getName());
        }
        return response;
    }
}
