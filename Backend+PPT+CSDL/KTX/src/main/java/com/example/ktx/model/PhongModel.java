package com.example.ktx.model;

import jakarta.persistence.*;

@Entity
@Table(name = "phong")
public class PhongModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maphong")
    private Integer maPhong;

    @Column(name = "tenloaiphong", nullable = false)
    private String tenLoaiPhong;

    @Column(name = "tenphong", nullable = false, length = 30)
    private String tenPhong;

    @Column(name = "songuoi", length = 30)
    private String soNguoi;

    @Column(name = "mota", columnDefinition = "TEXT")
    private String moTa;

    @Column(name = "tinhtrang", length = 20)
    private String tinhTrang;

    @Column(name = "masv")
    private Integer maSV;

    @Column(name = "giadien", length = 20)
    private String giaDien;  // Electricity price

    @Column(name = "gianuoc", length = 20)
    private String giaNuoc;  // Water price

    @Column(name = "giathuephong", length = 20)
    private String giaThuePhong;  // Room rental price

    @Column(name = "cscudien", length = 20)  // Old electricity reading
    private String csCuDien;

    @Column(name = "cscunuoc", length = 20)  // Old water reading
    private String csCuNuoc;
    @Column(name = "songuoihientai")
    private int soNguoiHienTai; // Update this field name if necessary



    // Constructors
    public PhongModel() {}

    public PhongModel(String tenLoaiPhong, String tenPhong, String soNguoi, String moTa, String tinhTrang, Integer maSV, String giaDien, String giaNuoc, String giaThuePhong, String csCuDien, String csCuNuoc, Integer soNguoiHienTai) {
        this.tenLoaiPhong = tenLoaiPhong;
        this.tenPhong = tenPhong;
        this.soNguoi = soNguoi;
        this.moTa = moTa;
        this.tinhTrang = tinhTrang;
        this.maSV = maSV;
        this.giaDien = giaDien;
        this.giaNuoc = giaNuoc;
        this.giaThuePhong = giaThuePhong;
        this.csCuDien = csCuDien;
        this.csCuNuoc = csCuNuoc;
        this.soNguoiHienTai = soNguoiHienTai;
    }

    // Getters and Setters
    public Integer getMaPhong() {
        return maPhong;
    }

    public void setMaPhong(Integer maPhong) {
        this.maPhong = maPhong;
    }

    public String getTenLoaiPhong() {
        return tenLoaiPhong;
    }

    public void setTenLoaiPhong(String tenLoaiPhong) {
        this.tenLoaiPhong = tenLoaiPhong;
    }

    public String getTenPhong() {
        return tenPhong;
    }

    public void setTenPhong(String tenPhong) {
        this.tenPhong = tenPhong;
    }

    public String getSoNguoi() {
        return soNguoi;
    }

    public void setSoNguoi(String soNguoi) {
        this.soNguoi = soNguoi;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    public String getTinhTrang() {
        return tinhTrang;
    }

    public void setTinhTrang(String tinhTrang) {
        this.tinhTrang = tinhTrang;
    }

    public Integer getMaSV() {
        return maSV;
    }

    public void setMaSV(Integer maSV) {
        this.maSV = maSV;
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

    public String getGiaThuePhong() {
        return giaThuePhong;
    }

    public void setGiaThuePhong(String giaThuePhong) {
        this.giaThuePhong = giaThuePhong;
    }

    public String getCsCuDien() {
        return csCuDien;
    }

    public void setCsCuDien(String csCuDien) {
        this.csCuDien = csCuDien;
    }

    public String getCsCuNuoc() {
        return csCuNuoc;
    }

    public void setCsCuNuoc(String csCuNuoc) {
        this.csCuNuoc = csCuNuoc;
    }
    public Integer getSoNguoiHienTai() {
        return soNguoiHienTai;
    }

    public void setSoNguoiHienTai(Integer soNguoiHienTai) {
        this.soNguoiHienTai = soNguoiHienTai;
    }
}
