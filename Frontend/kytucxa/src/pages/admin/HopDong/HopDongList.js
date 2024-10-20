import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function HopDongList() {
  const [hopDongs, setHopDongs] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [studentNames, setStudentNames] = useState({});
  const [roomNames, setRoomNames] = useState({});
  const navigate = useNavigate();

  // Fetch all contract data
  const getHopDongs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/hopdong/getAll");
      console.log(response.data);
      const contracts = Array.isArray(response.data) ? response.data : [];

      // Fetch associated student names and room names
      const studentsResponse = await axios.get("http://localhost:8080/sinhvien/getAll");
      const students = studentsResponse.data.reduce((acc, student) => {
        acc[student.maSV] = student.hoTen;
        return acc;
      }, {});

      const roomsResponse = await axios.get("http://localhost:8080/phong/getAll");
      const rooms = roomsResponse.data.reduce((acc, room) => {
        acc[room.maPhong] = {
          tenPhong: room.tenPhong, 
          giaDien: room.giaDien,  
          giaNuoc: room.giaNuoc 
        };
        return acc;
      }, {});

      // Update states for student, room names, and prices
      setStudentNames(students);
      setRoomNames(rooms);
      setHopDongs(contracts);
    } catch (error) {
      console.error(error);
      toast.error('Không thể tải dữ liệu hợp đồng');
    }
  };

  useEffect(() => {
    getHopDongs();
  }, []);

  // Handle edit button
  const handleEdit = (id) => {
    navigate(`/admin/HopDong/edit/${id}`);
  };

  // Handle delete button with confirmation
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hợp đồng này?')) {
      axios.delete(`http://localhost:8080/hopdong/delete/${id}`)
        .then(() => {
          setHopDongs(hopDongs.filter(hopDong => hopDong.maHopDong !== id));
          toast.success('Hợp đồng đã được xóa thành công!');
        })
        .catch(() => {
          toast.error('Lỗi khi xóa hợp đồng');
        });
    }
  };

  // Handle approve contract and save room's electricity and water price
  const handleApprove = async (id) => {
    const hopDong = hopDongs.find(h => h.maHopDong === id);
    const room = roomNames[hopDong.maPhong];

    if (!room) {
      toast.error('Không tìm thấy thông tin phòng!');
      return;
    }

    if (window.confirm('Bạn có chắc chắn muốn duyệt hợp đồng này?')) {
      try {
        await axios.put(`http://localhost:8080/hopdong/approve/${id}`, {
          maHopDong: id,
          giaDien: room.giaDien,
          giaNuoc: room.giaNuoc,
        });

        const updatedHopDongs = hopDongs.map(hopDong => 
          hopDong.maHopDong === id ? { ...hopDong, tinhTrangDuyet: 'Đã duyệt' } : hopDong
        );
        setHopDongs(updatedHopDongs);
        toast.success('Hợp đồng đã được duyệt thành công!');
      } catch (error) {
        toast.error('Lỗi khi duyệt hợp đồng');
      }
    }
  };

  // Filter contracts based on search query
  const filteredHopDongs = hopDongs.filter(hopDong =>
    hopDong.maSV.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    hopDong.maPhong.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    (hopDong.ngayBatDau && hopDong.ngayBatDau.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (hopDong.giaThuePhong !== undefined && hopDong.giaThuePhong.toString().toLowerCase().includes(searchQuery.toLowerCase())) || 
    (roomNames[hopDong.maPhong]?.giaDien?.toString().toLowerCase().includes(searchQuery.toLowerCase())) || 
    (roomNames[hopDong.maPhong]?.giaNuoc?.toString().toLowerCase().includes(searchQuery.toLowerCase())) || 
    (hopDong.tinhTrangDuyet && hopDong.tinhTrangDuyet.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (studentNames[hopDong.maSV] && studentNames[hopDong.maSV].toLowerCase().includes(searchQuery.toLowerCase())) ||
    (roomNames[hopDong.maPhong] && roomNames[hopDong.maPhong].tenPhong.toLowerCase().includes(searchQuery.toLowerCase())) 
  );

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Danh Sách Hợp Đồng</h2>

      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Tìm kiếm Hợp Đồng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link className="btn btn-primary me-1" to="/admin/HopDong/create" role="button">Thêm hợp đồng</Link>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Sinh Viên</th>
            <th>Tên Phòng</th>
            <th>Ngày Bắt Đầu</th>
            <th>Giá Thuê Phòng</th>
            <th>Giá Điện</th>
            <th>Giá Nước</th>
            <th>Tình Trạng Duyệt</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredHopDongs.map(hopDong => (
            <tr key={hopDong.maHopDong}>
              <td>{hopDong.maHopDong}</td>
              <td>{studentNames[hopDong.maSV] || 'Đang tải...'}</td>
              <td>{roomNames[hopDong.maPhong]?.tenPhong || 'Đang tải...'}</td>
              <td>{new Date(hopDong.ngayBatDau).toLocaleDateString()}</td>
              <td>{hopDong.giaThuePhong.toLocaleString()} VNĐ</td>
              <td>{roomNames[hopDong.maPhong]?.giaDien?.toLocaleString() || 'Đang tải...'} VNĐ</td>
              <td>{roomNames[hopDong.maPhong]?.giaNuoc?.toLocaleString() || 'Đang tải...'} VNĐ</td>
              <td>{hopDong.tinhTrangDuyet}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(hopDong.maHopDong)}>
                  <i className="fas fa-edit"></i>
                  Sửa
                </button>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(hopDong.maHopDong)}>
                  <i className="fas fa-trash"></i>
                  Xóa
                </button>
                {hopDong.tinhTrangDuyet === 'Chưa duyệt' && (
                  <button className="btn btn-success" onClick={() => handleApprove(hopDong.maHopDong)}>
                    <i className="fas fa-check"></i>
                    Duyệt
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
