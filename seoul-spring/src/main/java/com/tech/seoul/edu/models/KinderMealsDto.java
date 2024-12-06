package com.tech.seoul.edu.models;

import lombok.Getter;

@Getter
public class KinderMealsDto {
	private String office_education;
    private String kindergarten_name;
    private String kindergarten_type;
    private String address;
    private String management_method;
    private String management_company;
    private int students_total_count;
    private int students_meals_count;
    private String dietitian_check;
    private int dietitian_single_count;
    private int dietitian_multi_count;
    private String dietitian_multi_name;
    private int chef_count;
    private int cook_count;
    private String catering_report_check;
    private double y_coordinate;
    private double x_coordinate;
}
