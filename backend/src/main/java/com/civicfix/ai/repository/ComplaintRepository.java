package com.civicfix.ai.repository;

import com.civicfix.ai.model.Complaint;
import com.civicfix.ai.model.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByReporterIdOrderByCreatedAtDesc(Long reporterId);
    List<Complaint> findAllByOrderByPriorityScoreDescCreatedAtDesc();
    long countByStatus(ComplaintStatus status);
}
