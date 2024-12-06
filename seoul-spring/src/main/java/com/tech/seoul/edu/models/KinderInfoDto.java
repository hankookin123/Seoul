package com.tech.seoul.edu.models;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class KinderInfoDto {
	private KinderAfterDto kinderAfter;
	private KinderCarDto kinderCar;
	private KinderClassroomDto kinderClass;
	private KinderMealsDto kinderMeals;
	private KinderNormalDto kinderNormal;
	private KinderSafetyDto kinderSafty;
}
