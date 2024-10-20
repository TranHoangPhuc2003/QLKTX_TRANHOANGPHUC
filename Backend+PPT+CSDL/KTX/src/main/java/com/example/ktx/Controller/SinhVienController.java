package com.example.ktx.Controller;
import com.example.ktx.model.SinhVienModel;
import com.example.ktx.service.SinhVienService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sinhvien")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})

public class SinhVienController {
    @Autowired
    private SinhVienService sinhVienService;

    @GetMapping("/getAll")
    public List<SinhVienModel> getAllSinhVien() {
        return sinhVienService.findAll();
    }


    @GetMapping("/getById/{id}")
    public ResponseEntity<SinhVienModel> getSinhVienById(@PathVariable Integer id) {
        Optional<SinhVienModel> sinhVien = sinhVienService.findById(id);
        return sinhVien.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public SinhVienModel createSinhVien(@RequestBody SinhVienModel sinhVien) {
        return sinhVienService.save(sinhVien);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<SinhVienModel> updateSinhVien(@PathVariable Integer id, @RequestBody SinhVienModel sinhVien) {
        if (sinhVienService.findById(id).isPresent()) {
            sinhVien.setMaSV(id);
            return ResponseEntity.ok(sinhVienService.save(sinhVien));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteSinhVien(@PathVariable Integer id) {
        if (sinhVienService.findById(id).isPresent()) {
            sinhVienService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}