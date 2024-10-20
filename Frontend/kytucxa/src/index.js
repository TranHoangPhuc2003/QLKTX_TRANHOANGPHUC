import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import SinhVienList from './pages/admin/SinhVien/SinhVienList';
import SinhVienForm from './pages/admin/SinhVien/SinhVienForm';
import HopDongList from './pages/admin/HopDong/HopDongList';
import HopDongCreate from './pages/admin/HopDong/HopDongCreate';
import HopDongEdit from './pages/admin/HopDong/HopDongEdit';
import HoaDonList from './pages/admin/HoaDon/HoaDonList';
import HoaDonCreate from './pages/admin/HoaDon/HoaDonCreate';
import PhongList from './pages/admin/Phong/PhongList';
import PhongCreate from './pages/admin/Phong/PhongCreate';
import PhongEdit from './pages/admin/Phong/PhongEdit';
import './App.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <div className="main-content">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="sidebar">
    <div className="admin-profile">
      <img src="/HoangPhuc.jpg" alt="Admin" className="admin-icon" />
      <h3 className="admin-name">THP - Quản lý ký túc xá</h3>
    </div>
    <ul>
    <li>
        <Link to="/admin/Phong">
          <i className="fas fa-door-open"></i>
          Quản lý phòng ký túc xá
        </Link>
      </li>
      <li>
        <Link to="/admin/SinhVien">
          <i className="fas fa-users"></i>
          Quản lý sinh viên
        </Link>
      </li>
      <li>
        <Link to="/admin/HopDong">
          <i className="fas fa-file-alt"></i>
          Quản lý hợp đồng
        </Link>
      </li>
      <li>
        <Link to="/admin/HoaDon">
          <i className="fas fa-receipt"></i>
          Quản lý hóa đơn
        </Link>
      </li>
    </ul>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/SinhVien" element={<SinhVienList />} />
          <Route path="/admin/SinhVien/create" element={<SinhVienForm />} />
          <Route path="/admin/SinhVien/edit/:id" element={<SinhVienForm />} />
          <Route path="/admin/HopDong" element={<HopDongList />} />
          <Route path="/admin/HopDong/create" element={<HopDongCreate />} />
          <Route path="/admin/HopDong/edit/:id" element={<HopDongEdit />} />
          <Route path="/admin/HoaDon" element={<HoaDonList />} />
          <Route path="/admin/HoaDon/create" element={<HoaDonCreate />} />
          <Route path="/admin/Phong" element={<PhongList />} />
          <Route path="/admin/Phong/create" element={<PhongCreate />} />
          <Route path="/admin/Phong/edit/:id" element={<PhongEdit />} />
        </Routes>
      </Layout>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
