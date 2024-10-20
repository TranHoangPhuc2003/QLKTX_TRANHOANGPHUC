import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PhongEdit = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoomData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/phong/getById/${id}`);
        const room = response.data;

        // Set form values
        setValue('TenLoaiPhong', room.tenLoaiPhong);
        setValue('TenPhong', room.tenPhong);
        setValue('SoNguoi', room.soNguoi);
        setValue('MoTa', room.moTa);
        setValue('TinhTrang', room.tinhTrang);
        setValue('GiaDien', room.giaDien);
        setValue('GiaNuoc', room.giaNuoc);
        setValue('GiaThuePhong', room.giaThuePhong);
        setValue('CSCuDien', room.csCuDien);
        setValue('CSCuNuoc', room.csCuNuoc);
      } catch (error) {
        console.error('Error fetching room data:', error);
        if (error.response) {
          toast.error(`Lỗi khi tải thông tin phòng: ${error.response.data.message || error.message}`);
        } else {
          toast.error('Không nhận được phản hồi từ máy chủ.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedRoom = {
        tenLoaiPhong: data.TenLoaiPhong,
        tenPhong: data.TenPhong,
        soNguoi: data.SoNguoi,
        moTa: data.MoTa,
        tinhTrang: data.TinhTrang,
        giaDien: data.GiaDien,
        giaNuoc: data.GiaNuoc,
        giaThuePhong: data.GiaThuePhong,
        csCuDien: data.CSCuDien,
        csCuNuoc: data.CSCuNuoc,
      };

      await axios.put(`http://localhost:8080/phong/update/${id}`, updatedRoom);
      toast.success('Cập nhật thông tin phòng thành công!');
      navigate('/admin/Phong');
    } catch (error) {
      console.error('Error updating room data:', error);
      toast.error('Lỗi khi cập nhật thông tin phòng: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Chỉnh sửa thông tin phòng</h2>
      {!loading ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="TenLoaiPhong" className="form-label">Tên loại phòng</label>
            <input
              type="text"
              className={`form-control ${errors.TenLoaiPhong ? 'is-invalid' : ''}`}
              id="TenLoaiPhong"
              {...register('TenLoaiPhong', { required: 'Tên loại phòng là bắt buộc' })}
            />
            {errors.TenLoaiPhong && <span className="text-danger">{errors.TenLoaiPhong.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="TenPhong" className="form-label">Tên phòng</label>
            <input
              type="text"
              className={`form-control ${errors.TenPhong ? 'is-invalid' : ''}`}
              id="TenPhong"
              {...register('TenPhong', { required: 'Tên phòng là bắt buộc' })}
            />
            {errors.TenPhong && <span className="text-danger">{errors.TenPhong.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="SoNguoi" className="form-label">Số người</label>
            <input
              type="text"
              className={`form-control ${errors.SoNguoi ? 'is-invalid' : ''}`}
              id="SoNguoi"
              {...register('SoNguoi', { required: 'Số người là bắt buộc' })}
            />
            {errors.SoNguoi && <span className="text-danger">{errors.SoNguoi.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="MoTa" className="form-label">Mô tả</label>
            <textarea
              className={`form-control ${errors.MoTa ? 'is-invalid' : ''}`}
              id="MoTa"
              {...register('MoTa')}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="TinhTrang" className="form-label">Tình trạng</label>
            <input
              type="text"
              className={`form-control ${errors.TinhTrang ? 'is-invalid' : ''}`}
              id="TinhTrang"
              {...register('TinhTrang', { required: 'Tình trạng là bắt buộc' })}
            />
            {errors.TinhTrang && <span className="text-danger">{errors.TinhTrang.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="GiaDien" className="form-label">Giá điện</label>
            <input
              type="text"
              className={`form-control ${errors.GiaDien ? 'is-invalid' : ''}`}
              id="GiaDien"
              {...register('GiaDien', { required: 'Giá điện là bắt buộc' })}
            />
            {errors.GiaDien && <span className="text-danger">{errors.GiaDien.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="GiaNuoc" className="form-label">Giá nước</label>
            <input
              type="text"
              className={`form-control ${errors.GiaNuoc ? 'is-invalid' : ''}`}
              id="GiaNuoc"
              {...register('GiaNuoc', { required: 'Giá nước là bắt buộc' })}
            />
            {errors.GiaNuoc && <span className="text-danger">{errors.GiaNuoc.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="GiaThuePhong" className="form-label">Giá thuê phòng</label>
            <input
              type="text"
              className={`form-control ${errors.GiaThuePhong ? 'is-invalid' : ''}`}
              id="GiaThuePhong"
              {...register('GiaThuePhong', { required: 'Giá thuê phòng là bắt buộc' })}
            />
            {errors.GiaThuePhong && <span className="text-danger">{errors.GiaThuePhong.message}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="CSCuDien" className="form-label">Chỉ số cũ điện</label>
            <input
              type="text"
              className={`form-control ${errors.CSCuDien ? 'is-invalid' : ''}`}
              id="CSCuDien"
              {...register('CSCuDien')}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="CSCuNuoc" className="form-label">Chỉ số cũ nước</label>
            <input
              type="text"
              className={`form-control ${errors.CSCuNuoc ? 'is-invalid' : ''}`}
              id="CSCuNuoc"
              {...register('CSCuNuoc')}
            />
          </div>

          <button type="submit" className="btn btn-primary">Cập nhật</button>
        </form>
      ) : (
        <p>Đang tải thông tin phòng...</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default PhongEdit;
