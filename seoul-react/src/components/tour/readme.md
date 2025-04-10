## 공통 설명

### 상태 변수 선언 및 초기화

- **`useState` 훅**을 사용하여 컴포넌트 내에서 관리되는 상태 변수를 선언합니다.
    - `seoulBoundary`: 서울시의 최외곽 경계선을 나타내는 GeoJSON 데이터.
    - `seoulDistricts`: 서울시의 구 단위 경계선을 나타내는 GeoJSON 데이터.
    - `isMapLoaded`: 지도가 로드되었는지 여부를 나타내는 상태.
    - `activeOverlayKey`: 현재 활성화된 오버레이(정보창)의 고유 키.

- **`useRef` 훅**을 사용하여 지도의 인스턴스, 오버레이, 마커 등을 관리합니다.
    - `mapRef`: Kakao Maps 인스턴스를 저장.
    - `overlayRef`: 오버레이 인스턴스를 저장.
    - `markersRef`: 마커들을 저장하는 `Map` 객체.
    - `seoulDistrictPolygonsRef` 및 `seoulBoundaryPolygonsRef`: 서울시의 경계선 폴리곤 인스턴스를 저장.
    - `idleListenerRef`: 지도가 이동(팬, 줌 등) 완료되었을 때 호출되는 이벤트 리스너를 저장.

- **`useNavigate` 훅**을 사용하여 React Router를 통한 페이지 이동을 관리.

- **카테고리별 마커 이미지 매핑**:
    - `markerImages`: 카테고리에 따른 마커 이미지 매핑. 각 컴포넌트에 따라 다른 이미지 경로를 설정할 수 있습니다.

### GeoJSON 데이터 로드

- **`useEffect` 훅**을 사용하여 컴포넌트가 마운트될 때 서울시의 최외곽 및 구 단위 경계선을 나타내는 GeoJSON 데이터를 비동기로 로드합니다.
    - `loadSeoulBoundary` 함수는 `seoul.geojson` 파일을 fetch로 가져와 `seoulBoundary` 상태 변수에 저장합니다.
    - `loadSeoulDistricts` 함수는 `seoulGeoJSON.geojson` 파일을 fetch로 가져와 `seoulDistricts` 상태 변수에 저장합니다.

- **로드 성공 여부**를 콘솔에 로그로 출력하고, 실패 시 에러를 콘솔에 기록합니다.

### 지도 초기화 및 설정

- **Kakao Maps API 스크립트 로드**:
    - `useEffect` 훅을 사용하여 컴포넌트가 마운트될 때 Kakao Maps API 스크립트를 동적으로 로드하고, 스크립트가 로드되면 지도를 초기화합니다.
    - `loadMap` 함수는 Kakao Maps 스크립트가 이미 로드되어 있는지 확인하고, 로드되지 않았다면 스크립트를 추가합니다.
    - 스크립트 로드 성공 시 `initializeMap` 함수를 호출하여 지도를 초기화합니다.

- **지도 초기화**:
    - `initializeMap` 함수는 사용자의 현재 위치를 가져와 지도의 중심을 설정하고, 위치 정보를 가져오지 못할 경우 기본 위치로 서울 시청의 좌표를 사용합니다.
    - `setupMap` 함수는 지도 인스턴스를 생성하고, 현재 위치를 표시하는 마커와 오버레이를 추가합니다.
    - 서울시의 구 단위 및 최외곽 경계선을 나타내는 폴리곤을 생성합니다.

- **초기 정보 로드**:
    - 각 컴포넌트별로 초기 데이터(축제 정보 또는 반려동물 동반 여행지 정보)를 로드합니다 (`fetchFestivalInfo` 또는 `fetchPetInfo`).

### 서울 경계선 폴리곤 생성

- **`createSeoulPolygon` 함수**는 `seoulDistricts` GeoJSON 데이터를 사용하여 서울시의 구 단위 경계선을 그리는 폴리곤을 생성합니다.
    - 각 구 단위의 경계선을 나타내는 폴리곤을 Kakao Maps의 `Polygon` 객체로 생성하고, 지도에 표시합니다.
    - 기존에 생성된 폴리곤을 모두 제거하고, 새로운 폴리곤 배열로 업데이트합니다.

- **`createSeoulBoundaryPolygon` 함수**는 `seoulBoundary` GeoJSON 데이터를 사용하여 서울시의 최외곽 경계선을 그리는 폴리곤을 생성합니다.
    - Kakao Maps의 `Polygon` 객체를 사용하여 최외곽 경계선을 지도에 표시합니다.
    - 기존에 생성된 폴리곤을 모두 제거하고, 새로운 폴리곤 배열로 업데이트합니다.

### 지도 이동 시 정보 업데이트

- **`useEffect` 훅**을 사용하여 지도가 이동(팬, 줌 등) 완료될 때마다 정보 업데이트 함수를 호출합니다 (`fetchFestivalInfo` 또는 `fetchPetInfo`).
    - `idle` 이벤트 리스너를 등록하여 지도가 이동 완료될 때마다 해당 위치의 정보를 가져옵니다.
    - 컴포넌트가 언마운트될 때 이벤트 리스너를 제거하여 메모리 누수를 방지합니다.

### 현재 위치로 돌아가는 기능

- **`returnToCurrentLocation` 함수**는 사용자의 현재 위치를 다시 가져와 지도의 중심을 해당 위치로 이동시킵니다.
    - 위치 정보를 가져올 수 없거나 GPS를 지원하지 않는 경우 경고 메시지를 표시하고, 기존 중심 위치를 유지합니다.

### 오버레이(정보창) 관리

- **`useEffect` 훅**을 사용하여 사용자가 마커를 클릭했을 때 해당 정보의 상세 내용을 오버레이로 표시합니다.
    - `fetchDetail` 함수는 각 컴포넌트별 API를 호출하여 상세 정보를 가져옵니다 (`fetchFestivalDetail` 또는 `fetchPetDetail`).
    - 가져온 상세 정보를 바탕으로 오버레이에 표시할 콘텐츠를 생성하고, Kakao Maps의 `CustomOverlay`를 사용하여 지도에 표시합니다.
    - 활성화된 오버레이 키가 없으면 오버레이를 숨깁니다.

### 커스텀 레이아웃 및 모달 관리

- **`customOverlayVisible` 상태**를 통해 커스텀 레이아웃(모달)의 표시 여부를 관리합니다.
    - 오버레이가 활성화되면 커스텀 레이아웃이 표시되고, 사용자가 닫기 버튼을 클릭하면 레이아웃이 숨겨집니다.

### 페이지 네비게이션

- **`navigateToTour`, `navigateToFestival`, `navigateToPet` 함수**는 React Router의 `useNavigate` 훅을 사용하여 특정 페이지로 이동합니다.
    - 예: 축제 페이지, 반려동물 동반 여행지 페이지 등.

### 렌더링

- **지도와 관련된 다양한 UI 요소**(버튼, 모달, 아이콘 등)를 렌더링합니다.
    - 현재 위치로 돌아가는 버튼
    - 커스텀 레이아웃 닫기 버튼
    - 페이지 이동 버튼들 (예: 관광지 보기, 축제 보기, 반려동물 동반 여행지 보기)
    - 지도 표시를 위한 `div` 요소
    - 지도 중앙에 항상 표시될 타겟 아이콘 이미지
    - 상시 정보 모달창 (축제 목록 또는 반려동물 동반 여행지 목록)

---

## 컴포넌트별 고유 기능

### `MapComponent.jsx`

> **기본 맵 컴포넌트**로, `MapComponentFestival.jsx`와 `MapComponentPet.jsx`의 공통 기능을 포함합니다. 추가적인 기능이나 데이터가 필요할 경우 이 컴포넌트를 확장하여 사용할 수 있습니다.

- **추가 기능**:
    - 기본적인 지도 설정 및 사용자 위치 표시
    - 공통 UI 요소들 (버튼, 모달 등)
    - 추가적인 카테고리나 데이터 관리 가능

### `MapComponentFestival.jsx`

> **축제 정보**를 지도에 표시하는 컴포넌트입니다. 축제 관련 데이터를 로드하고, 축제 마커를 지도에 표시하며, 상세 정보를 오버레이로 제공합니다.

- **고유 상태 변수**:
    - `festivalInfos`: 현재 지도에 표시된 축제 정보 목록.

- **고유 함수**:
    - `fetchFestivalInfo`: 축제 정보를 백엔드 API에서 가져와 마커를 업데이트합니다.
    - `fetchFestivalDetail`: 선택한 축제의 상세 정보를 API에서 가져와 오버레이에 표시합니다.

- **고유 UI 요소**:
    - 축제 목록 모달창 (`persistent-modal` 클래스)
        - 축제 목록을 표시하고, 클릭 시 해당 축제의 위치로 지도 이동 및 오버레이 활성화

- **페이지 네비게이션**:
    - `navigateToPet`: 반려동물 동반 여행지 페이지로 이동

### `MapComponentPet.jsx`

> **반려동물 동반 여행지** 정보를 지도에 표시하는 컴포넌트입니다. 반려동물 관련 데이터를 로드하고, 관련 마커를 지도에 표시하며, 상세 정보를 오버레이로 제공합니다.

- **고유 상태 변수**:
    - `petInfos`: 현재 지도에 표시된 반려동물 동반 여행지 목록.

- **고유 함수**:
    - `fetchPetInfo`: 반려동물 동반 여행지 정보를 백엔드 API에서 가져와 마커를 업데이트합니다.
    - `fetchPetDetail`: 선택한 반려동물 동반 여행지의 상세 정보를 API에서 가져와 오버레이에 표시합니다.

- **고유 UI 요소**:
    - 반려동물 동반 여행지 목록 모달창 (`persistent-modal` 클래스)
        - 반려동물 동반 여행지 목록을 표시하고, 클릭 시 해당 여행지의 위치로 지도 이동 및 오버레이 활성화

- **페이지 네비게이션**:
    - `navigateToFestival`: 축제 페이지로 이동

---

## 주의 사항 및 추가 제안

1. **중복 코드 최소화**:
    - `MapComponentFestival.jsx`와 `MapComponentPet.jsx`는 많은 공통 기능을 가지고 있으므로, 이를 별도의 커스텀 훅이나 공통 컴포넌트로 추출하여 코드 중복을 줄일 수 있습니다.
    - 예를 들어, `useMap` 커스텀 훅을 만들어 지도 초기화, GeoJSON 로드, 오버레이 관리 등을 공통적으로 처리할 수 있습니다.

2. **에러 핸들링 강화**:
    - API 호출 시 발생할 수 있는 다양한 에러를 보다 세분화하여 사용자에게 명확한 피드백을 제공할 수 있습니다.
    - 예를 들어, 네트워크 오류, 데이터 형식 오류 등에 따라 다른 메시지를 표시합니다.

3. **반응형 디자인 고려**:
    - 지도와 UI 요소들이 다양한 화면 크기에서 잘 표시되도록 반응형 디자인을 적용합니다.
    - CSS 미디어 쿼리를 활용하여 버튼 위치나 모달창 크기를 조정할 수 있습니다.

4. **성능 최적화**:
    - 마커가 많아질 경우 클러스터링 기능을 적극 활용하여 지도 렌더링 성능을 최적화합니다.
    - `MarkerClusterer` 라이브러리를 활용하여 마커 클러스터링을 구현할 수 있습니다.

5. **보안 강화**:
    - API 키를 환경 변수로 관리하고, 프론트엔드에 직접 노출되지 않도록 백엔드에서 프록시 서버를 통해 요청을 처리할 수 있습니다.
    - 민감한 정보는 절대 클라이언트 측 코드에 포함시키지 않습니다.

6. **코드 정리 및 유지보수**:
    - 공통적인 기능을 별도의 파일로 분리하여 유지보수를 용이하게 합니다.
    - 예를 들어, GeoJSON 로드, 지도 초기화, 마커 생성 등의 기능을 각각의 모듈로 분리할 수 있습니다.