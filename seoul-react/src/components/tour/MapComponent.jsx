// src/components/tour/MapComponent.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './MapComponent.css';

function MapComponent() {
  const [cat1, setCat1] = useState('');
  const [modalData, setModalData] = useState(null);
  const [seoulGeoJSON, setSeoulGeoJSON] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false); // 지도 로드 상태

  // useRef 훅을 사용하여 변수 관리
  const mapRef = useRef(null);
  const overlayRef = useRef(null);
  const markersRef = useRef([]);
  const seoulPolygonsRef = useRef([]);
  const idleListenerRef = useRef(null); // Ref to store the idle listener

  const cat1Options = [
    { code: 'A01', name: '자연' },
    { code: 'A02', name: '인문(문화/예술/역사)' },
    { code: 'A03', name: '레포츠' },
    { code: 'A04', name: '쇼핑' },
    { code: 'A05', name: '음식' },
    { code: 'B02', name: '숙박' },
    { code: 'C01', name: '추천코스' },
  ];

  // GeoJSON 파일 로드
  useEffect(() => {
    const loadGeoJSON = async () => {
      try {
        const response = await fetch('/seoulGeoJSON.geojson'); // public 폴더의 GeoJSON 파일 경로
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSeoulGeoJSON(data);
        console.log('GeoJSON 데이터 로드 성공:', data);
      } catch (error) {
        console.error('GeoJSON 로드 중 오류 발생:', error);
      }
    };

    loadGeoJSON();
  }, []);

  // 관광지 정보 가져오기 함수 (map의 중심 좌표 기준)
  const fetchTourInfo = async (centerLat, centerLng) => {
    try {
      const response = await axios.get('http://localhost:9002/seoul/tour/nearby', {
        params: {
          latitude: centerLat,
          longitude: centerLng,
          radius: 0.5,
          cat1: cat1 || null,
        },
      });
      console.log('Tour info data:', response.data);

      // 기존 마커 제거
      markersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
      markersRef.current = [];

      // 새로운 마커 추가
      response.data.forEach((tourInfo) => {
        const position = new window.kakao.maps.LatLng(tourInfo.mapY, tourInfo.mapX);
        const marker = new window.kakao.maps.Marker({
          position: position,
          map: mapRef.current,
          zIndex: 2,
        });

        markersRef.current.push(marker);

        // 마커에 마우스 오버 이벤트 등록
        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          const content = `<div class="customoverlay">${tourInfo.title}</div>`;
          overlayRef.current.setContent(content);
          overlayRef.current.setPosition(marker.getPosition());
          overlayRef.current.setZIndex(1);
          overlayRef.current.setMap(mapRef.current);
        });

        // 마커에 마우스 아웃 이벤트 등록
        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          overlayRef.current.setMap(null);
        });

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          console.log('Modal data:', tourInfo);
          setModalData(tourInfo);
          overlayRef.current.setMap(null);
        });
      });
    } catch (error) {
      console.error('Error fetching tour info:', error);
    }
  };

  // Kakao Maps 스크립트 로드 및 지도 초기화
  useEffect(() => {
    const loadMap = () => {
      // 이미 Kakao Maps 스크립트가 로드되어 있다면 초기화만 수행
      if (window.kakao && window.kakao.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_KEY}&libraries=services,clusterer,drawing`;
      script.async = true;

      script.onload = () => {
        console.log('Kakao Maps 스크립트 로드 성공');
        initializeMap();
      };

      script.onerror = () => {
        console.error('Kakao Map script failed to load');
        alert('지도를 불러오지 못했습니다.');
      };

      document.head.appendChild(script);
    };

    const initializeMap = () => {
      const kakao = window.kakao;

      // 위치 정보 요청 및 지도 초기화
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setupMap(lat, lng);
          },
          function (error) {
            console.error('Error getting location:', error);
            alert('위치 정보를 가져올 수 없어 기본 위치로 표시합니다.');
            setupMap(37.5665, 126.9780); // 서울 기본 위치
          }
        );
      } else {
        alert('GPS를 지원하지 않습니다');
        setupMap(37.5665, 126.9780); // 서울 기본 위치
      }
    };

    const setupMap = (lat, lng) => {
      const kakao = window.kakao;
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3, // 지도 확대 수준
      };
      mapRef.current = new kakao.maps.Map(container, options);

      // 현재 위치 마커 표시
      const markerPosition = new kakao.maps.LatLng(lat, lng);
      const userMarker = new kakao.maps.Marker({
        position: markerPosition,
        zIndex: 3,
      });
      userMarker.setMap(mapRef.current);

      // 현재 위치 오버레이
      const content = `<div class="useroverlay">현재 내 위치</div>`;

      const userOverlay = new kakao.maps.CustomOverlay({
        content: content,
        map: mapRef.current,
        position: userMarker.getPosition(),
        yAnchor: 1,
        zIndex: 3,
      });

      // 전역 오버레이 생성
      overlayRef.current = new kakao.maps.CustomOverlay({
        yAnchor: 1,
        zIndex: 1,
      });
      overlayRef.current.setMap(null);

      setIsMapLoaded(true); // 지도 로드 완료
      console.log('지도 초기화 완료');
    };

    loadMap();
  }, []); // 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행

  // GeoJSON 데이터와 지도가 모두 로드되면 폴리곤 생성
  useEffect(() => {
    if (seoulGeoJSON && isMapLoaded && mapRef.current) {
      createSeoulPolygon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seoulGeoJSON, isMapLoaded]);

  // 서울 경계선 폴리곤 생성 함수 (단일 선언)
  const createSeoulPolygon = () => {
    const kakao = window.kakao;
    console.log('seoulGeoJSON:', seoulGeoJSON);
    const polygons = [];

    // GeoJSON 파일이 제대로 로드되었는지 확인
    if (!seoulGeoJSON || !seoulGeoJSON.features || seoulGeoJSON.features.length === 0) {
      console.error('Invalid GeoJSON data');
      return;
    }

    // GeoJSON의 각 피처를 순회하여 폴리곤 생성
    seoulGeoJSON.features.forEach((feature) => {
      const { geometry } = feature;
      const { type, coordinates } = geometry;

      if (type === 'Polygon') {
        const path = coordinates[0].map(
          (coord) => new kakao.maps.LatLng(coord[1], coord[0]) // [lat, lng]
        );

        const polygon = new kakao.maps.Polygon({
          map: mapRef.current,
          path: path,
          strokeWeight: 5, // 굵은 경계선
          strokeColor: '#0000FF', // 경계선 색상 (파란색)
          fillColor: 'rgba(0, 0, 255, 0.1)', // 약간의 채우기 (투명 파란색)
          strokeOpacity: 1,
          zIndex: 10, // 다른 요소들 위에 표시
        });

        polygons.push(polygon);
      } else if (type === 'MultiPolygon') {
        coordinates.forEach((polygonCoords) => {
          const path = polygonCoords[0].map(
            (coord) => new kakao.maps.LatLng(coord[1], coord[0]) // [lat, lng]
          );

          const polygon = new kakao.maps.Polygon({
            map: mapRef.current,
            path: path,
            strokeWeight: 5, // 굵은 경계선
            strokeColor: '#0000FF', // 경계선 색상 (파란색)
            fillColor: 'rgba(0, 0, 255, 0.1)', // 약간의 채우기 (투명 파란색)
            strokeOpacity: 1,
            zIndex: 10, // 다른 요소들 위에 표시
          });

          polygons.push(polygon);
        });
      }
    });

    // 기존 서울 폴리곤 제거 (필요 시)
    seoulPolygonsRef.current.forEach((polygon) => polygon.setMap(null));
    seoulPolygonsRef.current = polygons;
    console.log('서울 경계선 폴리곤 생성 완료');
  };

  // 지도 이동 시 관광지 정보 업데이트
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    const kakao = window.kakao;

    // 지도 이동 완료 이벤트 리스너 추가
    const addIdleListener = () => {
      const listener = kakao.maps.event.addListener(mapRef.current, 'idle', () => {
        const center = mapRef.current.getCenter();
        const centerLat = center.getLat();
        const centerLng = center.getLng();
        fetchTourInfo(centerLat, centerLng);
      });

      // listener ref 저장
      idleListenerRef.current = listener;
      console.log('Added idle listener:', listener);
    };

    // listener 추가
    addIdleListener();

    // 클린업 함수: 이벤트 리스너 제거
    return () => {
      if (idleListenerRef.current) {
        kakao.maps.event.removeListener(idleListenerRef.current);
        console.log('Removed idle listener:', idleListenerRef.current);
        idleListenerRef.current = null;
      }
    };
  }, [cat1, isMapLoaded]); // cat1 변경 시에도 리스너가 제대로 동작하도록 의존성 설정

  // 카테고리 변경 시 관광지 정보 업데이트
  useEffect(() => {
    if (!isMapLoaded || !mapRef.current) return;

    const kakao = window.kakao;

    // 지도 중심 좌표 가져오기
    const center = mapRef.current.getCenter();
    const centerLat = center.getLat();
    const centerLng = center.getLng();

    // 관광지 정보 가져오기
    fetchTourInfo(centerLat, centerLng);
  }, [cat1, isMapLoaded]); // cat1 변경 시 관광지 정보 업데이트

  // 모달 닫기 함수
  const closeModal = () => {
    setModalData(null);
    // 오버레이 숨기기
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
    }
  };

  return (
    <div>
      {/* 카테고리 필터 UI */}
      <div style={{ marginBottom: '10px' }}>
        <select value={cat1} onChange={(e) => setCat1(e.target.value)}>
          <option value="">대분류 선택</option>
          {cat1Options.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      {/* 지도 표시 */}
      <div
        id="map"
        style={{ width: '100%', height: '96vh', marginTop: '10px' }}
      ></div>

      {/* 모달 컴포넌트 */}
      {modalData && (
        <div className="modal" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{modalData.title}</h2>
            {modalData.imageUrl ? (
              <img
                src={modalData.imageUrl}
                alt={modalData.title}
                style={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'path/to/default-image.jpg'; // 대체 이미지 경로
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                }}
              >
                <p style={{ textAlign: 'center', lineHeight: '300px' }}>
                  이미지가 없습니다.
                </p>
              </div>
            )}
            {/* 추가 정보 표시 가능 */}
          </div>
        </div>
      )}
    </div>
  );
}

export default MapComponent;
