CREATE TABLE transaksi_keuangan_Cahya_Mutaqin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE,
    description TEXT,
    amount BIGINT,
    status ENUM('debit', 'kredit'),
    receiver VARCHAR(50),
    jk ENUM('L', 'P'),
    no_telp VARCHAR(13),
    address TEXT
);

INSERT INTO transaksi_keuangan_Cahya_Mutaqin (date, description, amount, status, receiver, jk, no_telp, address) 
VALUES ('2024-12-28', 'Sewa Showroom', 2000000, 'Debit', 'Putri', 'L', '089678745678', 'Geger Arum');

UPDATE transaksi_keuangan_Cahya_Mutaqin
SET jk = 'p'
WHERE description = 'Sewa Showroom';
