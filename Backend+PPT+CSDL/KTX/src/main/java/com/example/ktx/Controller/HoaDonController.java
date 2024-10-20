package com.example.ktx.Controller;

import com.example.ktx.model.HoaDonModel;
import com.example.ktx.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hoadon")
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:3000"})
public class HoaDonController {

    @Autowired
    private HoaDonService hoaDonService;

    // Lấy tất cả hóa đơn
    @GetMapping("/getAll")
    public List<HoaDonModel> getAllHoaDon() {
        return hoaDonService.findAll();
    }

    // Tìm hóa đơn theo ID
    @GetMapping("/getById/{id}")
    public ResponseEntity<HoaDonModel> getHoaDonById(@PathVariable Integer id) {
        Optional<HoaDonModel> hoaDon = hoaDonService.findById(id);
        return hoaDon.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
    

    @PostMapping("/create")
    public ResponseEntity<?> createHoaDon(@RequestBody HoaDonModel hoaDon) {
        try {
            HoaDonModel createdHoaDon = hoaDonService.save(hoaDon);
            return ResponseEntity.status(201).body(createdHoaDon); // Trả về status 201 - Created
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi tạo hóa đơn: " + e.getMessage());
        }
    }

    // Cập nhật hóa đơn
    @PutMapping("/update/{id}")
    public ResponseEntity<HoaDonModel> updateHoaDon(@PathVariable Integer id, @RequestBody HoaDonModel hoaDon) {
        if (hoaDonService.findById(id).isPresent()) {
            hoaDon.setMaHD(id);
            return ResponseEntity.ok(hoaDonService.save(hoaDon));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Xóa hóa đơn
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteHoaDon(@PathVariable Integer id) {
        if (hoaDonService.findById(id).isPresent()) {
            hoaDonService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/approve/{id}") // Ensure this mapping is correct
    public ResponseEntity<?> approveHoaDon(@PathVariable Integer id, @RequestBody HoaDonModel hoaDonRequest) {
        Optional<HoaDonModel> hoaDonOptional = hoaDonService.findById(id);

        if (hoaDonOptional.isPresent()) {
            HoaDonModel existingHoaDon = hoaDonOptional.get();

            // Update the status and any other relevant fields
            existingHoaDon.setTinhTrang("Đã thanh toán");
            existingHoaDon.setGiaDien(hoaDonRequest.getGiaDien());  // Set electricity price
            existingHoaDon.setGiaNuoc(hoaDonRequest.getGiaNuoc());  // Set water price

            hoaDonService.save(existingHoaDon);  // Save the updated bill

            return ResponseEntity.ok("Hóa đơn với ID: " + id + " đã được duyệt.");
        } else {
            return ResponseEntity.status(404).body("Không tìm thấy hóa đơn với ID: " + id);
        }
    }


}
