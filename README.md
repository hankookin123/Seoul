## Seoul - 서울시 공공데이터 서비스

다양한 분야의 서울시 공공데이터를 한데 모아 손쉽게 접근할 수 있는 서비스입니다. 총 5개의 분야로 문화, 어린이, 체육, 건강, 관광을 선택하였고, 각 분야의 시설 정보를 조회하고 카카오맵 API를 활용하여 지도에 시설물 위치를 표시합니다. 공공데이터 및 API 활용 능력에 대한 이해를 높이기 위해 백엔드와 프론트엔드 영역을 분리하였습니다. 백엔드는 Java, Spring을 사용하고 프론트엔드는 React Node.js를 사용합니다. 데이터는 공공데이터 API 또는 전처리 후 MariaDB에 저장하여 사용하였습니다.

[프로젝트 목표]
* 공공데이터 활용능력: 직접 생성한 데이터가 아닌 외부 데이터를 활용하는 방법을 익힘
* 프론트엔드와 백엔드 분리 경험: 프론트엔드와 백엔드를 확실히 분리하여 각각의 역할 이해도를 높임

[프로젝트 개요]
* 기간: 2024.11.26 ~ 2024.12.19
* 팀원: 백엔드 5명
* 사용기술: Java, Spring, MariaDB, MyBatis, React
* 담당: 어린이 파트 (프론트엔드,백엔드 100%)

## 담당 기능
어린이관련 시설물 데이터를 선정, 수집하여 지도에서 위치와 상세정보를 보여줌.

작동순서: 각시설물 탭에서 검색 조건을 넣어 실시간 검색 -> 목록 선택시 지도에서 포커스 이동 -> 지도 마커 오버레이 클릭시 상세정보 확인 -> 네이버 검색 이동 및 관리사이트 이동

* 실시간 검색으로 옵션이 변할 때 자동으로 서버에 요청을 보냄
* 페이지의 첫 번째 시설로 기본 포커스됨. 이후 목록에서 선택한 시설로 포커스 됨
![1번](https://github.com/hankookin123/other-resources/blob/main/seoul-img/img01.gif)


* 지도에서 오버레이 클릭 시 시설물 상세 정보 확인 가능
* 상세정보 데이터는 오버레이를 클릭할 때 서버에서 받아옴
![2번](https://github.com/hankookin123/other-resources/blob/main/seoul-img/img02.gif)


* 공공데이터로는 모든 정보를 알 수 없어 시설물 관리 페이지로 이동하는 편의성을 제공함
* 데이터 셋에 시설물ID를 이용하여 해당 시설 페이지로 바로 이동
![3번](https://github.com/hankookin123/other-resources/blob/main/seoul-img/img03.gif)

## 시스템 구성

* Java와 Spring으로 백엔드를 구현하고, React를 활용한 프론트엔드를 개발하여 분리된 구조에서 REST API 서버를 설계하고 클라이언트-서버 간 데이터를 처리하는 
구조를 구현하였습니다.
* 다양한 검색 옵션을 처리하기 위해 MyBatis의 동적 쿼리 기능을 적극 활용하였습니다.
* React의 컴포넌트 기반 구조와 클라이언트 측 라우팅을 활용하여 SPA 형태로 설계하였습니다. useState와 useEffect Hooks를 활용하여 사용자의 입력에 따라 상태를 업데이트하고, API 요청을 통해 실시간 검색이 가능하도록 구현하였습니다

## 데이터 구축

* 동일한 종류의 시설물은 발행기관과 등록일자가 일치하는 데이터셋을 사용하여 데이터 오류를 최소화하였습니다.
* 데이터셋의 갱신 주기가 길었고, 데이터 요청 속도 향상과 API 요청 제한 문제를 해결하기 위해, 데이터셋을 가공하여 자체 DB를 구축하였습니다.
* 좌표 정보가 누락된 시설물 데이터는 지오코딩을 수행하였으며, 불필요한 필드 삭제로 효율성을 향상시켰습니다

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


## 회고

* ### 검색 요청 최적화와 그 한계점

 실시간 검색 구현 시, 사용자가 입력창에 추가 글자를 입력하더라도 서버 응답속도보다 빠르게 입력하면 새로운 요청이 무시되는 문제가 발생하였습니다. 이를 해결하기 위해 AbortController를 활용하여 기존 요청이 진행 중인 경우 이를 중단하고 새로운 요청을 처리하는 기능과, 서버 요청 빈도를 줄이기 위해 검색어 상태 변화 후 0.2초의 딜레이를 두고 요청을 보내는 기능을 추가하였습니다. 이러한 작업은 검색어와 응답 데이터 간의 불일치 문제를 해결했지만, 요청 딜레이로 인해 서비스 사용성이 저하되는 결과를 초래하였습니다. 이 경험을 통해 사용자 경험과 시스템 성능 간의 균형을 맞추는 중요성을 깨달았습니다.

* ### ‘RESTful하다’를 체감

 Spring에서 데이터를 Model에 담아 뷰로 전달하는 방식과 달리, RestController를 활용하면서 데이터를 JSON 형식으로 반환하기 위해 DTO를 적극적으로 사용하여 데이터를 구조화하고, RESTful 설계의 장점을 체감할 수 있었습니다. DTO를 통해 필요한 데이터만 정확히 전달하도록 구성하면서 데이터의 체계화와 계층 간 분리를 자연스럽게 이해할 수 있었습니다.이를 통해 코드의 가독성과 유지보수성이 향상되었으며, RESTful 설계가 API 개발의 일관성과 효율성을 증가시킨다는 것을 알 수 있었습니다.

* ### 팀원 컴포넌트 활용에 대한 고민

 팀원이 작성한 카카오맵 API 컴포넌트를 처음 사용할 때 많은 어려움을 겪었습니다. React를 처음 접한 상태에서 컴포넌트를 활용하는 방식이 낯설고 복잡하게 느껴졌기 때문입니다. 처음에는 새롭게 코드를 작성하면 더 쉬울 것이라 생각했지만, 이미 작성된 코드를 어렵다는 이유로 재구현하는 것은 개발자로서 옳지 않다고 판단하였습니다. 이에 팀원의 컴포넌트를 분석하며 사용법을 익혔고, React 숙련도가 오르면서 문제없이 활용할 수 있었습니다. 새로 작성하는 것이 초기에는 더 편했을 수 있지만, 기존 컴포넌트를 사용함으로써 프로젝트 크기를 줄이고 협업 과정에서 성장할 수 있었습니다

