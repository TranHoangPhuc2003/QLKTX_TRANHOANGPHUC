package com.example.ktx.service;

import com.example.ktx.model.HoaDonModel; // Import your HoaDonModel
import com.example.ktx.repository.HoaDonRepository; // Import the correct repository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HoaDonService {

    @Autowired
    private HoaDonRepository hoaDonRepository; // Updated repository reference

    // Lấy tất cả hóa đơn
    public List<HoaDonModel> findAll() {
        return hoaDonRepository.findAll();
    }

    // Tìm hóa đơn theo ID
    public Optional<HoaDonModel> findById(Integer id) {
        return hoaDonRepository.findById(id);
    }

    // Lưu hóa đơn
    public HoaDonModel save(HoaDonModel hoaDon) {
        return hoaDonRepository.save(hoaDon);
    }

    // Xóa hóa đơn theo ID
    public void deleteById(Integer id) {
        hoaDonRepository.deleteById(id);
    }
}
