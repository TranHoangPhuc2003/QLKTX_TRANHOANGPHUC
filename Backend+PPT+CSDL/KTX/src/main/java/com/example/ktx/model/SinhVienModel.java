//package com.example.ktx.model;
//
//import jakarta.persistence.*;
//import java.time.LocalDate;
//
//@Entity
//@Table(name = "sinhvien")
//public class SinhVienModel {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Integer maSV;
//
//    @Column(name = "hoten")
//    private String hoTen;
//
//    @Column(name = "ngaysinh")
//    private LocalDate ngaySinh;
//
//    @Column(name = "sdt")
//    private String sdt;
//
//    @Column(name = "lop")
//    private String lop;
//
//    @Column(name = "cccd")
//    private String cccd;
//
//    // Constructors
//    public SinhVienModel() {}
//
//    public SinhVienModel(String hoTen, LocalDate ngaySinh, String sdt, String lop, String cccd) {
//        this.hoTen = hoTen;
//        this.ngaySinh = ngaySinh;
//        this.sdt = sdt;
//        this.lop = lop;
//        this.cccd = cccd;
//    }
//
//    // Getters and Setters
//    public Integer getMaSV() {
//        return maSV;
//    }
//
//    public void setMaSV(Integer maSV) {
//        this.maSV = maSV;
//    }
//
//    public String getHoTen() {
//        return hoTen;
//    }
//
//    public void setHoTen(String hoTen) {
//        this.hoTen = hoTen;
//    }
//
//    public LocalDate getNgaySinh() {
//        return ngaySinh;
//    }
//
//    public void setNgaySinh(LocalDate ngaySinh) {
//        this.ngaySinh = ngaySinh;
//    }
//
//    public String getSdt() {
//        return sdt;
//    }
//
//    public void setSdt(String sdt) {
//        this.sdt = sdt;
//    }
//
//    public String getLop() {
//        return lop;
//    }
//
//    public void setLop(String lop) {
//        this.lop = lop;
//    }
//
//    public String getCccd() {
//        return cccd;
//    }
//
//    public void setCccd(String cccd) {
//        this.cccd = cccd;
//    }
//}
package com.example.ktx.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "sinhvien")
public class SinhVienModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer maSV;

    @Column(name = "hoten")
    private String hoTen;

    @Column(name = "ngaysinh")
    private LocalDate ngaySinh;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "lop")
    private String lop;

    @Column(name = "cccd")
    private String cccd;

    @Column(name = "maphong")  // Thêm cột mã phòng
    private Integer maPhong;  // Mã phòng mà sinh viên đang ở

    // Constructors
    public SinhVienModel() {}

    public SinhVienModel(String hoTen, LocalDate ngaySinh, String sdt, String lop, String cccd, Integer maPhong) {
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.sdt = sdt;
        this.lop = lop;
        this.cccd = cccd;
        this.maPhong = maPhong;  // Khởi tạo mã phòng
    }

    // Getters and Setters
    public Integer getMaSV() {
        return maSV;
    }

    public void setMaSV(Integer maSV) {
        this.maSV = maSV;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public LocalDate getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(LocalDate ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public String getSdt() {
        return sdt;
    }

    public void setSdt(String sdt) {
        this.sdt = sdt;
    }

    public String getLop() {
        return lop;
    }

    public void setLop(String lop) {
        this.lop = lop;
    }

    public String getCccd() {
        return cccd;
    }

    public void setCccd(String cccd) {
        this.cccd = cccd;
    }

    public Integer getMaPhong() {
        return maPhong;  // Getter cho mã phòng
    }

    public void setMaPhong(Integer maPhong) {
        this.maPhong = maPhong;  // Setter cho mã phòng
    }
}
