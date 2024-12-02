// 공통 CSS
import './assets/css/main/App.css';
// React Router Setting
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

// Component
import Home from "./components/main/Home";
import MainLayout from "./components/main/MainLayout";

// Culture Component
import CultureMain from "./components/culture/CultureMain";
import HealthMain from './components/health/HealthMain';
import EducationMain from './components/education/EducationMain';


function App() {
  const menuNames = [ '어린이', '문화', '체육', '환경', '건강', '관광' ];
  const addressNames = [ 'education', 'culture', 'exercise', 'environment', 'health', 'tour' ];

  return (
    <BrowserRouter>
      <div className="App">
        <MainLayout menuNames={ menuNames } addressNames={ addressNames }>
          <Routes>
            <Route path="/" element={<Navigate to="/seoul" />} />
            <Route path="/seoul" element={ <Home menuNames={ menuNames } addressNames={ addressNames } /> }></Route>
            <Route path="/seoul/culture" element={ <CultureMain /> }></Route>
            <Route path="/seoul/education" element={ <EducationMain /> }></Route>
            <Route path="/seoul/health" element={ <HealthMain /> }></Route>
          </Routes>
        </MainLayout>
      </div>
    </BrowserRouter>
  );
}

export default App;
