package com.ssafy.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Widget extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "widget_id")
    private Long id;

    private String name;

    private Integer row;

    private Integer col;

    private Long projectId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "widget_code_id")
    private WidgetCode widgetCode;

    @Builder
    public Widget(String name, Integer row, Integer col, Long projectId, WidgetCode widgetCode) {
        this.name = name;
        this.row = row;
        this.col = col;
        this.projectId = projectId;
        this.widgetCode = widgetCode;
    }

    public void update(String name) {
        this.name = name;
    }

    public void locUpdate(Integer row, Integer col){
        this.row = row;
        this.col = col;
    }
}