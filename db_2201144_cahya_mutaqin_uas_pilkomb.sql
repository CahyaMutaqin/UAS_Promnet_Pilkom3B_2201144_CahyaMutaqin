-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Jan 2024 pada 05.52
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2201144_cahya_mutaqin_uas_pilkomb`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi_keuangan_cahya_mutaqin`
--

CREATE TABLE `transaksi_keuangan_cahya_mutaqin` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` text NOT NULL,
  `amount` bigint(20) NOT NULL,
  `status` enum('debit','kredit') NOT NULL,
  `receiver` varchar(50) NOT NULL,
  `jk` enum('L','P') NOT NULL,
  `no_telp` varchar(13) NOT NULL,
  `address` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi_keuangan_cahya_mutaqin`
--

INSERT INTO `transaksi_keuangan_cahya_mutaqin` (`id`, `date`, `description`, `amount`, `status`, `receiver`, `jk`, `no_telp`, `address`) VALUES
(1, '2023-12-18', 'Sewa Lapangan Gedung C', 500000, 'debit', 'Zaki', 'L', '081889078675', 'UPI\n'),
(2, '2023-12-01', 'Sewa Amphitheater', 4000000, 'kredit', 'Dea', 'P', '087656734256', 'UPI'),
(3, '2023-12-01', 'Dana Pilkom', 7000000, 'kredit', 'Rahma', 'P', '081220789543', 'Geger Kalong'),
(4, '2023-12-28', 'Sewa SportHall', 4000000, 'debit', 'Ramadhan', 'L', '087654234571', 'Geger Kalong'),
(32, '2023-01-08', 'Sewa Showroom', 2000000, 'debit', 'Alvin', 'L', '081223489067', 'Geger Arum');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `transaksi_keuangan_cahya_mutaqin`
--
ALTER TABLE `transaksi_keuangan_cahya_mutaqin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `transaksi_keuangan_cahya_mutaqin`
--
ALTER TABLE `transaksi_keuangan_cahya_mutaqin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
