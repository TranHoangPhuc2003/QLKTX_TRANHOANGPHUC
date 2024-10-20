package com.example.ktx.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "hopdong")
public class HopDongModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mahopdong")
    private Integer maHopDong;

    @Column(name = "masv", nullable = false)
    private Integer maSV;

    @Column(name = "maphong", nullable = false)
    private Integer maPhong;

    @Column(name = "ngaybatdau", nullable = false)
    private Date ngayBatDau;

    @Column(name = "giathuephong")
    private String giaThuePhong;

    @Column(name = "giadien")
    private String giaDien;

    @Column(name = "gianuoc")
    private String giaNuoc;

    @Column(name = "tinhtrangduyet", nullable = false)
    private String tinhTrangDuyet;

    // Default constructor
    public HopDongModel() {}

    // Constructor with parameters
    public HopDongModel(Integer maSV, Integer maPhong, Date ngayBatDau,
                        String giaThuePhong, String giaDien,
                        String giaNuoc, String tinhTrangDuyet) {
        this.maSV = maSV;
        this.maPhong = maPhong;
        this.ngayBatDau = ngayBatDau;
        this.giaThuePhong = giaThuePhong;
        this.giaDien = giaDien;
        this.giaNuoc = giaNuoc;
        this.tinhTrangDuyet = tinhTrangDuyet;
    }

    // Getters and Setters
    public Integer getMaHopDong() {
        return maHopDong;
    }

    public void setMaHopDong(Integer maHopDong) {
        this.maHopDong = maHopDong;
    }

    public Integer getMaSV() {
        return maSV;
    }

    public void setMaSV(Integer maSV) {
        this.maSV = maSV;
    }

    public Integer getMaPhong() {
        return maPhong;
    }

    public void setMaPhong(Integer maPhong) {
        this.maPhong = maPhong;
    }

    public Date getNgayBatDau() {
        return ngayBatDau;
    }

    public void setNgayBatDau(Date ngayBatDau) {
        this.ngayBatDau = ngayBatDau;
    }

    public String getGiaThuePhong() {
        return giaThuePhong;
    }

    public void setGiaThuePhong(String giaThuePhong) {
        this.giaThuePhong = giaThuePhong;
    }

    public String getGiaDien() {
        return giaDien;
    }

    public void setGiaDien(String giaDien) {
        this.giaDien = giaDien;
    }

    public String getGiaNuoc() {
        return giaNuoc;
    }

    public void setGiaNuoc(String giaNuoc) {
        this.giaNuoc = giaNuoc;
    }

    public String getTinhTrangDuyet() {
        return tinhTrangDuyet;
    }

    public void setTinhTrangDuyet(String tinhTrangDuyet) {
        this.tinhTrangDuyet = tinhTrangDuyet;
    }
}
