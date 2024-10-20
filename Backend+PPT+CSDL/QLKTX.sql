CREATE TABLE SinhVien (
    MaSV SERIAL PRIMARY KEY,
    HoTen VARCHAR(20) NOT NULL,
    NgaySinh DATE NOT NULL,
    Sdt VARCHAR(20),
    Lop VARCHAR(20),
    CCCD VARCHAR(20)
);
ALTER TABLE SinhVien
ADD COLUMN MaPhong INT,
ADD CONSTRAINT fk_phong
FOREIGN KEY (MaPhong) REFERENCES Phong(MaPhong);


CREATE TABLE Phong (
    MaPhong SERIAL PRIMARY KEY,
    TenLoaiPhong VARCHAR(50) NOT NULL CHECK (TenLoaiPhong IN ('Nam', 'Nu')), 
    TenPhong VARCHAR(30) NOT NULL,
    SoNguoi VARCHAR(30),
    MoTa TEXT, 
    TinhTrang VARCHAR(20), 
    MaSV INT,
    GiaDien VARCHAR(20),  
    GiaNuoc VARCHAR(20), 
    GiaThuePhong VARCHAR(20),
    CSCuDien VARCHAR(20), 
    CSCuNuoc VARCHAR(20), 
    FOREIGN KEY (MaSV) REFERENCES SinhVien(MaSV)
);
ALTER TABLE Phong ADD COLUMN SoNguoiHienTai INT DEFAULT 0;

drop table phong cascade;
select * from phong


CREATE TABLE HoaDon (
    MaHD SERIAL PRIMARY KEY,
    MaPhong INT NOT NULL REFERENCES Phong(MaPhong),
    Thang DATE,
    CSCuDien VARCHAR(20), 
    CSMoiDien VARCHAR(20),
    GiaDien VARCHAR(20),
    CSCuNuoc VARCHAR(20), 
    CSMoiNuoc VARCHAR(20),
    GiaNuoc VARCHAR(20),
    DonGiaPhong VARCHAR(20),
    NgayLap DATE,
    TongTien VARCHAR(20),
    TinhTrang VARCHAR(20) NOT NULL
);
drop table hoadon cascade;
select * from hoadon;


CREATE TABLE HopDong (
    MaHopDong SERIAL PRIMARY KEY,
    MaSV INT NOT NULL REFERENCES SinhVien(MaSV),
    MaPhong INT NOT NULL REFERENCES Phong(MaPhong),
    NgayBatDau DATE,
    GiaThuePhong VARCHAR(20),
    GiaDien VARCHAR(20),       
    GiaNuoc VARCHAR(20),     
    TinhTrangDuyet VARCHAR(20) NOT NULL
);
drop table hopdong cascade;


INSERT INTO SinhVien (HoTen, NgaySinh, Sdt, Lop, CCCD) VALUES
('Tran Hoang Phuc', '2003-01-22', '0783914486', 'CNTT21B', '256458975212'),
('Vo Mai Ngoc Han', '2003-04-19', '0785236984', 'QTKD21A', '256879412546'),
('Nguyen Hoai Tam', '2004-01-15', '0709268452', 'ĐHSTOAN22A', '256987543254'),
('Nguyen Huynh Thao Vy', '2004-12-30', '0903268445', 'ĐHSTIN22A', '25458963214'),
('Do Xuan Bach', '2004-04-22', '0391456988', 'ĐHSTIN22A', '256934785236');
select* from sinhvien


INSERT INTO Phong (TenLoaiPhong, TenPhong, SoNguoi, MoTa, TinhTrang, MaSV, GiaDien, GiaNuoc, GiaThuePhong, CSCuDien, CSCuNuoc) 
VALUES 
('Nam', 'Phong A1', '6', 'Phòng dành cho nam với 8 người', 'Còn trống', 1, '3000', '8000', '80000', '100', '60'),
('Nu', 'Phong B2', '8', 'Phòng dành cho nữ với 8 người', 'Đã đầy', 2, '3000', '6000', '80000', '90', '50'),
('Nam', 'Phong C3', '6', 'Phòng nam với sức chứa 8 người', 'Còn trống', 3, '3000', '6000', '80000', '110', '55');



INSERT INTO HoaDon (MaPhong, Thang, CSCuDien, CSMoiDien, GiaDien, CSCuNuoc, CSMoiNuoc, GiaNuoc, DonGiaPhong, NgayLap, TongTien, TinhTrang) 
VALUES 
(1, '2024-10-01', '100', '120', '3000', '60', '70', '4000', '600000', '2024-10-01', '700000', 'Đã thanh toán'),
(2, '2024-10-01', '90', '110', '3000', '40', '50', '4000', '400000', '2024-10-01', '500000', 'Chưa thanh toán'),
(3, '2024-10-01', '120', '140', '3000', '60', '70', '4000', '800000', '2024-10-01', '900000', 'Đã thanh toán');



INSERT INTO HopDong (MaSV, MaPhong, NgayBatDau, GiaThuePhong, GiaDien, GiaNuoc, TinhTrangDuyet) VALUES
(1, 1, '2024-09-01', '80.000', '3000', '4000', 'Đã duyệt'), 
(2, 2, '2024-09-01', '80.000', '3000', '4000', 'Chưa duyệt'), 
(3, 3, '2024-09-01', '80.000', '3000', '4000', 'Đã duyệt');

select * from phong
drop table hoadon cascade