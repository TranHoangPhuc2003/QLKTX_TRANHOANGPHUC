import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function PhongList() {
  const [phongs, setPhongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const getPhongs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/phong/getAll");
      setPhongs(response.data);
      updateRoomStatus(response.data);
    } catch (error) {
      toast.error('Không thể tải dữ liệu phòng');
    }
  };

  useEffect(() => {
    getPhongs();
    const interval = setInterval(getPhongs, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateRoomStatus = (roomData) => {
    const updates = roomData.map(phong => {
      if (phong.soNguoiHienTai >= phong.soNguoi) {
        return { id: phong.maPhong, status: 'Đã đầy' };
      } else {
        return { id: phong.maPhong, status: 'Còn trống' };
      }
    });

    updates.forEach(update => updateStatus(update.id, update.status));
  };

  const updateStatus = (id, status) => {
    setPhongs(prevPhongs => 
      prevPhongs.map(p => p.maPhong === id ? { ...p, tinhTrang: status } : p)
    );

    axios.put(`http://localhost:8080/phong/updateStatus/${id}`, { tinhTrang: status })
      .then(response => {
        toast.success(response.data);
      })
      .catch(error => {
        console.error('Error updating room status:', error);
      });
  };

  const handleEdit = (id) => {
    navigate(`/admin/Phong/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phòng này?')) {
      axios.delete(`http://localhost:8080/phong/delete/${id}`)
        .then(() => {
          setPhongs(phongs.filter(phong => phong.maPhong !== id));
          toast.success('Phòng đã được xóa thành công!');
        })
        .catch(() => {
          toast.error('Lỗi khi xóa phòng');
        });
    }
  };

  const handleApprove = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn duyệt phòng này?')) {
      try {
        const response = await axios.put(`http://localhost:8080/phong/approve/${id}`);
        const updatedPhongs = phongs.map(phong => 
          phong.maPhong === id ? { ...phong, tinhTrang: 'Đã duyệt' } : phong
        );
        setPhongs(updatedPhongs);
        toast.success(response.data);
      } catch (error) {
        toast.error('Lỗi khi duyệt phòng: ' + (error.response?.data || error.message));
      }
    }
  };

  const filteredPhongs = phongs.filter(phong =>
    phong.tenPhong.toLowerCase().includes(searchQuery.toLowerCase()) ||
    phong.tinhTrang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Danh Sách Phòng</h2>

      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Tìm kiếm Phòng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link className="btn btn-primary me-1" to="/admin/Phong/create" role="button">Tạo Phòng</Link>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID Phòng</th>
            <th>Tên Loại Phòng</th>
            <th>Tên Phòng</th>
            <th>Số Người</th>
            <th>Giá Thuê Phòng/1N</th>
            <th>Giá Điện</th>
            <th>Giá Nước</th>
            <th>CS Cũ Điện</th>
            <th>CS Cũ Nước</th>
            <th>Tình Trạng</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredPhongs.map(phong => (
            <tr key={phong.maPhong}>
              <td>{phong.maPhong}</td>
              <td>{phong.tenLoaiPhong}</td>
              <td>{phong.tenPhong}</td>
              <td>{phong.soNguoiHienTai}/{phong.soNguoi}</td>
              <td>{phong.giaThuePhong}</td>
              <td>{phong.giaDien}</td>
              <td>{phong.giaNuoc}</td>
              <td>{phong.csCuDien}</td>
              <td>{phong.csCuNuoc}</td>
              <td>{phong.tinhTrang}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(phong.maPhong)}>
                  <i className="fas fa-edit"></i> Sửa
                </button>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(phong.maPhong)}>
                  <i className="fas fa-trash"></i> Xóa
                </button>
                {phong.tinhTrang === 'Chưa duyệt' && (
                  <button className="btn btn-success" onClick={() => handleApprove(phong.maPhong)}>
                    <i className="fas fa-check"></i> Duyệt
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
