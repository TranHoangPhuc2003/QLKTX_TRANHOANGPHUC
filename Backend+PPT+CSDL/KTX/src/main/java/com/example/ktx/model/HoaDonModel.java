package com.example.ktx.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "hoadon")
public class HoaDonModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mahd")
    private Integer maHD;

    @Column(name = "maphong", nullable = false)
    private Integer maPhong;

    @Column(name = "thang", nullable = false)
    private Date thang;

    @Column(name = "cscudien", length = 20)
    private String csCuDien;

    @Column(name = "csmoidien", length = 20)
    private String csMoiDien;

    @Column(name = "giadien", length = 20)
    private String giaDien;

    @Column(name = "cscunuoc", length = 20)
    private String csCuNuoc;

    @Column(name = "csmoinuoc", length = 20)
    private String csMoiNuoc;

    @Column(name = "gianuoc", length = 20)
    private String giaNuoc;

    @Column(name = "dongia", length = 20) // Added field for room rental price
    private String donGiaPhong;

    @Column(name = "ngaylap", nullable = false)
    private Date ngayLap;

    @Column(name = "tongtien", length = 20)
    private String tongTien;

    @Column(name = "tinhtrang", nullable = false)
    private String tinhTrang;

    // Default constructor
    public HoaDonModel() {}

    public HoaDonModel(Integer maPhong, Date thang, String csCuDien, String csMoiDien,
                       String giaDien, String csCuNuoc, String csMoiNuoc,
                       String giaNuoc, String donGiaPhong, Date ngayLap, String tongTien, String tinhTrang) {
        this.maPhong = maPhong;
        this.thang = thang;
        this.csCuDien = csCuDien;
        this.csMoiDien = csMoiDien;
        this.giaDien = giaDien;
        this.csCuNuoc = csCuNuoc;
        this.csMoiNuoc = csMoiNuoc;
        this.giaNuoc = giaNuoc;
        this.donGiaPhong = donGiaPhong; // Initialize room rental price
        this.ngayLap = ngayLap;
        this.tongTien = tongTien;
        this.tinhTrang = tinhTrang;
    }

    // Getters and Setters
    public Integer getMaHD() {
        return maHD;
    }

    public void setMaHD(Integer maHD) {
        this.maHD = maHD;
    }

    public Integer getMaPhong() {
        return maPhong;
    }

    public void setMaPhong(Integer maPhong) {
        this.maPhong = maPhong;
    }

    public Date getThang() {
        return thang;
    }

    public void setThang(Date thang) {
        this.thang = thang;
    }

    public String getCsCuDien() {
        return csCuDien;
    }

    public void setCsCuDien(String csCuDien) {
        this.csCuDien = csCuDien;
    }

    public String getCsMoiDien() {
        return csMoiDien;
    }

    public void setCsMoiDien(String csMoiDien) {
        this.csMoiDien = csMoiDien;
    }

    public String getGiaDien() {
        return giaDien;
    }

    public void setGiaDien(String giaDien) {
        this.giaDien = giaDien;
    }

    public String getCsCuNuoc() {
        return csCuNuoc;
    }

    public void setCsCuNuoc(String csCuNuoc) {
        this.csCuNuoc = csCuNuoc;
    }

    public String getCsMoiNuoc() {
        return csMoiNuoc;
    }

    public void setCsMoiNuoc(String csMoiNuoc) {
        this.csMoiNuoc = csMoiNuoc;
    }

    public String getGiaNuoc() {
        return giaNuoc;
    }

    public void setGiaNuoc(String giaNuoc) {
        this.giaNuoc = giaNuoc;
    }

    public String getDonGiaPhong() { // New getter for room rental price
        return donGiaPhong;
    }

    public void setDonGiaPhong(String donGiaPhong) { // New setter for room rental price
        this.donGiaPhong = donGiaPhong;
    }

    public Date getNgayLap() {
        return ngayLap;
    }

    public void setNgayLap(Date ngayLap) {
        this.ngayLap = ngayLap;
    }

    public String getTongTien() {
        return tongTien;
    }

    public void setTongTien(String tongTien) {
        this.tongTien = tongTien;
    }

    public String getTinhTrang() {
        return tinhTrang;
    }

    public void setTinhTrang(String tinhTrang) {
        this.tinhTrang = tinhTrang;
    }
}
