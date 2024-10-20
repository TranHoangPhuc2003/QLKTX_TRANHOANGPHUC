package com.example.ktx.repository;

import com.example.ktx.model.HoaDonModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoaDonRepository extends JpaRepository<HoaDonModel, Integer> {

}
