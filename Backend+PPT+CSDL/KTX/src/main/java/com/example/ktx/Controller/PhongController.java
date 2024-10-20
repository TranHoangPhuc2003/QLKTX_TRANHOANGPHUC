package com.example.ktx.Controller;

import com.example.ktx.model.PhongModel;
import com.example.ktx.model.SinhVienModel;
import com.example.ktx.service.PhongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/phong")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class PhongController {

    @Autowired
    private PhongService phongService;

    // Lấy tất cả phòng
    @GetMapping("/getAll")
    public List<PhongModel> getAllPhong() {
        return phongService.findAll();
    }

    // Lấy phòng theo ID
    @GetMapping("/getById/{id}")
    public ResponseEntity<PhongModel> getPhongById(@PathVariable Integer id) {
        Optional<PhongModel> phong = phongService.findById(id);
        return phong.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Tạo phòng mới
    @PostMapping("/create")
    public PhongModel createPhong(@RequestBody PhongModel phong) {
        return phongService.save(phong);
    }

    // Cập nhật phòng
    @PutMapping("/update/{id}")
    public ResponseEntity<PhongModel> updatePhong(@PathVariable Integer id, @RequestBody PhongModel phong) {
        if (phongService.findById(id).isPresent()) {
            phong.setMaPhong(id);
            return ResponseEntity.ok(phongService.save(phong));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateStatus/{id}")
    public ResponseEntity<String> updateRoomStatus(@PathVariable Integer id) {
        Optional<PhongModel> phongOptional = phongService.findById(id);

        if (phongOptional.isPresent()) {
            PhongModel phong = phongOptional.get();

            // Check if the current occupants are equal to or greater than the maximum
            if (phong.getSoNguoiHienTai() >= Integer.parseInt(phong.getSoNguoi())) {
                phong.setTinhTrang("Đã đầy"); // Set room status to "full"
                phongService.save(phong); // Save changes to the database
//                return ResponseEntity.ok("Trạng thái phòng đã được cập nhật thành 'Đã đầy'.");
            } else {
                phong.setTinhTrang("Còn trống"); // Set room status to "available"
                phongService.save(phong); // Save changes to the database
//                return ResponseEntity.ok("Trạng thái phòng đã được cập nhật thành 'Còn trống'.");
            }
        }
        return ResponseEntity.notFound().build();
    }

    // Xóa phòng
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deletePhong(@PathVariable Integer id) {
        if (phongService.findById(id).isPresent()) {
            phongService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Đăng ký sinh viên vào phòng
    @PostMapping("/dangKyPhong")
    public ResponseEntity<String> dangKyPhong(@RequestBody SinhVienModel sinhVien, @RequestParam Integer maPhong) {
        Optional<PhongModel> phongOptional = phongService.findById(maPhong);

        if (phongOptional.isPresent()) {
            PhongModel phong = phongOptional.get();

            if (phong.getSoNguoiHienTai() >= Integer.parseInt(phong.getSoNguoi())) {
                return ResponseEntity.badRequest().body("Phòng đã đầy");
            }

            // Tăng số người hiện tại của phòng
            phong.setSoNguoiHienTai(phong.getSoNguoiHienTai() + 1);
            phongService.save(phong);

            return ResponseEntity.ok("Sinh viên đã đăng ký vào phòng thành công: " + phong.getSoNguoiHienTai() + "/" + phong.getSoNguoi());
        }

        return ResponseEntity.notFound().build();
    }

    // Sinh viên rời phòng
    @PostMapping("/roiPhong")
    public ResponseEntity<String> roiPhong(@RequestBody SinhVienModel sinhVien, @RequestParam Integer maPhong) {
        Optional<PhongModel> phongOptional = phongService.findById(maPhong);

        if (phongOptional.isPresent()) {
            PhongModel phong = phongOptional.get();

            if (phong.getSoNguoiHienTai() > 0) {
                phong.setSoNguoiHienTai(phong.getSoNguoiHienTai() - 1);
                phongService.save(phong);
                return ResponseEntity.ok("Sinh viên đã rời phòng thành công.");
            }

            return ResponseEntity.badRequest().body("Phòng hiện tại không có sinh viên nào.");
        }

        return ResponseEntity.notFound().build();
    }
}
