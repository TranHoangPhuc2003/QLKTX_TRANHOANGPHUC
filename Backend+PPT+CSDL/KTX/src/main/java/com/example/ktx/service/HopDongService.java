package com.example.ktx.service;

import com.example.ktx.model.HopDongModel; // Ensure you have created HopDongModel
import com.example.ktx.repository.HopDongRepository; // Ensure you have created HopDongRepository
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HopDongService {

    @Autowired
    private HopDongRepository hopDongRepository;

    public List<HopDongModel> findAll() {
        return hopDongRepository.findAll();
    }

    public Optional<HopDongModel> findById(Integer id) {
        return hopDongRepository.findById(id);
    }

    public HopDongModel save(HopDongModel hopDong) {
        return hopDongRepository.save(hopDong);
    }

    public void deleteById(Integer id) {
        if (hopDongRepository.existsById(id)) {
            hopDongRepository.deleteById(id);
        }
    }
}
