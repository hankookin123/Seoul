## Seoul - 서울시 공공데이터 서비스

다양한 분야의 서울시 공공데이터를 한데 모아 손쉽게 접근할 수 있는 서비스입니다. 총 5개의 분야로 문화, 어린이, 체육, 건강, 관광을 선택하였고, 각 분야의 시설 정보를 조회하고 카카오맵 API를 활용하여 지도에 시설물 위치를 표시합니다. 공공데이터 및 API 활용 능력에 대한 이해를 높이기 위해 백엔드와 프론트엔드 영역을 분리하였습니다. 백엔드는 Java, Spring을 사용하고 프론트엔드는 React Node.js를 사용합니다. 데이터는 공공데이터 API 또는 전처리 후 MariaDB에 저장하여 사용하였습니다.

[프로젝트 목표]
* 공공데이터 활용능력: 직접 생성한 데이터가 아닌 외부 데이터를 활용하는 방법을 익힘
* 프론트엔드와 백엔드 분리 경험: 프론트엔드와 백엔드를 확실히 분리하여 각각의 역할 이해도를 높임

[프로젝트 개요]
* 기간: 2024.11.26 ~ 2024.12.19
* 팀원: 백엔드 5명
* 사용기술: Java, Spring, MariaDB, MyBatis, React, Node.js
* 담당: 어린이 파트 (100%)

## 담당 기능
어린이관련 시설물 데이터를 선정, 수집하여 지도에서 위치와 상세정보를 보여줌.


* 실시간 검색으로 옵션이 변할 때 자동으로 서버에 요청을 보냄
* 페이지의 첫 번째 시설로 기본 포커스됨. 이후 목록에서 선택한 시설로 포커스 됨
![1번](https://github.com/hankookin123/other-resources/blob/main/seoul-img/img01.gif)


* 지도에서 오버레이 클릭 시 시설물 상세 정보 확인 가능
* 상세정보 데이터는 오버레이를 클릭할 때 서버에서 받아옴
![2번](https://github.com/hankookin123/other-resources/blob/main/seoul-img/img02.gif)


* 공공데이터로는 모든 정보를 알 수 없어 시설물 관리 페이지로 이동하는 편의성을 제공함
* 데이터 셋에 시설물ID를 이용하여 해당 시설 페이지로 바로 이동
![3번](https://github.com/hankookin123/other-resources/blob/main/seoul-img/img03.gif)



## 데이터 셋

* ### 유치원 알리미 서울시 1차 공시자료

공시항목: 방과후 과정 편성 운영에 관한 사항

테이블명: kids_after_school

|데이터셋 필드명|DB 테이블 필드명|타입|
|---|---|---|
|교육지원청명|office_education|varchar(100) |
|유치원명|kindergarten_name|varchar(100) |
|설립유형|kindergarten_type|varchar(50) |
|주소|address|varchar(200) |
|운영시작시|start_time|varchar(20) |
|운영종료시|end_time|varchar(20) |
|독립편성학급수|class_independent_count|int(11) |
|오후재편성학급수|class_afternoon_count|int(11) |
|학급 계|class_total_count|int(11) |
|독립편성참여원아수|students_independent_count|int(11) |
|오후재편성참여원아수|students_afternoon_count|int(11) |
|참여원아 계|students_total_count|int(11) |
|정규교사수|teacher_regular_count|int(11) |
|기간제교사수|teacher_temporary_count|int(11) |
|전담사수|teacher_Dedicated_count|int(11) |
|강사계|teacher_total_count|int(11) |
|Y좌표값|y_coordinate|decimal(9,6) |
|X좌표값|x_coordinate|decimal(9,6)|

[]

공시항목: 통학차량 현황

테이블명: kids_car

|데이터셋 필드명|DB 테이블 필드명|타입|
|---|---|---|
|교육지원청명|office_education |varchar(100) |
|유치원명|kindergarten_name |varchar(100) |
|설립유형|kindergarten_type |varchar(50) |
|주소|address |varchar(200) |
|차량운영여부|car_check |varchar(20) |
|운행차량수|car_active_total_count |int(11) |
|신고차량수|car_report_total_count |int(11) |
|9인승신고차량수|car_9 |int(11) |
|12인승신고차량수|car_12 |int(11) |
|15인승신고차량수|car_15 |int(11) |
|Y좌표값|y_coordinate |decimal(9,6) |
|X좌표값|x_coordinate |decimal(9,6)|

[]

공시항목: 교실면적 현황

테이블명: kids_classroom_area

|데이터셋 필드명|DB 테이블 필드명|타입|
|---|---|---|
|교육지원청명|office_education |varchar(100) |
|유치원명|kindergarten_name |varchar(100) |
|설립유형|kindergarten_type |varchar(50) |
|주소|address |varchar(200) |
|교실수|classroom_count |int(11) |
|교실면적|area_classroom |int(11) |
|실내체육장|area_gym |int(11) |
|보건/위생공간|area_clean |int(11) |
|조리실/급식공간|area_cook |int(11) |
|기타공간|area_etc |int(11) |
|Y좌표값|y_coordinate |decimal(9,6) |
|X좌표값|x_coordinate |decimal(9,6)|

[]

공시항목: 일반 현황

테이블명: kids_normal_now

|데이터셋 필드명|DB 테이블 필드명|타입|
|---|---|---|
|교육지원청명|office_education |varchar(100) |
|유치원명|kindergarten_name |varchar(100) |
|설립유형|kindergarten_type |varchar(50) |
|주소|address |varchar(200) |
|대표자명|hearder |varchar(50) |
|원장명|director |varchar(50) |
|설립일|birth |varchar(10) |
|개원일|start |varchar(10) |
|전화번호|tel |varchar(30) |
|홈페이지|home_page |varchar(100) |
|운영시간|operating_hours |varchar(100) |
|만3세학급수|class_count_3 |int(11) |
|만4세학급수|class_count_4 |int(11) |
|만5세학급수|class_count_5 |int(11) |
|혼합학급수|class_count_mix |int(11) |
|특수학급수|class_count_special |int(11) |
|인가총정원수|students_max_total |int(11) |
|3세정원수|students_max_3 |int(11) |
|4세정원수|students_max_4 |int(11) |
|5세정원수|students_max_5 |int(11) |
|혼합모집정원수|students_max_mix |int(11) |
|특수학급모집정원수|students_max_special |int(11) |
|만3세유아수|students_now_3 |int(11) |
|만4세유아수|students_now_4 |int(11) |
|만5세유아수|students_now_5 |int(11) |
|혼합유아수|students_now_mix |int(11) |
|특수유아수|students_now_special |int(11) |
|Y좌표값|y_coordinate |decimal(9,6) |
|X좌표값|x_coordinate |decimal(9,6)|
[]

### 서울 열린데이터 광장

공시이름: 서울시 우리동네키움센터 시설현황정보

테이블명: kids_bring_center

|데이터셋 필드명|DB 테이블 필드명|타입|
|---|---|---|
|시설ID|facility_id |varchar(20) |
|시설명|center_name |varchar(100) |
|서비스분류명|service_type |varchar(50) |
|연령구분|age_range |varchar(50) |
|X좌표값|x_coordinate |decimal(9,6) |
|Y좌표값|y_coordinate |decimal(9,6) |
|기본주소|address |varchar(200) |
|설립일|start_date |varchar(20) |
|학기시작시간|regular_start_time |int(11) |
|학기종료시간|regular_end_time |int(11) |
|방학시작시간|vacation_start_time |int(11) |
|방학종료시간|vacation_end_time |int(11) |
|재량휴일시작시간|discretion_start_time |int(11) |
|재량휴일종료시간|discretion_end_time |int(11) |
|토요일운영여부|saturday_active |varchar(10) |
|토요일운영시작시간|saturday_start_time |int(11) |
|토요일운영종료시간|saturday_end_time |int(11) |
|월사용료|month_price |int(11) |
|일사용료|day_price |int(11) |
|상시돌봄정원수|alltime_max_people |int(11) |
|일시돌봄정원수|parttime_max_people |int(11) |
|전용면적(m2)|private_area |double |
[]

공시이름: 서울시 지역아동센터 시설현황정보

테이블명: kids_local_center

|데이터셋 필드명|DB 테이블 필드명|타입|
|---|---|---|
|시설ID|facility_id |varchar(20) |
|시설명|center_name |varchar(100) |
|서비스분류|service_type |varchar(50) |
|연령구분|age_range |varchar(50) |
|X좌표값|x_coordinate |decimal(9,6) |
|Y좌표값|y_coordinate |decimal(9,6) |
|기본주소|address |varchar(200) |
|연락처|tel |varchar(30) |
|사용료|price |int(11) |
|학기시작시간|regular_start_time |int(11) |
|학기종료시간|regular_end_time |int(11) |
|방학시작시간|vacation_start_time |int(11) |
|방학종료시간|vacation_end_time |int(11) |
|토요일운영여부|saturday_active |varchar(10) |
|토요일운영시작시간|saturday_start_time |int(11) |
|토요일운영종료시간|saturday_end_time |int(11)|
[]



