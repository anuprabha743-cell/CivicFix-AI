package com.civicfix.ai.controller;

import com.civicfix.ai.dto.ComplaintDtos.*;
import com.civicfix.ai.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ComplaintService complaintService;

    public AdminController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @GetMapping("/complaints")
    public List<Map<String, Object>> complaints() {
        return complaintService.all();
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        return complaintService.stats();
    }

    @PatchMapping("/complaints/{id}/status")
    public Map<String, Object> updateStatus(@PathVariable Long id,
                                            @Valid @RequestBody StatusRequest request) {
        return complaintService.updateStatus(id, request);
    }
}
