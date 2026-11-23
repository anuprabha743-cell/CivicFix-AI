package com.civicfix.ai.dto;

import com.civicfix.ai.model.ComplaintStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ComplaintDtos {
    public record CreateRequest(
            @NotBlank @Size(max = 120) String title,
            @NotBlank @Size(max = 2000) String description,
            @NotBlank String category,
            @NotNull Double latitude,
            @NotNull Double longitude,
            String address,
            String photoUrl) {}

    public record StatusRequest(@NotNull ComplaintStatus status) {}
}
