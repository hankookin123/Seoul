package com.tech.seoul.edu.models;

import lombok.Getter;

@Getter
public class KinderAfterDto {
	private String office_education;
    private String kindergarten_name;
    private String kindergarten_type;
    private String address;
    private String start_time;
    private String end_time;
    private int class_independent_count;
    private int class_afternoon_count;
    private int class_total_count;
    private int students_independent_count;
    private int students_afternoon_count;
    private int students_total_count;
    private int teacher_regular_count;
    private int teacher_temporary_count;
    private int teacher_dedicated_count;
    private int teacher_total_count;
    private double y_coordinate;
    private double x_coordinate;
}
