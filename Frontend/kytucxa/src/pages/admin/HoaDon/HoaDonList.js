import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function HoaDonList() {
  const [hoaDons, setHoaDons] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [roomNames, setRoomNames] = useState({});
  const navigate = useNavigate();

  // Fetch all bill data and associated room names
  const getHoaDons = async () => {
    try {
      const response = await axios.get("http://localhost:8080/hoadon/getAll");
      const bills = response.data;

      // Fetch associated room names
      const roomsResponse = await axios.get("http://localhost:8080/phong/getAll");
      const rooms = roomsResponse.data.reduce((acc, room) => {
        acc[room.maPhong] = {
          tenPhong: room.tenPhong,
          csCuDien: room.csCuDien,  
          csCuNuoc: room.csCuNuoc, 
          donGiaPhong: room.giaThuePhong,
          giaDien: room.giaDien, 
          giaNuoc: room.giaNuoc, 
          soNguoi: room.soNguoi,
        };
        return acc;
      }, {});

      // Map bills to include price data and calculate total rent based on number of people
      const updatedBills = bills.map(bill => {
        const room = rooms[bill.maPhong] || {};
        const totalRent = room.donGiaPhong * (room.soNguoi || 0); 

        return {
          ...bill,
          giaDien: room.giaDien || 0,
          giaNuoc: room.giaNuoc || 0, 
          donGiaPhong: room.donGiaPhong || 0,
          tongTien: bill.tongTien || totalRent + (bill.csMoiDien - room.csCuDien) * room.giaDien + (bill.csMoiNuoc - room.csCuNuoc) * room.giaNuoc // Calculate total amount
        };
      });

      // Update states for room names and bills
      setRoomNames(rooms);
      setHoaDons(updatedBills);
    } catch (error) {
      toast.error('Không thể tải dữ liệu hóa đơn');
    }
  };

  useEffect(() => {
    getHoaDons();
  }, []);

  // Handle edit button
  const handleEdit = (id) => {
    navigate(`/admin/HoaDon/edit/${id}`);
  };

  // Handle delete button with confirmation
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa hóa đơn này?')) {
      axios.delete(`http://localhost:8080/hoadon/delete/${id}`)
        .then(() => {
          setHoaDons(hoaDons.filter(hoaDon => hoaDon.maHD !== id));
          toast.success('Hóa đơn đã được xóa thành công!');
        })
        .catch(() => {
          toast.error('Lỗi khi xóa hóa đơn');
        });
    }
  };

  // Handle approve button
  const handleApprove = async (id) => {
    const hoaDon = hoaDons.find(h => h.maHD === id);
    const room = roomNames[hoaDon.maPhong];

    if (!room) {
      toast.error('Không tìm thấy thông tin phòng!');
      return;
    }

    if (window.confirm('Bạn có chắc chắn muốn thanh toán hóa đơn này?')) {
      try {
        const response = await axios.put(`http://localhost:8080/hoadon/approve/${id}`, {
          maHD: id,
          donGiaDien: room.giaDien,
          donGiaNuoc: room.giaNuoc,
        });

        // Update the bill list with the new status
        const updatedHoaDons = hoaDons.map(h => 
          h.maHD === id ? { ...h, tinhTrang: 'Đã thanh toán' } : h
        );

        setHoaDons(updatedHoaDons);
        toast.success(response.data);
      } catch (error) {
        toast.error('Lỗi khi duyệt hóa đơn: ' + (error.response?.data || error.message));
      }
    }
  };

  // Filter bills based on search query
  const filteredHoaDons = hoaDons.filter(hoaDon =>
    (hoaDon.maHD.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
    (hoaDon.thang && hoaDon.thang.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (roomNames[hoaDon.maPhong]?.tenPhong.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (hoaDon.tongTien && hoaDon.tongTien.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
    (hoaDon.tinhTrang && hoaDon.tinhTrang.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Danh Sách Hóa Đơn</h2>

      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Tìm kiếm Hóa Đơn..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link className="btn btn-primary me-1" to="/admin/HoaDon/create" role="button">Tạo Hóa Đơn</Link>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Phòng</th>
            <th>Tháng</th>
            <th>CS Cũ Điện</th>
            <th>CS Mới Điện</th>
            <th>Đơn Giá Điện</th>
            <th>CS Cũ Nước</th>
            <th>CS Mới Nước</th>
            <th>Đơn Giá Nước</th>
            <th>Đơn Giá Phòng/1N</th>
            <th>Ngày Lập</th>
            <th>Tổng Tiền</th>
            <th>Tình Trạng</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {filteredHoaDons.map(hoaDon => (
            <tr key={hoaDon.maHD}>
              <td>{hoaDon.maHD}</td>
              <td>{roomNames[hoaDon.maPhong]?.tenPhong || 'Đang tải...'}</td>
              <td>{new Date(hoaDon.thang).toLocaleDateString()}</td>
              <td>{roomNames[hoaDon.maPhong]?.csCuDien || 'Đang tải...'}</td>
              <td>{hoaDon.csMoiDien || 'Đang tải...'}</td>
              <td>{hoaDon.giaDien !== undefined ? hoaDon.giaDien : 'Đang tải...'}</td>
              <td>{roomNames[hoaDon.maPhong]?.csCuNuoc || 'Đang tải...'}</td>
              <td>{hoaDon.csMoiNuoc || 'Đang tải...'}</td>
              <td>{hoaDon.giaNuoc !== undefined ? hoaDon.giaNuoc : 'Đang tải...'}</td>
              <td>{roomNames[hoaDon.maPhong]?.donGiaPhong !== undefined ? roomNames[hoaDon.maPhong]?.donGiaPhong : 'Đang tải...'}</td>
              <td>{new Date(hoaDon.ngayLap).toLocaleDateString()}</td>
              <td>{hoaDon.tongTien || 'Đang tải...'}</td>
              <td>{hoaDon.tinhTrang}</td>
              <td>
                <button className="btn btn-danger me-2" onClick={() => handleDelete(hoaDon.maHD)}>
                  <i className="fas fa-trash"></i>
                  Xóa
                </button>
                {hoaDon.tinhTrang === 'Chưa thanh toán' && ( 
                  <button className="btn btn-success" onClick={() => handleApprove(hoaDon.maHD)}>
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
