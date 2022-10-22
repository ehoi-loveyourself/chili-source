package com.ssafy.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
public class GanttChart extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gantt_chart_id")
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    private String content;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    private Long userId;
}