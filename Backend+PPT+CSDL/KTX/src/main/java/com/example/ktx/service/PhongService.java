package com.example.ktx.service;

import com.example.ktx.model.PhongModel;
import com.example.ktx.repository.PhongRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PhongService {
    @Autowired
    private PhongRepository phongRepository;


    public List<PhongModel> findAll() {
        return phongRepository.findAll();
    }

    public Optional<PhongModel> findById(Integer id) {
        return phongRepository.findById(id);
    }

    public PhongModel save(PhongModel phong) {
        return phongRepository.save(phong);
    }

    public void deleteById(Integer id) {
        phongRepository.deleteById(id);
    }

    public List<PhongModel> findByTenLoaiPhong(String tenLoaiPhong) {
        return phongRepository.findByTenLoaiPhong(tenLoaiPhong);
    }

    public List<PhongModel> findByTinhTrang(String tinhTrang) {
        return phongRepository.findByTinhTrang(tinhTrang);
    }

    public List<PhongModel> findByMaSV(Integer maSV) {
        return phongRepository.findByMaSV(maSV);
    }


}
