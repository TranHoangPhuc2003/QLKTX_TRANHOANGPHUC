import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HopDongCreate = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all students
        const studentsResponse = await axios.get('http://localhost:8080/sinhvien/getAll');
        const allStudents = studentsResponse.data;

        // Fetch all contracts to determine which students already have a room
        const contractsResponse = await axios.get('http://localhost:8080/hopdong/getAll');

        // Check if contractsResponse.data is an array
        const assignedStudentIds = Array.isArray(contractsResponse.data)
          ? contractsResponse.data.map(contract => contract.maSV)
          : []; 
        // Filter students who don't have a room yet
        const filteredStudents = allStudents.filter(student => !assignedStudentIds.includes(student.maSV));
        setStudents(filteredStudents);

        // Fetch available rooms from PhongController
        const roomsResponse = await axios.get('http://localhost:8080/phong/getAll');
        const filteredRooms = roomsResponse.data.filter(room => room.tinhTrang === 'Còn trống');
        setAvailableRooms(filteredRooms);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle room selection
  const handleRoomChange = async (event) => {
    const selectedRoomId = event.target.value;
    if (selectedRoomId) {
      try {
        // Fetch room details using PhongController's getById endpoint
        const roomResponse = await axios.get(`http://localhost:8080/phong/getById/${selectedRoomId}`);
        const room = roomResponse.data;

        // Set form fields with room data
        setValue('GiaThuePhong', room.giaThuePhong);
        setValue('GiaDien', room.giaDien);
        setValue('GiaNuoc', room.giaNuoc);
      } catch (error) {
        toast.error(`Lỗi khi tải dữ liệu phòng: ${error.message}`);
      }
    } else {
      setValue('GiaThuePhong', '');
      setValue('GiaDien', '');
      setValue('GiaNuoc', '');
    }
  };

  const onSubmit = async (data) => {
    const hopdong = {
      maSV: data.MaSV,
      maPhong: data.MaPhong,
      ngayBatDau: data.NgayBatDau,
      giaThuePhong: data.GiaThuePhong,
      giaDien: data.GiaDien,
      giaNuoc: data.GiaNuoc,
      tinhTrangDuyet: 'Chưa duyệt',
    };

    setLoading(true);
    try {
      // Create a new contract using HopDong endpoint
      await axios.post('http://localhost:8080/hopdong/create', hopdong);
      toast.success('Hợp đồng đã được tạo thành công!');
      setTimeout(() => {
        navigate('/admin/HopDong');
      }, 2000);
    } catch (error) {
      toast.error(`Lỗi khi tạo hợp đồng: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-5"><h5>Đang tải...</h5></div>;
  }

  return (
    <div className="container mt-5">
      <h2>Tạo mới hợp đồng</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="MaSV" className="form-label">Sinh viên</label>
          <select
            className={`form-select ${errors.MaSV ? 'is-invalid' : ''}`}
            id="MaSV"
            {...register('MaSV', { required: 'Sinh viên là bắt buộc' })}
          >
            <option value="">Chọn sinh viên</option>
            {students.map(student => (
              <option key={student.maSV} value={student.maSV}>
                {student.hoTen} (ID: {student.maSV})
              </option>
            ))}
          </select>
          {errors.MaSV && <span className="text-danger">{errors.MaSV.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="MaPhong" className="form-label">Phòng đã đăng ký</label>
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
          <label htmlFor="NgayBatDau" className="form-label">Ngày bắt đầu</label>
          <input
            type="date"
            className={`form-control ${errors.NgayBatDau ? 'is-invalid' : ''}`}
            id="NgayBatDau"
            {...register('NgayBatDau', { required: 'Ngày bắt đầu là bắt buộc' })}
          />
          {errors.NgayBatDau && <span className="text-danger">{errors.NgayBatDau.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="GiaThuePhong" className="form-label">Giá thuê phòng</label>
          <input
            type="number"
            className={`form-control ${errors.GiaThuePhong ? 'is-invalid' : ''}`}
            id="GiaThuePhong"
            {...register('GiaThuePhong', { required: 'Giá thuê phòng là bắt buộc' })}
            readOnly
          />
          {errors.GiaThuePhong && <span className="text-danger">{errors.GiaThuePhong.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="GiaDien" className="form-label">Giá điện</label>
          <input
            type="number"
            className={`form-control ${errors.GiaDien ? 'is-invalid' : ''}`}
            id="GiaDien"
            {...register('GiaDien', { required: 'Giá điện là bắt buộc' })}
            readOnly 
          />
          {errors.GiaDien && <span className="text-danger">{errors.GiaDien.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="GiaNuoc" className="form-label">Giá nước</label>
          <input
            type="number"
            className={`form-control ${errors.GiaNuoc ? 'is-invalid' : ''}`}
            id="GiaNuoc"
            {...register('GiaNuoc', { required: 'Giá nước là bắt buộc' })}
            readOnly
          />
          {errors.GiaNuoc && <span className="text-danger">{errors.GiaNuoc.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary">
          Tạo hợp đồng
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default HopDongCreate;
