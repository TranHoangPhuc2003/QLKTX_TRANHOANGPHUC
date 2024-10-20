package com.example.ktx.service;
import com.example.ktx.model.SinhVienModel;
import com.example.ktx.repository.SinhVienRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class SinhVienService {
    @Autowired
    private SinhVienRepository sinhVienRepository;

    public List<SinhVienModel> findAll() {
        return sinhVienRepository.findAll();
    }

    public Optional<SinhVienModel> findById(Integer id) {
        return sinhVienRepository.findById(id);
    }

    public SinhVienModel save(SinhVienModel sinhVien) {
        return sinhVienRepository.save(sinhVien);
    }

    public void deleteById(Integer id) {
        sinhVienRepository.deleteById(id);
    }
}
