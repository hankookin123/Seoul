import { useEffect, useState, useRef } from 'react';
import { MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk"; // CustomOverlayMap 제거
import SideTab from '../common/SideTab';
import CommonMap from '../common/CommonMap';
import axios from 'axios';
import styles from '../../assets/css/education/EduMain.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    // 페이지 그룹 관련 변수 설정
    const pageSize = 5;
    const totalGroups = Math.ceil(totalPages / pageSize);
    const currentGroup = Math.ceil(currentPage / pageSize);
    const startPage = (currentGroup - 1) * pageSize + 1;
    const endPage = Math.min(startPage + pageSize - 1, totalPages);

    // 페이지 번호 버튼 렌더링
    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <button
                key={i}
                className={`${styles.pageButton} ${currentPage === i ? styles.activePage : ''}`}
                onClick={() => onPageChange(i)}
                disabled={currentPage === i}
            >
                {i}
            </button>
        );
    }

    return (
        <div className={styles.pagination}>
            {/* 이전 그룹으로 이동 */}
            {currentGroup > 1 && (
                <button
                    className={styles.pageButton}
                    onClick={() => onPageChange((currentGroup - 2) * pageSize + 1)}
                >
                    &lt;&lt;
                </button>
            )}
            {/* 이전 페이지로 이동 */}
            <button
                className={styles.pageButton}
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>
            {/* 페이지 번호 버튼 */}
            {pageButtons}
            {/* 다음 페이지로 이동 */}
            <button
                className={styles.pageButton}
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
            {/* 다음 그룹으로 이동 */}
            {currentGroup < totalGroups && (
                <button
                    className={styles.pageButton}
                    onClick={() => onPageChange(currentGroup * pageSize + 1)}
                >
                    &gt;&gt;
                </button>
            )}
        </div>
    );
};

function KindergartenList({ results, error, page, setPage, totalPages, fetchData, query, areas, onSelect }) {

    // 페이지 변경 핸들러
    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchData(query, areas, newPage);
    };

    return (
        <div className={styles.kinderResultListBox}>
            <h3>조회 결과 : {results.total || 0}건</h3>
            {error && <div className={styles.error}>{error}</div>}
            {results.items && results.items.length > 0 ? (
                <div className={styles.kinderResultPageing}>
                    <ul className={styles.kinderResultList}>
                        {results.items.map((item, index) => (
                            <li
                                key={index} 
                                className={styles.resultItem}
                                onClick={() => onSelect(item)}
                            >
                                <h4>{item.kindergarten_name}</h4>
                                <p>{item.address}</p>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.footPage}>
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            ) : (
                <p>조회 결과가 없습니다.</p>
            )}
        </div>
    );
}

function EduSearchBox({ onSearch, selectedItems, setSelectedItems, error, query, setQuery, setResults, setError }){

    const options = [
        "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구",
        "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구",
        "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구",
        "은평구", "종로구", "중구", "중랑구",
    ];

    const handleSelect = (event) => {
        const value = event.target.value;
        if (selectedItems.includes(value)) {
            alert("이미 선택된 항목입니다.");
            return;
        }
        if (selectedItems.length >= 4) {
            alert("최대 4개까지 선택할 수 있습니다.");
            return;
        }
        const updatedItems = [...selectedItems, value];
        setSelectedItems(updatedItems);
        onSearch(query, updatedItems);
    };

    const handleRemove = (item) => {
        const updatedItems = selectedItems.filter((selected) => selected !== item);
        setSelectedItems(updatedItems);
        if (updatedItems.length === 0) {
            // 선택된 지역이 없을 때 결과 초기화 및 에러 메시지 설정
            setResults({
                items: [],
                total: 0,
                searchVO: {
                    totPage: 1,
                },
            });
            setError("지역선택 또는 검색어를 입력하세요.");
        } else if (query !== "") {
            // 남아있는 지역이 있고 검색어가 존재할 때 검색 결과 갱신
            onSearch(query, updatedItems);
            setError(""); // 에러 메시지 초기화
        }
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(query, selectedItems); // handleSearch에서 페이지를 1로 초기화함
    };
    
    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <div className={styles.searchBox}>
            <div className={styles.searchLine}>
                <form onSubmit={handleSubmit}>
                    <select onChange={handleSelect} value="">
                        <option value="" disabled>지역선택</option>
                        {options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className={styles.searchInput}
                        name="searchQuery"
                        id="searchQuery"
                        placeholder="유치원 검색"
                        value={query}
                        onChange={handleQueryChange}
                    />
                    <input className={styles.searchBtn} type="submit" value="검색" />
                </form>
            </div>
            <div className={styles.selectedItems}>
                {selectedItems.map((item, index) => (
                    <div key={index} className={styles.selectedItem}>
                        {item}
                        <button
                            type="button"
                            className={styles.removeButton}
                            onClick={() => handleRemove(item)}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
            {error && <div className={styles.error}>{error}</div>}
        </div>
    );
}

function Infotab({ kinderInfo }) {

    const smallTitle = [
        "전화번호","운영시간","대표자명","원장명","설립일","개원일",
        "관할기관","주소","홈페이지"
    ]
    console.log("kinderInfo.tel 인포함수", kinderInfo.tel);
    return <>
        <div className={styles.infoBackground}>
            <div className={styles.infoBaseBox}>
                <div className={styles.infoBaseTitle}>
                    <h5 className={styles.semiTitle}>기본정보</h5>
                    <ul className={styles.infoBaseUl}>
                        <li className={styles.infoBaseLi}>
                            <i>전화번호</i>
                            <span>{kinderInfo.tel}</span>
                        </li>
                        <li className={styles.infoBaseLi}>
                            <i>운영시간</i>
                            <span>{kinderInfo.operating_hours}</span>
                        </li>
                        <li className={styles.infoBaseLi}>
                            <i>대표자명</i>
                            <span>{kinderInfo.hearder}</span>
                        </li>
                        <li className={styles.infoBaseLi}>
                            <i>원장명</i>
                            <span>{kinderInfo.director}</span>
                        </li>
                        <li className={styles.infoBaseLi}>
                            <i>설립일</i>
                            <span>{kinderInfo.birth}</span>
                        </li>
                        <li className={styles.infoBaseLi}>
                            <i>개원일</i>
                            <span>{kinderInfo.start}</span>
                        </li>
                        <li className={styles.infoBaseLi}>
                            <i>관할기관</i>
                            <span>{kinderInfo.office_education}</span>
                        </li>
                        <li className={styles.infoBaseLi}>
                            <i>주소</i>
                            <span>{kinderInfo.address}</span>
                        </li>
                        <li className={styles.infoBaseLi}>
                            <i>홈페이지</i>
                            <span>{kinderInfo.home_page}</span>
                        </li>
                    </ul>
                </div>
                <div className={styles.infoBaseTitle}>
                    <h5>통학차량</h5>
                    <span>{kinderInfo.car_check}</span>
                </div>
                <div className={styles.infoBaseTitle}>
                    <h5>제공서비스</h5>
                    <ul>
                        <li className={styles.infoBaseLi}></li>
                    </ul>
                </div>
            </div>
        </div>
    </>
}

function EducationMain() {
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const educationCategories = ["유치원", "키즈카페", "유원시설"];
    const [currentTabType, setCurrentTabType] = useState([true, false, false]);

    const [query, setQuery] = useState("");
    const [areas, setAreas] = useState([]);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [results, setResults] = useState({
        items: [],
        total: 0,
        searchVO: {
            totPage: 1
        }
    });
    const [selectedKinderInfo, setselectedKinderInfo] = useState([])
    

    const fetchData = async (query, areas, page = 1) => {
        try {
            const response = await axios.get('http://localhost:9002/seoul/education/eduGardenSearch', {
                params: {
                    query,
                    areas: areas.join(","),
                    page,
                },
            });
            setResults(response.data);
            
            // 마커 생성
            const multiMarker = response.data.items
            .map((item, index) => ({
                position: {
                    lat: parseFloat(item.y_coordinate),
                    lng: parseFloat(item.x_coordinate)
                },
                content: item.kindergarten_name || "오류",
                category: item.address || "오류",
                index: index
            }));
            setMarkers(multiMarker);
            //0번 마커로 이동
            if (multiMarker.length > 0) {
                const firstMarker = multiMarker[0].position;
                if (mapRef.current) {
                    const center = new window.kakao.maps.LatLng(firstMarker.lat, firstMarker.lng);
                    mapRef.current.setCenter(center);
                }
            };
            setError("");
        } catch (err) {
            console.error("데이터 로드 오류:", err);
            setError("데이터 불러오기 중 오류 발생");
        }
    };

    const handleSearch = (searchQuery, selectedAreas) => {
        setQuery(searchQuery);
        setAreas(selectedAreas);
        setPage(1);
        fetchData(searchQuery, selectedAreas, 1);
    };

    useEffect(() => {
        if (areas.length > 0 || query) {
            fetchData(query, areas, page);
        }
    }, [query, areas, page]);

    const kinderinfo = async (marker) => {
        try {
            const response = await axios.get('http://localhost:9002/seoul/education/eduKinderInfo',{
                params: {
                    kinderName: marker.content,
                    kinderAddress: marker.category,
                },
            });
            setselectedKinderInfo(response.data);
            setError("");
        } catch (err) {
            console.error("데이터 로드 오류:", err);
            setError("데이터 불러오기 중 오류 발생");
        }
    }
    const selectKinderInfo = async (item) => {
        try {
            const response = await axios.get('http://localhost:9002/seoul/education/eduKinderInfo', {
                params: {
                    kinderName: item.kindergarten_name,
                    kinderAddress: item.address,
                },
            });
            console.log("item.kindergarten_name",item.kindergarten_name);
            console.log("item.address",item.address);
            setselectedKinderInfo(response.data);
            console.log("스프링 데이터 address", selectedKinderInfo.address);
            setError("");
        } catch (err) {
            console.error("데이터 로드 오류:", err);
            setError("데이터 불러오기 중 오류 발생");
        }
    }
    

    return (
        <div className={styles.educationContainer}>
            <CommonMap 
                setMap={(map) => { mapRef.current = map; }} 
                mapLevel={4}
                // onClick 제거 (오버레이 관련)
                
            >
                {markers.map((marker, index) => (
                    <div
                        key={`marker-container-${index}`}
                        className={`${styles.markerContainer} marker-container-${index}`}
                    >
                    <MapMarker
                        key={`marker-${index}`}
                        className={styles.markerSet}
                        position={marker.position}
                        clickable={true}
                    />
                    <CustomOverlayMap
                        className={styles.customO}
                        position={marker.position}
                    >
                        <div
                            className={styles.markerInfo}
                            onClick={() => kinderinfo(marker)}
                        >
                            <h4>{marker.content}</h4>
                            <p>{marker.category}</p>
                        </div>
                    </CustomOverlayMap>
                </div>
                ))}
            </CommonMap>
            {selectedKinderInfo && (<Infotab kinderInfo={selectedKinderInfo} />)}
            <SideTab>
                <div className={styles.educationTab}>
                    {educationCategories.map((category, index) => (
                        <div
                            key={category}
                            className={`${styles.tab} ${currentTabType[index] ? styles.active : ''}`}
                            onClick={() => {
                                const newTabType = Array(educationCategories.length).fill(false);
                                newTabType[index] = true;
                                setCurrentTabType(newTabType);
                            }}
                        >
                            {category}
                        </div>
                    ))}
                </div>
                <div className={styles.searchBox}>
                    <EduSearchBox
                        onSearch={handleSearch}
                        selectedItems={areas}
                        setSelectedItems={setAreas}
                        query={query}
                        setQuery={setQuery}
                        setResults={setResults}
                        setError={setError}
                    /><br/>
                    <KindergartenList 
                        results={results} 
                        error={error} 
                        page={page}
                        setPage={setPage}
                        totalPages={results.searchVO.totPage}
                        fetchData={fetchData}
                        query={query}
                        areas={areas}
                        onSelect={selectKinderInfo}
                    />
                </div>
            </SideTab>
        </div>
    );
}

export default EducationMain;
