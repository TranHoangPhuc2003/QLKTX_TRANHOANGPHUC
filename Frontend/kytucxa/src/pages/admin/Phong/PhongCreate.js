import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PhongCreate = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();  
  const [loading, setLoading] = useState(false);
  const [phongData, setPhongData] = useState(null); 

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/phong/${id}`)
        .then(response => {
          const phong = response.data;
          setPhongData(phong);
          setValue('TenLoaiPhong', phong.tenLoaiPhong);
          setValue('TenPhong', phong.tenPhong);
          setValue('SoNguoi', phong.soNguoi);
          setValue('MoTa', phong.moTa);
          setValue('GiaDien', phong.giaDien);
          setValue('GiaNuoc', phong.giaNuoc);
          setValue('GiaThuePhong', phong.giaThuePhong);
          setValue('CSCuDien', phong.csCuDien);
          setValue('CSCuNuoc', phong.csCuNuoc);
        })
        .catch(error => {
          toast.error(`Lỗi khi lấy thông tin phòng: ${error.message}`);
        });
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    const phong = {
      tenLoaiPhong: data.TenLoaiPhong,
      tenPhong: data.TenPhong,
      soNguoi: data.SoNguoi,
      moTa: data.MoTa,
      tinhTrang: 'Còn trống', 
      giaDien: data.GiaDien,
      giaNuoc: data.GiaNuoc,
      giaThuePhong: data.GiaThuePhong,
      csCuDien: data.CSCuDien || 0,
      csCuNuoc: data.CSCuNuoc || 0, 
    };

    setLoading(true);
    try {
      if (id) {
        await axios.put(`http://localhost:8080/phong/update/${id}`, phong);
        toast.success('Phòng đã được cập nhật thành công!');
      } else {
        await axios.post('http://localhost:8080/phong/create', phong);
        toast.success('Phòng đã được tạo thành công!');
      }
      setTimeout(() => {
        navigate('/admin/Phong');
      }, 2000);
    } catch (error) {
      toast.error(`Lỗi khi lưu phòng: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Chỉnh sửa phòng' : 'Tạo mới phòng'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="TenLoaiPhong" className="form-label">Loại phòng</label>
          <select
            className={`form-select ${errors.TenLoaiPhong ? 'is-invalid' : ''}`}
            id="TenLoaiPhong"
            {...register('TenLoaiPhong', { required: 'Loại phòng là bắt buộc' })}
          >
            <option value="">Chọn loại phòng</option>
            <option value="Nam">Nam</option>
            <option value="Nu">Nữ</option>
          </select>
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
            type="number"
            className={`form-control ${errors.SoNguoi ? 'is-invalid' : ''}`}
            id="SoNguoi"
            {...register('SoNguoi', { required: 'Số người là bắt buộc' })}
          />
          {errors.SoNguoi && <span className="text-danger">{errors.SoNguoi.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="GiaDien" className="form-label">Giá điện</label>
          <input
            type="number"
            className={`form-control ${errors.GiaDien ? 'is-invalid' : ''}`}
            id="GiaDien"
            {...register('GiaDien', { required: 'Giá điện là bắt buộc' })}
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
          />
          {errors.GiaNuoc && <span className="text-danger">{errors.GiaNuoc.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="GiaThuePhong" className="form-label">Giá thuê phòng</label>
          <input
            type="number"
            className={`form-control ${errors.GiaThuePhong ? 'is-invalid' : ''}`}
            id="GiaThuePhong"
            {...register('GiaThuePhong', { required: 'Giá thuê phòng là bắt buộc' })}
          />
          {errors.GiaThuePhong && <span className="text-danger">{errors.GiaThuePhong.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="CSCuDien" className="form-label">Chỉ số điện cũ</label>
          <input
            type="number"
            className={`form-control ${errors.CSCuDien ? 'is-invalid' : ''}`}
            id="CSCuDien"
            {...register('CSCuDien')}
            readOnly={!!phongData}
          />
          {errors.CSCuDien && <span className="text-danger">{errors.CSCuDien.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="CSCuNuoc" className="form-label">Chỉ số nước cũ</label>
          <input
            type="number"
            className={`form-control ${errors.CSCuNuoc ? 'is-invalid' : ''}`}
            id="CSCuNuoc"
            {...register('CSCuNuoc')}
            readOnly={!!phongData}
          />
          {errors.CSCuNuoc && <span className="text-danger">{errors.CSCuNuoc.message}</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="MoTa" className="form-label">Mô tả</label>
          <textarea
            className={`form-control ${errors.MoTa ? 'is-invalid' : ''}`}
            id="MoTa"
            {...register('MoTa')}
          ></textarea>
          {errors.MoTa && <span className="text-danger">{errors.MoTa.message}</span>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Đang lưu...' : 'Lưu'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PhongCreate;
