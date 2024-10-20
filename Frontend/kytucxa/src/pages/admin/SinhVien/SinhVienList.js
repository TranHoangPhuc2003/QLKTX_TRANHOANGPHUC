import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function SinhVienList() {
  const [SinhViens, setSinhViens] = useState([]);
  const [phongs, setPhongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Fetch SinhViens data from the backend
  const getSinhViens = () => {
    axios.get("http://localhost:8080/sinhvien/getAll")
      .then(response => {
        setSinhViens(response.data);
      })
      .catch(error => {
        console.error('Unable to get data:', error);
      });
  };

  // Fetch Phongs data from the backend
  const getPhongs = () => {
    axios.get("http://localhost:8080/phong/getAll")
      .then(response => {
        setPhongs(response.data);
      })
      .catch(error => {
        console.error('Unable to get rooms data:', error);
      });
  };

  // Load selected room from localStorage
  const loadSelectedRooms = () => {
    const savedRooms = JSON.parse(localStorage.getItem('selectedRooms')) || {};
    return savedRooms;
  };

  useEffect(() => {
    getSinhViens();
    getPhongs();
  }, []);

  const [selectedRooms, setSelectedRooms] = useState(loadSelectedRooms());

  // Handle edit button click
  const handleEdit = (id) => {
    navigate(`/admin/SinhVien/edit/${id}`);
  };

  // Handle delete button click with confirmation
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this SinhVien?')) {
      axios.delete(`http://localhost:8080/sinhvien/delete/${id}`)
        .then(() => {
          setSinhViens(SinhViens.filter(SinhVien => SinhVien.maSV !== id));
          toast.success('Xóa sinh viên thành công');
          // Remove room from localStorage
          const updatedRooms = { ...selectedRooms };
          delete updatedRooms[id];
          localStorage.setItem('selectedRooms', JSON.stringify(updatedRooms));
          setSelectedRooms(updatedRooms);
        })
        .catch(error => {
          console.error('Error deleting SinhVien:', error);
          toast.error('Error deleting SinhVien');
        });
    }
  };

  // Handle room registration for a student
  const handleRegisterRoom = (maPhong, maSV) => {
    if (!maPhong) {
      toast.error('Please select a room');
      return;
    }

    axios.post(`http://localhost:8080/phong/dangKyPhong?maPhong=${maPhong}`, { maSV })
      .then(response => {
        // Update selected room for the student
        const updatedRooms = { ...selectedRooms, [maSV]: maPhong };
        setSelectedRooms(updatedRooms);
        localStorage.setItem('selectedRooms', JSON.stringify(updatedRooms));
        toast.success('Đăng ký phòng thành công!');
        getPhongs();
      })
      .catch(error => {
        toast.error('Lỗi khi đăng ký phòng: ' + (error.response?.data || error.message));
      });
  };

  const handleRoiPhong = (sinhVien) => {
    const maPhong = selectedRooms[sinhVien.maSV];

    if (maPhong) {
      axios.post(`http://localhost:8080/phong/roiPhong`, sinhVien, { params: { maPhong } })
        .then(() => {
          const updatedRooms = { ...selectedRooms };
          delete updatedRooms[sinhVien.maSV];
          localStorage.setItem('selectedRooms', JSON.stringify(updatedRooms));
          setSelectedRooms(updatedRooms);
          getPhongs();
          toast.success('Sinh viên đã rời phòng thành công.');
        })
        .catch(error => {
          console.error('Error removing student from room:', error);
          toast.error('Lỗi khi sinh viên rời phòng.');
        });
    } else {
      toast.error('Sinh viên này không có phòng để rời.');
    }
  };

  // Filter SinhViens based on the search query
  const filteredSinhViens = SinhViens.filter(SinhVien =>
    SinhVien.hoTen.toLowerCase().includes(searchQuery.toLowerCase()) ||
    SinhVien.sdt.includes(searchQuery) ||
    SinhVien.ngaySinh.includes(searchQuery) ||
    SinhVien.lop.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Sinh Viên</h2>
      
      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Tìm kiếm sinh viên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link className="btn btn-primary me-1" to="/admin/SinhVien/create" role="button">Thêm sinh viên</Link>
        </div>
      </div>
      
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Số điện thoại</th>
            <th>Ngày sinh</th>
            <th>Lớp</th>
            <th>Phòng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredSinhViens.map(sinhvien => (
            <tr key={sinhvien.maSV}>
              <td>{sinhvien.maSV}</td>
              <td>{sinhvien.hoTen}</td>
              <td>{sinhvien.sdt}</td>
              <td>{new Date(sinhvien.ngaySinh).toLocaleDateString()}</td>
              <td>{sinhvien.lop}</td>
              <td>
                <select 
                  className="form-control" 
                  value={selectedRooms[sinhvien.maSV] || ''} 
                  onChange={(e) => handleRegisterRoom(e.target.value, sinhvien.maSV)}
                >
                  <option value="">Chọn phòng</option>
                  {phongs.map(phong => (
                    <option key={phong.maPhong} value={phong.maPhong}>
                      {phong.tenPhong} ({phong.soNguoiHienTai}/{phong.soNguoi})
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(sinhvien.maSV)}>
                  <i className="fas fa-edit"></i> Sửa
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(sinhvien.maSV)}>
                  <i className="fas fa-trash"></i> Xóa
                </button>
                <button className="btn btn-secondary" onClick={() => handleRoiPhong(sinhvien)}>
                  <i className="fas fa-sign-out-alt"></i> Rời phòng
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
