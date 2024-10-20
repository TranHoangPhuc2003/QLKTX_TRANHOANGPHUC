import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SinhVienForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`http://localhost:8080/sinhvien/getById/${id}`)
        .then(response => {
          const sinhvien = response.data;
          setValue('HoTen', sinhvien.hoTen);
          setValue('Sdt', sinhvien.sdt);
          setValue('NgaySinh', new Date(sinhvien.ngaySinh).toISOString().split('T')[0]);
          setValue('Lop', sinhvien.lop);
          setValue('CCCD', sinhvien.cccd);
        })
        .catch(error => {
          console.error('Error fetching sinhvien:', error);
          toast.error('Error fetching sinh viên data');
        })
        .finally(() => setLoading(false));
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    const sinhvien = {
      hoTen: data.HoTen,
      sdt: data.Sdt,
      ngaySinh: data.NgaySinh,
      lop: data.Lop,
      cccd: data.CCCD,
    };

    setLoading(true);
    const request = id 
      ? axios.put(`http://localhost:8080/sinhvien/update/${id}`, sinhvien) 
      : axios.post('http://localhost:8080/sinhvien/create', sinhvien);
      
    request
      .then(() => {
        toast.success(`Sinh viên ${id ? 'updated' : 'created'} successfully!`);
        setTimeout(() => {
          navigate('/admin/SinhVien');
        }, 2000);
      })
      .catch(error => {
        console.error(`Error ${id ? 'updating' : 'creating'} sinhvien:`, error);
        toast.error(`Error ${id ? 'updating' : 'creating'} sinh viên`);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <div className="text-center mt-5"><h5>Loading...</h5></div>;
  }

  return (
    <div className="container mt-5">
      <h2>{id ? 'Sửa thông tin Sinh viên' : 'Thêm thông tin Sinh viên'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="HoTen" className="form-label">Họ và tên</label>
          <input
            type="text"
            className={`form-control ${errors.HoTen ? 'is-invalid' : ''}`}
            id="HoTen"
            {...register('HoTen', { required: 'Full Name is required' })}
          />
          {errors.HoTen && <span className="text-danger">{errors.HoTen.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="Sdt" className="form-label">Số điện thoại</label>
          <input
            type="text"
            className={`form-control ${errors.Sdt ? 'is-invalid' : ''}`}
            id="Sdt"
            {...register('Sdt', { required: 'Phone is required' })}
          />
          {errors.Sdt && <span className="text-danger">{errors.Sdt.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="NgaySinh" className="form-label">Ngày sinh</label>
          <input
            type="date"
            className={`form-control ${errors.NgaySinh ? 'is-invalid' : ''}`}
            id="NgaySinh"
            {...register('NgaySinh', { required: 'Birth Date is required' })}
          />
          {errors.NgaySinh && <span className="text-danger">{errors.NgaySinh.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="Lop" className="form-label">Lớp</label>
          <input
            type="text"
            className={`form-control ${errors.Lop ? 'is-invalid' : ''}`}
            id="Lop"
            {...register('Lop', { required: 'Class is required' })}
          />
          {errors.Lop && <span className="text-danger">{errors.Lop.message}</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="CCCD" className="form-label">Căn cước công dân</label>
          <input
            type="text"
            className={`form-control ${errors.CCCD ? 'is-invalid' : ''}`}
            id="CCCD"
            {...register('CCCD', { required: 'Identification Number is required' })}
          />
          {errors.CCCD && <span className="text-danger">{errors.CCCD.message}</span>}
        </div>

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success me-2">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/SinhVien')}>Cancel</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SinhVienForm;
