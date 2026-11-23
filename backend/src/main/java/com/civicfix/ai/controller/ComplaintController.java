package com.civicfix.ai.controller;

import com.civicfix.ai.dto.ComplaintDtos.*;
import com.civicfix.ai.model.User;
import com.civicfix.ai.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {
    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> create(@Valid @RequestBody CreateRequest request,
                                      @AuthenticationPrincipal User reporter) {
        return complaintService.create(request, reporter);
    }

    @GetMapping("/mine")
    public List<Map<String, Object>> mine(@AuthenticationPrincipal User reporter) {
        return complaintService.mine(reporter);
    }
}
