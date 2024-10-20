import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HopDongEdit = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loadingRoomData, setLoadingRoomData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [contractsResponse, studentsResponse, roomsResponse] = await Promise.all([
          axios.get('http://localhost:8080/hopdong/getAll'),
          axios.get('http://localhost:8080/sinhvien/getAll'),
          axios.get('http://localhost:8080/phong/getAll')
        ]);

        const assignedStudentIds = contractsResponse.data.map(contract => contract.maSV);
        const allStudents = studentsResponse.data.filter(student => !assignedStudentIds.includes(student.maSV));
        const filteredRooms = roomsResponse.data.filter(room => room.tinhTrang === 'Còn trống');
        setAvailableRooms(filteredRooms);

        if (id) {
          const contractResponse = await axios.get(`http://localhost:8080/hopdong/getById/${id}`);
          const hopdong = contractResponse.data;
          setValue('MaSV', hopdong.maSV);
          setValue('MaPhong', hopdong.maPhong);
          setValue('NgayBatDau', new Date(hopdong.ngayBatDau).toISOString().split('T')[0]);
          setValue('GiaThuePhong', hopdong.giaThuePhong);
          setValue('GiaDien', hopdong.giaDien);
          setValue('GiaNuoc', hopdong.giaNuoc);
          setValue('TinhTrangDuyet', hopdong.tinhTrangDuyet || 'Chưa duyệt');

          const studentResponse = await axios.get(`http://localhost:8080/sinhvien/getById/${hopdong.maSV}`);
          setSelectedStudent(studentResponse.data);
        }
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

  const handleRoomChange = async (e) => {
    const selectedRoomId = e.target.value;

    if (!selectedRoomId) {
      setValue('GiaThuePhong', '');
      setValue('GiaDien', '');
      setValue('GiaNuoc', '');
      return;
    }

    setLoadingRoomData(true);
    try {
      const roomResponse = await axios.get(`http://localhost:8080/phong/getById/${selectedRoomId}`);
      const selectedRoom = roomResponse.data;
      setValue('GiaThuePhong', selectedRoom.giaThuePhong);
      setValue('GiaDien', selectedRoom.giaDien);
      setValue('GiaNuoc', selectedRoom.giaNuoc);
    } catch (error) {
      toast.error('Lỗi khi tải thông tin phòng: ' + error.message);
    } finally {
      setLoadingRoomData(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      const updatedContract = {
        maSV: data.MaSV,
        maPhong: data.MaPhong,
        ngayBatDau: data.NgayBatDau,
        giaThuePhong: data.GiaThuePhong,
        giaDien: data.GiaDien,
        giaNuoc: data.GiaNuoc,
        tinhTrangDuyet: data.TinhTrangDuyet,
      };

      await axios.put(`http://localhost:8080/hopdong/update/${id}`, updatedContract);
      toast.success('Cập nhật hợp đồng thành công!');
      navigate('/admin/HopDong');
    } catch (error) {
      toast.error('Lỗi khi cập nhật hợp đồng: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Chỉnh sửa hợp đồng</h2>
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          {selectedStudent && (
            <div className="mb-3">
              <label className="form-label">Tên sinh viên đã chọn</label>
              <input
                type="text"
                className="form-control"
                value={selectedStudent.hoTen}
                readOnly
              />
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="MaPhong" className="form-label">Phòng còn trống</label>
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
            {loadingRoomData && <p>Đang tải giá thuê phòng...</p>}
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
            {loadingRoomData && <p>Đang tải giá điện...</p>}
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
            {loadingRoomData && <p>Đang tải giá nước...</p>}
          </div>



          <button type="submit" className="btn btn-primary">Cập nhật</button>
        </form>
      ) : (
        <p>Đang tải thông tin hợp đồng...</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default HopDongEdit;
