package com.example.ktx.repository;

import com.example.ktx.model.PhongModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhongRepository extends JpaRepository<PhongModel, Integer> {

    List<PhongModel> findByTenLoaiPhong(String tenLoaiPhong);

    List<PhongModel> findByTinhTrang(String tinhTrang);

    List<PhongModel> findByMaSV(Integer maSV);

}
