package com.example.ktx.repository;

import com.example.ktx.model.SinhVienModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SinhVienRepository extends JpaRepository<SinhVienModel, Integer> {

}