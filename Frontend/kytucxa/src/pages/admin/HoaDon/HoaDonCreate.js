import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HoaDonCreate = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [availableRooms, setAvailableRooms] = useState([]);

  // Fetch list of all rooms on component mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsResponse = await axios.get('http://localhost:8080/phong/getAll');
        setAvailableRooms(roomsResponse.data);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu phòng: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Handle room selection and fetch room details
  const handleRoomChange = async (event) => {
    const selectedRoomId = event.target.value;
    if (selectedRoomId) {
      try {
        const roomResponse = await axios.get(`http://localhost:8080/phong/getById/${selectedRoomId}`);
        const room = roomResponse.data;

        // Set values from room details
        setValue('DonGiaDien', room.giaDien);
        setValue('DonGiaNuoc', room.giaNuoc);
        setValue('CSCuDien', room.csCuDien);
        setValue('CSCuNuoc', room.csCuNuoc);
        setValue('MaxOccupants', room.soNguoi); 
        const currentOccupants = room.soNguoiHienTai; 
        const donGiaPhong = 80000 * currentOccupants; 
        setValue('DonGiaPhong', donGiaPhong);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu phòng: ' + error.message);
      }
    } else {
      // Clear values if no room is selected
      setValue('DonGiaDien', '');
      setValue('DonGiaNuoc', '');
      setValue('DonGiaPhong', '');
      setValue('CSCuDien', '');
      setValue('CSCuNuoc', '');
    }
  };

  // Calculate total amount based on input values
  const calculateTotal = () => {
    const data = watch(); 
    const { CSMoiDien, CSMoiNuoc, DonGiaDien, DonGiaNuoc, DonGiaPhong } = data;

    if (CSMoiDien && CSMoiNuoc && DonGiaDien && DonGiaNuoc && DonGiaPhong) {
      const totalDien = (CSMoiDien - data.CSCuDien) * DonGiaDien;
      const totalNuoc = (CSMoiNuoc - data.CSCuNuoc) * DonGiaNuoc;
      const totalAmount = totalDien + totalNuoc + DonGiaPhong; 

      setValue('TongTien', totalAmount); 
    }
  };

  // Handle input change for new electricity index
  const handleElectricityChange = (event) => {
    setValue('CSMoiDien', event.target.value);
    calculateTotal();
  };

  // Handle input change for new water index
  const handleWaterChange = (event) => {
    setValue('CSMoiNuoc', event.target.value);
    calculateTotal(); // Call the calculateTotal function
  };

  // Handle form submission
  const onSubmit = async (data) => {
    const hoadon = {
      maPhong: data.MaPhong,
      thang: data.Thang + '-01', 
      csCuDien: data.CSCuDien,
      csMoiDien: data.CSMoiDien,
      giaDien: data.DonGiaDien,
      csCuNuoc: data.CSCuNuoc,
      csMoiNuoc: data.CSMoiNuoc,
      giaNuoc: data.DonGiaNuoc,
      donGiaPhong: data.DonGiaPhong,
      ngayLap: data.NgayLap, 
      tongTien: data.TongTien,
      tinhTrang: 'Chưa thanh toán',
    };

    console.log('Payload to send:', hoadon); 
    setLoading(true);
    try {
      await axios.post('http://localhost:8080/hoadon/create', hoadon);
      toast.success('Hóa đơn đã được tạo thành công!');
      setTimeout(() => {
        navigate('/admin/HoaDon'); 
      }, 2000);
    } catch (error) {
      console.error('Error response:', error.response?.data);
      toast.error('Lỗi khi tạo hóa đơn: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Tạo mới hóa đơn</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="MaPhong" className="form-label">Phòng</label>
          <select
            className={`form-select ${errors.MaPhong ? 'is-invalid' : ''}`}
            id="MaPhong"
            {...register('MaPhong', { required: 'Phòng là bắt buộc' })}
            onChange={handleRoomChange}
          >
            <option value="">Chọn phòng</option>
            {availableRooms.map(room => (
              <option key={room.maPhong} value={room.maPhong}>
                {room.tenPhong} (ID: {room.maPhong})
              </option>
            ))}
          </select>
          {errors.MaPhong && <span className="text-danger">{errors.MaPhong.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="Thang" className="form-label">Tháng</label>
          <input
            type="month"
            className={`form-control ${errors.Thang ? 'is-invalid' : ''}`}
            id="Thang"
            {...register('Thang', { required: 'Tháng là bắt buộc' })}
          />
          {errors.Thang && <span className="text-danger">{errors.Thang.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="CSCuDien" className="form-label">Chỉ số cũ điện</label>
          <input
            type="number"
            className={`form-control ${errors.CSCuDien ? 'is-invalid' : ''}`}
            id="CSCuDien"
            {...register('CSCuDien', { required: 'Chỉ số cũ điện là bắt buộc' })}
          />
          {errors.CSCuDien && <span className="text-danger">{errors.CSCuDien.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="CSMoiDien" className="form-label">Chỉ số mới điện</label>
          <input
            type="number"
            className={`form-control ${errors.CSMoiDien ? 'is-invalid' : ''}`}
            id="CSMoiDien"
            {...register('CSMoiDien', { required: 'Chỉ số mới điện là bắt buộc' })}
            onChange={handleElectricityChange}
          />
          {errors.CSMoiDien && <span className="text-danger">{errors.CSMoiDien.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="DonGiaDien" className="form-label">Đơn giá điện</label>
          <input
            type="number"
            className={`form-control ${errors.DonGiaDien ? 'is-invalid' : ''}`}
            id="DonGiaDien"
            {...register('DonGiaDien', { required: 'Đơn giá điện là bắt buộc' })}
            readOnly
          />
          {errors.DonGiaDien && <span className="text-danger">{errors.DonGiaDien.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="CSCuNuoc" className="form-label">Chỉ số cũ nước</label>
          <input
            type="number"
            className={`form-control ${errors.CSCuNuoc ? 'is-invalid' : ''}`}
            id="CSCuNuoc"
            {...register('CSCuNuoc', { required: 'Chỉ số cũ nước là bắt buộc' })}
          />
          {errors.CSCuNuoc && <span className="text-danger">{errors.CSCuNuoc.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="CSMoiNuoc" className="form-label">Chỉ số mới nước</label>
          <input
            type="number"
            className={`form-control ${errors.CSMoiNuoc ? 'is-invalid' : ''}`}
            id="CSMoiNuoc"
            {...register('CSMoiNuoc', { required: 'Chỉ số mới nước là bắt buộc' })}
            onChange={handleWaterChange}
          />
          {errors.CSMoiNuoc && <span className="text-danger">{errors.CSMoiNuoc.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="DonGiaNuoc" className="form-label">Đơn giá nước</label>
          <input
            type="number"
            className={`form-control ${errors.DonGiaNuoc ? 'is-invalid' : ''}`}
            id="DonGiaNuoc"
            {...register('DonGiaNuoc', { required: 'Đơn giá nước là bắt buộc' })}
            readOnly
          />
          {errors.DonGiaNuoc && <span className="text-danger">{errors.DonGiaNuoc.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="DonGiaPhong" className="form-label">Đơn giá phòng</label>
          <input
            type="number"
            className={`form-control ${errors.DonGiaPhong ? 'is-invalid' : ''}`}
            id="DonGiaPhong"
            {...register('DonGiaPhong', { required: 'Đơn giá phòng là bắt buộc' })}
            readOnly
          />
          {errors.DonGiaPhong && <span className="text-danger">{errors.DonGiaPhong.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="TongTien" className="form-label">Tổng tiền</label>
          <input
            type="number"
            className={`form-control ${errors.TongTien ? 'is-invalid' : ''}`}
            id="TongTien"
            {...register('TongTien', { required: 'Tổng tiền là bắt buộc' })}
            readOnly
          />
          {errors.TongTien && <span className="text-danger">{errors.TongTien.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="NgayLap" className="form-label">Ngày lập</label>
          <input
            type="date"
            className={`form-control ${errors.NgayLap ? 'is-invalid' : ''}`}
            id="NgayLap"
            {...register('NgayLap', { required: 'Ngày lập là bắt buộc' })}
          />
          {errors.NgayLap && <span className="text-danger">{errors.NgayLap.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang tạo hóa đơn...' : 'Tạo hóa đơn'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default HoaDonCreate;
