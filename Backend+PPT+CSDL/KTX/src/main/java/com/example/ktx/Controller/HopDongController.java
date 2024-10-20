package com.example.ktx.Controller;

import com.example.ktx.model.HopDongModel;
import com.example.ktx.service.HopDongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hopdong")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class HopDongController {

    @Autowired
    private HopDongService hopDongService;

    // Lấy tất cả các hợp đồng
    @GetMapping("/getAll")
    public ResponseEntity<List<HopDongModel>> getAllHopDong() {
        List<HopDongModel> hopDongList = hopDongService.findAll();
        if (hopDongList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(hopDongList);
    }

    // Lấy hợp đồng theo ID
    @GetMapping("/getById/{id}")
    public ResponseEntity<?> getHopDongById(@PathVariable Integer id) {
        Optional<HopDongModel> hopDong = hopDongService.findById(id);
        if (hopDong.isPresent()) {
            return ResponseEntity.ok(hopDong.get());
        } else {
            return ResponseEntity.status(404).body("Không tìm thấy hợp đồng với ID: " + id);
        }
    }

    // Tạo mới hợp đồng
    @PostMapping("/create")
    public ResponseEntity<?> createHopDong(@RequestBody HopDongModel hopDong) {
        try {
            HopDongModel createdHopDong = hopDongService.save(hopDong);
            return ResponseEntity.status(201).body(createdHopDong); // Trả về status 201 - Created
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi tạo hợp đồng: " + e.getMessage());
        }
    }

    // Cập nhật hợp đồng theo ID
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateHopDong(@PathVariable Integer id, @RequestBody HopDongModel hopDong) {
        Optional<HopDongModel> existingHopDong = hopDongService.findById(id);
        if (existingHopDong.isPresent()) {
            hopDong.setMaHopDong(id); // Set lại ID cho hợp đồng
            HopDongModel updatedHopDong = hopDongService.save(hopDong);
            return ResponseEntity.ok(updatedHopDong);
        } else {
            return ResponseEntity.status(404).body("Không tìm thấy hợp đồng với ID: " + id);
        }
    }

    // Xóa hợp đồng theo ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteHopDong(@PathVariable Integer id) {
        Optional<HopDongModel> existingHopDong = hopDongService.findById(id);
        if (existingHopDong.isPresent()) {
            hopDongService.deleteById(id);
            return ResponseEntity.ok("Đã xóa hợp đồng với ID: " + id);
        } else {
            return ResponseEntity.status(404).body("Không tìm thấy hợp đồng với ID: " + id);
        }
    }

    // Duyệt hợp đồng
    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approveHopDong(@PathVariable Integer id) {
        Optional<HopDongModel> hopDong = hopDongService.findById(id);
        if (hopDong.isPresent()) {
            HopDongModel existingHopDong = hopDong.get();
            existingHopDong.setTinhTrangDuyet("Đã duyệt");
            hopDongService.save(existingHopDong);
            return ResponseEntity.ok("Hợp đồng với ID: " + id + " đã được duyệt.");
        } else {
            return ResponseEntity.status(404).body("Không tìm thấy hợp đồng với ID: " + id);
        }
    }
}
