package com.example.ktx.repository;

import com.example.ktx.model.HopDongModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HopDongRepository extends JpaRepository<HopDongModel, Integer> {

}
