-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2025 at 04:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kaswarga`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `iuran_wargas`
--

CREATE TABLE `iuran_wargas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `id_warga` bigint(20) UNSIGNED NOT NULL,
  `id_jenis_iuran` bigint(20) UNSIGNED NOT NULL,
  `periode_bulan` varchar(255) NOT NULL,
  `tgl_bayar` date DEFAULT NULL,
  `jumlah` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `iuran_wargas`
--

INSERT INTO `iuran_wargas` (`id`, `id_warga`, `id_jenis_iuran`, `periode_bulan`, `tgl_bayar`, `jumlah`, `created_at`, `updated_at`) VALUES
(1, 493, 4, '2025-06', '2025-06-26', 10000.00, '2025-06-25 14:05:18', '2025-06-25 14:05:18'),
(2, 493, 2, '2025-06', '2025-06-26', 10000.00, '2025-06-25 14:05:18', '2025-06-25 14:05:18'),
(3, 493, 5, '2025-06', '2025-06-26', 30000.00, '2025-06-25 14:05:18', '2025-06-25 14:05:18');

-- --------------------------------------------------------

--
-- Table structure for table `jenis_iurans`
--

CREATE TABLE `jenis_iurans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_jenis_iuran` varchar(255) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jenis_iurans`
--

INSERT INTO `jenis_iurans` (`id`, `nama_jenis_iuran`, `keterangan`, `created_at`, `updated_at`) VALUES
(2, 'RUKEM', 'RUKUN KEMATIAN', '2025-06-21 05:07:33', '2025-06-21 05:07:33'),
(4, 'KAS', 'KAS WARGA', '2025-06-21 05:08:01', '2025-06-21 05:08:01'),
(5, 'DANA TAKTIS', 'DANA TAKTIS', '2025-06-21 05:08:32', '2025-06-21 05:08:32');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kas_wargas`
--

CREATE TABLE `kas_wargas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode` varchar(255) DEFAULT NULL,
  `uraian_kas` varchar(255) NOT NULL,
  `tanggal_kas` date NOT NULL,
  `periode_bulan` varchar(255) DEFAULT NULL,
  `uang_masuk` decimal(15,2) NOT NULL DEFAULT 0.00,
  `uang_keluar` decimal(15,2) NOT NULL DEFAULT 0.00,
  `saldo` decimal(15,2) NOT NULL DEFAULT 0.00,
  `keterangan` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_06_14_080106_create_wargas_table', 1),
(5, '2025_06_15_125400_create_jenis_iurans_table', 1),
(6, '2025_06_15_125632_create_iuran_wargas_table', 1),
(7, '2025_06_16_133115_create_pengeluarans_table', 1),
(8, '2025_06_16_150817_add_kategori_to_pengeluarans', 1),
(9, '2025_06_17_075604_create_periodes_table', 1),
(10, '2025_06_17_080150_create_kas_wargas_table', 1),
(11, '2025_06_18_143526_add_kode_to_kas_wargas_table', 1),
(12, '2025_06_18_145101_alter_kode_nullable_on_kas_wargas_table', 1),
(13, '2025_06_22_024221_create_rukems_table', 2),
(14, '2025_06_25_115700_create_permission_tables', 3),
(15, '2025_06_26_062910_add_user_id_to_wargas_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(1, 'App\\Models\\User', 105),
(2, 'App\\Models\\User', 11),
(3, 'App\\Models\\User', 3),
(3, 'App\\Models\\User', 4),
(3, 'App\\Models\\User', 5),
(3, 'App\\Models\\User', 6),
(3, 'App\\Models\\User', 7),
(3, 'App\\Models\\User', 8),
(3, 'App\\Models\\User', 9),
(3, 'App\\Models\\User', 10),
(3, 'App\\Models\\User', 12),
(3, 'App\\Models\\User', 13),
(3, 'App\\Models\\User', 14),
(3, 'App\\Models\\User', 15),
(3, 'App\\Models\\User', 16),
(3, 'App\\Models\\User', 17),
(3, 'App\\Models\\User', 18),
(3, 'App\\Models\\User', 19),
(3, 'App\\Models\\User', 20),
(3, 'App\\Models\\User', 21),
(3, 'App\\Models\\User', 22),
(3, 'App\\Models\\User', 23),
(3, 'App\\Models\\User', 24),
(3, 'App\\Models\\User', 25),
(3, 'App\\Models\\User', 26),
(3, 'App\\Models\\User', 27),
(3, 'App\\Models\\User', 28),
(3, 'App\\Models\\User', 29),
(3, 'App\\Models\\User', 30),
(3, 'App\\Models\\User', 31),
(3, 'App\\Models\\User', 32),
(3, 'App\\Models\\User', 33),
(3, 'App\\Models\\User', 34),
(3, 'App\\Models\\User', 35),
(3, 'App\\Models\\User', 36),
(3, 'App\\Models\\User', 37),
(3, 'App\\Models\\User', 38),
(3, 'App\\Models\\User', 39),
(3, 'App\\Models\\User', 40),
(3, 'App\\Models\\User', 41),
(3, 'App\\Models\\User', 42),
(3, 'App\\Models\\User', 43),
(3, 'App\\Models\\User', 44),
(3, 'App\\Models\\User', 45),
(3, 'App\\Models\\User', 46),
(3, 'App\\Models\\User', 47),
(3, 'App\\Models\\User', 48),
(3, 'App\\Models\\User', 49),
(3, 'App\\Models\\User', 50),
(3, 'App\\Models\\User', 51),
(3, 'App\\Models\\User', 52),
(3, 'App\\Models\\User', 53),
(3, 'App\\Models\\User', 54),
(3, 'App\\Models\\User', 55),
(3, 'App\\Models\\User', 56),
(3, 'App\\Models\\User', 57),
(3, 'App\\Models\\User', 58),
(3, 'App\\Models\\User', 59),
(3, 'App\\Models\\User', 60),
(3, 'App\\Models\\User', 61),
(3, 'App\\Models\\User', 62),
(3, 'App\\Models\\User', 63),
(3, 'App\\Models\\User', 64),
(3, 'App\\Models\\User', 65),
(3, 'App\\Models\\User', 66),
(3, 'App\\Models\\User', 67),
(3, 'App\\Models\\User', 68),
(3, 'App\\Models\\User', 69),
(3, 'App\\Models\\User', 70),
(3, 'App\\Models\\User', 71),
(3, 'App\\Models\\User', 72),
(3, 'App\\Models\\User', 73),
(3, 'App\\Models\\User', 74),
(3, 'App\\Models\\User', 75),
(3, 'App\\Models\\User', 76),
(3, 'App\\Models\\User', 77),
(3, 'App\\Models\\User', 78),
(3, 'App\\Models\\User', 79),
(3, 'App\\Models\\User', 80),
(3, 'App\\Models\\User', 81),
(3, 'App\\Models\\User', 82),
(3, 'App\\Models\\User', 83),
(3, 'App\\Models\\User', 84),
(3, 'App\\Models\\User', 85),
(3, 'App\\Models\\User', 86),
(3, 'App\\Models\\User', 87),
(3, 'App\\Models\\User', 88),
(3, 'App\\Models\\User', 89),
(3, 'App\\Models\\User', 90),
(3, 'App\\Models\\User', 91),
(3, 'App\\Models\\User', 92),
(3, 'App\\Models\\User', 93),
(3, 'App\\Models\\User', 94),
(3, 'App\\Models\\User', 95),
(3, 'App\\Models\\User', 96),
(3, 'App\\Models\\User', 97),
(3, 'App\\Models\\User', 98),
(3, 'App\\Models\\User', 99),
(3, 'App\\Models\\User', 100),
(3, 'App\\Models\\User', 101),
(3, 'App\\Models\\User', 102),
(3, 'App\\Models\\User', 103),
(3, 'App\\Models\\User', 104),
(3, 'App\\Models\\User', 105),
(3, 'App\\Models\\User', 106),
(3, 'App\\Models\\User', 107),
(3, 'App\\Models\\User', 108),
(3, 'App\\Models\\User', 109),
(3, 'App\\Models\\User', 110),
(3, 'App\\Models\\User', 111),
(3, 'App\\Models\\User', 112),
(3, 'App\\Models\\User', 113),
(3, 'App\\Models\\User', 114),
(3, 'App\\Models\\User', 115),
(3, 'App\\Models\\User', 116),
(3, 'App\\Models\\User', 117),
(3, 'App\\Models\\User', 118),
(3, 'App\\Models\\User', 119),
(3, 'App\\Models\\User', 120),
(3, 'App\\Models\\User', 121),
(3, 'App\\Models\\User', 122),
(3, 'App\\Models\\User', 123),
(3, 'App\\Models\\User', 124),
(3, 'App\\Models\\User', 125),
(3, 'App\\Models\\User', 126),
(3, 'App\\Models\\User', 127),
(3, 'App\\Models\\User', 128),
(3, 'App\\Models\\User', 129),
(3, 'App\\Models\\User', 130),
(3, 'App\\Models\\User', 131),
(3, 'App\\Models\\User', 132),
(3, 'App\\Models\\User', 133),
(3, 'App\\Models\\User', 134),
(3, 'App\\Models\\User', 135),
(3, 'App\\Models\\User', 136),
(3, 'App\\Models\\User', 137),
(3, 'App\\Models\\User', 138),
(3, 'App\\Models\\User', 139),
(3, 'App\\Models\\User', 140),
(3, 'App\\Models\\User', 141),
(3, 'App\\Models\\User', 142),
(3, 'App\\Models\\User', 143),
(3, 'App\\Models\\User', 144),
(3, 'App\\Models\\User', 145),
(3, 'App\\Models\\User', 146),
(3, 'App\\Models\\User', 147),
(3, 'App\\Models\\User', 148),
(3, 'App\\Models\\User', 149),
(3, 'App\\Models\\User', 150),
(3, 'App\\Models\\User', 151),
(3, 'App\\Models\\User', 152),
(3, 'App\\Models\\User', 153),
(3, 'App\\Models\\User', 154),
(3, 'App\\Models\\User', 155),
(3, 'App\\Models\\User', 156),
(3, 'App\\Models\\User', 157),
(3, 'App\\Models\\User', 158),
(3, 'App\\Models\\User', 159),
(3, 'App\\Models\\User', 160),
(3, 'App\\Models\\User', 161),
(3, 'App\\Models\\User', 162),
(3, 'App\\Models\\User', 163),
(3, 'App\\Models\\User', 164),
(3, 'App\\Models\\User', 165),
(3, 'App\\Models\\User', 166),
(3, 'App\\Models\\User', 167),
(3, 'App\\Models\\User', 168),
(3, 'App\\Models\\User', 169),
(3, 'App\\Models\\User', 170),
(3, 'App\\Models\\User', 171),
(3, 'App\\Models\\User', 172),
(3, 'App\\Models\\User', 173),
(3, 'App\\Models\\User', 174),
(3, 'App\\Models\\User', 175),
(3, 'App\\Models\\User', 176),
(3, 'App\\Models\\User', 177),
(3, 'App\\Models\\User', 178),
(3, 'App\\Models\\User', 179),
(3, 'App\\Models\\User', 180),
(3, 'App\\Models\\User', 181),
(3, 'App\\Models\\User', 182),
(3, 'App\\Models\\User', 183),
(3, 'App\\Models\\User', 184),
(3, 'App\\Models\\User', 185),
(3, 'App\\Models\\User', 186),
(3, 'App\\Models\\User', 187),
(3, 'App\\Models\\User', 188),
(3, 'App\\Models\\User', 189),
(3, 'App\\Models\\User', 190),
(3, 'App\\Models\\User', 191),
(3, 'App\\Models\\User', 192),
(3, 'App\\Models\\User', 193),
(3, 'App\\Models\\User', 194),
(3, 'App\\Models\\User', 195),
(3, 'App\\Models\\User', 196),
(3, 'App\\Models\\User', 197),
(3, 'App\\Models\\User', 198),
(3, 'App\\Models\\User', 199),
(3, 'App\\Models\\User', 200),
(3, 'App\\Models\\User', 201),
(3, 'App\\Models\\User', 202),
(3, 'App\\Models\\User', 203),
(3, 'App\\Models\\User', 204),
(3, 'App\\Models\\User', 205),
(3, 'App\\Models\\User', 206),
(3, 'App\\Models\\User', 207),
(3, 'App\\Models\\User', 208),
(3, 'App\\Models\\User', 209),
(3, 'App\\Models\\User', 210),
(3, 'App\\Models\\User', 211),
(3, 'App\\Models\\User', 212),
(3, 'App\\Models\\User', 213),
(3, 'App\\Models\\User', 214),
(3, 'App\\Models\\User', 215),
(3, 'App\\Models\\User', 216),
(3, 'App\\Models\\User', 217),
(3, 'App\\Models\\User', 218),
(3, 'App\\Models\\User', 219),
(3, 'App\\Models\\User', 220),
(3, 'App\\Models\\User', 221),
(3, 'App\\Models\\User', 222),
(3, 'App\\Models\\User', 223),
(3, 'App\\Models\\User', 224),
(3, 'App\\Models\\User', 225),
(3, 'App\\Models\\User', 226),
(3, 'App\\Models\\User', 227),
(3, 'App\\Models\\User', 228),
(3, 'App\\Models\\User', 229),
(3, 'App\\Models\\User', 230),
(3, 'App\\Models\\User', 231),
(3, 'App\\Models\\User', 232),
(3, 'App\\Models\\User', 233),
(3, 'App\\Models\\User', 234),
(3, 'App\\Models\\User', 235),
(3, 'App\\Models\\User', 236),
(3, 'App\\Models\\User', 237),
(3, 'App\\Models\\User', 238),
(3, 'App\\Models\\User', 239),
(3, 'App\\Models\\User', 240),
(3, 'App\\Models\\User', 241),
(3, 'App\\Models\\User', 242),
(3, 'App\\Models\\User', 243),
(3, 'App\\Models\\User', 244),
(3, 'App\\Models\\User', 245),
(3, 'App\\Models\\User', 246),
(3, 'App\\Models\\User', 247),
(3, 'App\\Models\\User', 248),
(3, 'App\\Models\\User', 249),
(3, 'App\\Models\\User', 250),
(3, 'App\\Models\\User', 251),
(3, 'App\\Models\\User', 252),
(3, 'App\\Models\\User', 253),
(3, 'App\\Models\\User', 254),
(3, 'App\\Models\\User', 255),
(3, 'App\\Models\\User', 256),
(3, 'App\\Models\\User', 257),
(3, 'App\\Models\\User', 258),
(3, 'App\\Models\\User', 259),
(3, 'App\\Models\\User', 260),
(3, 'App\\Models\\User', 261),
(3, 'App\\Models\\User', 262),
(3, 'App\\Models\\User', 263),
(3, 'App\\Models\\User', 264),
(3, 'App\\Models\\User', 265),
(3, 'App\\Models\\User', 266),
(3, 'App\\Models\\User', 267),
(3, 'App\\Models\\User', 268),
(3, 'App\\Models\\User', 269),
(3, 'App\\Models\\User', 270),
(3, 'App\\Models\\User', 271),
(3, 'App\\Models\\User', 272),
(3, 'App\\Models\\User', 273),
(3, 'App\\Models\\User', 274),
(3, 'App\\Models\\User', 275),
(3, 'App\\Models\\User', 276),
(3, 'App\\Models\\User', 277),
(3, 'App\\Models\\User', 278),
(3, 'App\\Models\\User', 279),
(3, 'App\\Models\\User', 280),
(3, 'App\\Models\\User', 281),
(3, 'App\\Models\\User', 282),
(3, 'App\\Models\\User', 283),
(3, 'App\\Models\\User', 284),
(3, 'App\\Models\\User', 285),
(3, 'App\\Models\\User', 286),
(3, 'App\\Models\\User', 287),
(3, 'App\\Models\\User', 288),
(3, 'App\\Models\\User', 289),
(3, 'App\\Models\\User', 290),
(3, 'App\\Models\\User', 291),
(3, 'App\\Models\\User', 292),
(3, 'App\\Models\\User', 293),
(3, 'App\\Models\\User', 294),
(3, 'App\\Models\\User', 295),
(3, 'App\\Models\\User', 296),
(3, 'App\\Models\\User', 297),
(3, 'App\\Models\\User', 298),
(3, 'App\\Models\\User', 299),
(3, 'App\\Models\\User', 300),
(3, 'App\\Models\\User', 301),
(3, 'App\\Models\\User', 302),
(3, 'App\\Models\\User', 303),
(3, 'App\\Models\\User', 304),
(3, 'App\\Models\\User', 305),
(3, 'App\\Models\\User', 306),
(3, 'App\\Models\\User', 307),
(3, 'App\\Models\\User', 308),
(3, 'App\\Models\\User', 309),
(3, 'App\\Models\\User', 310),
(3, 'App\\Models\\User', 311),
(3, 'App\\Models\\User', 312),
(3, 'App\\Models\\User', 313),
(3, 'App\\Models\\User', 314),
(3, 'App\\Models\\User', 315),
(3, 'App\\Models\\User', 316),
(3, 'App\\Models\\User', 317),
(3, 'App\\Models\\User', 318),
(3, 'App\\Models\\User', 319),
(3, 'App\\Models\\User', 320),
(3, 'App\\Models\\User', 321),
(3, 'App\\Models\\User', 322),
(3, 'App\\Models\\User', 323),
(3, 'App\\Models\\User', 324),
(3, 'App\\Models\\User', 325),
(3, 'App\\Models\\User', 326),
(3, 'App\\Models\\User', 327),
(3, 'App\\Models\\User', 328),
(3, 'App\\Models\\User', 329),
(3, 'App\\Models\\User', 330),
(3, 'App\\Models\\User', 331),
(3, 'App\\Models\\User', 332),
(3, 'App\\Models\\User', 333),
(3, 'App\\Models\\User', 334),
(3, 'App\\Models\\User', 335),
(3, 'App\\Models\\User', 336),
(3, 'App\\Models\\User', 337),
(3, 'App\\Models\\User', 338),
(3, 'App\\Models\\User', 339),
(3, 'App\\Models\\User', 340),
(3, 'App\\Models\\User', 341),
(3, 'App\\Models\\User', 342),
(3, 'App\\Models\\User', 343),
(3, 'App\\Models\\User', 344),
(3, 'App\\Models\\User', 345),
(3, 'App\\Models\\User', 346),
(3, 'App\\Models\\User', 347),
(3, 'App\\Models\\User', 348),
(3, 'App\\Models\\User', 349),
(3, 'App\\Models\\User', 350),
(3, 'App\\Models\\User', 351),
(3, 'App\\Models\\User', 352),
(3, 'App\\Models\\User', 353),
(3, 'App\\Models\\User', 354),
(3, 'App\\Models\\User', 355),
(3, 'App\\Models\\User', 356),
(3, 'App\\Models\\User', 357),
(3, 'App\\Models\\User', 358),
(3, 'App\\Models\\User', 359),
(3, 'App\\Models\\User', 360),
(3, 'App\\Models\\User', 361),
(3, 'App\\Models\\User', 362),
(3, 'App\\Models\\User', 363),
(3, 'App\\Models\\User', 364),
(3, 'App\\Models\\User', 365),
(3, 'App\\Models\\User', 366),
(3, 'App\\Models\\User', 367),
(3, 'App\\Models\\User', 368),
(3, 'App\\Models\\User', 369),
(3, 'App\\Models\\User', 370),
(3, 'App\\Models\\User', 371),
(3, 'App\\Models\\User', 372),
(3, 'App\\Models\\User', 373),
(3, 'App\\Models\\User', 374),
(3, 'App\\Models\\User', 375),
(3, 'App\\Models\\User', 376),
(3, 'App\\Models\\User', 377),
(3, 'App\\Models\\User', 378),
(3, 'App\\Models\\User', 379),
(3, 'App\\Models\\User', 380),
(3, 'App\\Models\\User', 381),
(3, 'App\\Models\\User', 382),
(3, 'App\\Models\\User', 383),
(3, 'App\\Models\\User', 384),
(3, 'App\\Models\\User', 385),
(3, 'App\\Models\\User', 386),
(3, 'App\\Models\\User', 387),
(3, 'App\\Models\\User', 388),
(3, 'App\\Models\\User', 390);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pengeluarans`
--

CREATE TABLE `pengeluarans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kategori` varchar(255) DEFAULT NULL,
  `nama_pengeluaran` varchar(255) NOT NULL,
  `periode_bulan` varchar(255) NOT NULL,
  `tgl_bayar` date DEFAULT NULL,
  `jumlah` decimal(10,2) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `periodes`
--

CREATE TABLE `periodes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_periode` varchar(255) NOT NULL,
  `tanggal_mulai` date NOT NULL,
  `tanggal_akhir` date NOT NULL,
  `keterangan` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'iuran.view', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(2, 'iuran.create', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(3, 'iuran.edit', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(4, 'iuran.delete', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(5, 'warga.view', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(6, 'warga.create', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(7, 'warga.edit', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(8, 'warga.delete', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(9, 'kas.view', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(10, 'kas.create', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(11, 'kas.edit', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(12, 'kas.delete', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(13, 'rukem.view', 'web', '2025-06-25 07:18:53', '2025-06-25 07:18:53'),
(14, 'rukem.create', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(15, 'rukem.edit', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(16, 'rukem.delete', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(17, 'role.view', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(18, 'role.create', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(19, 'role.edit', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(20, 'role.delete', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(21, 'user.view', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(22, 'user.create', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(23, 'user.edit', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(24, 'user.delete', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(2, 'koordinator', 'web', '2025-06-25 07:18:54', '2025-06-25 07:18:54'),
(3, 'warga', 'web', '2025-06-25 07:19:25', '2025-06-25 07:19:25'),
(4, 'Ketua', 'web', '2025-06-25 10:11:07', '2025-06-25 10:11:07');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(1, 2),
(1, 4),
(2, 1),
(2, 2),
(3, 1),
(3, 2),
(4, 1),
(4, 2),
(5, 1),
(5, 2),
(5, 3),
(5, 4),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(9, 2),
(9, 3),
(9, 4),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(13, 2),
(13, 3),
(13, 4),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(17, 4),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1);

-- --------------------------------------------------------

--
-- Table structure for table `rukems`
--

CREATE TABLE `rukems` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kode_rukem` varchar(255) NOT NULL,
  `uraian_kas_rukem` varchar(255) NOT NULL,
  `tanggal_kas_rukem` date NOT NULL,
  `periode_bulan` varchar(255) DEFAULT NULL,
  `uang_masuk_rukem` decimal(15,2) NOT NULL DEFAULT 0.00,
  `uang_keluar_rukem` decimal(15,2) NOT NULL DEFAULT 0.00,
  `saldo_rukem` decimal(15,2) NOT NULL DEFAULT 0.00,
  `keterangan_rukem` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('jQ3etOeYy0DXlNH9z0zMEDy6JTEfCbYt602mqlZR', NULL, '127.0.0.1', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiUVRrWHdKUmNESGZJWlhJWk5VanVFUGk3VWRiR0JjZ0k1TW4wQ01YYyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1751054566),
('UnAjPhtxpno6ykeGmuWo6qNHlbPOPJ4I65n3ePib', 11, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiY0FONlFVMGMwejhuN3FQQzBpWjJjZ1FCSjl3YW5aWUExNmphSEtKNCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mzg6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9zZXR0aW5ncy9wcm9maWxlIjt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTE7fQ==', 1751054167);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Totti', 'admin@gmail.com', NULL, '$2y$12$E5YTyv0GqbKzuYozrtY2Pek23O7fwRYOq6Ce.VnhQ73Tb7laFIx3q', 'q1fdPMbRkeskKiGrktHaoba9yXqzuvl3nHllo4mpYiwuSNjh6lMuSn5Wwy3t', '2025-06-20 23:55:02', '2025-06-25 00:32:42'),
(3, 'A. Rosyid/ Kont Soni', 'a_rosyid_kont_soni@example.com', NULL, '$2y$12$qpO68TBbbv4S0OvS8k2ekOt/Ewd3tNC.xt/ibOhnD73IFsXhJexMa', NULL, '2025-06-25 06:50:31', '2025-06-25 06:50:31'),
(4, 'Abdilah / Kontrakan Burhan', 'abdilah_kontrakan_burhan@example.com', NULL, '$2y$12$Tj0qTtBzfO/3gGoUdB/PjOmkQhInZEGmi0gxN4SMnZY3cvps1Qo4S', NULL, '2025-06-25 06:50:31', '2025-06-25 06:50:31'),
(5, 'Abdul Aziz', 'abdul_aziz@example.com', NULL, '$2y$12$UTB.SzyTBMqYRy9G73DEjOr4qjc3CR0h9OeBg.4CX0lG5OSTkYZaa', NULL, '2025-06-25 06:50:32', '2025-06-25 06:50:32'),
(6, 'Abdul Fajar', 'abdul_fajar@example.com', NULL, '$2y$12$xcgS8YfH/xS.1wZi6xZEZewiWQQ6CbqSCTjHJ069E9Dkfb2sVM6O6', NULL, '2025-06-25 06:50:33', '2025-06-27 11:47:35'),
(7, 'Abdul Halim', 'abdul_halim@example.com', NULL, '$2y$12$mRTIfbkqlaG5qcI8PATHJuJ2T2iiW/dP6/p5tEaeNyMLEyhCY3Usa', NULL, '2025-06-25 06:50:34', '2025-06-25 06:50:34'),
(8, 'Abdul Mujib', 'abdul_mujib@example.com', NULL, '$2y$12$0nJtNNSOCWw0QvuZqVSyDulu3SLKMFcMq37sCvBhnDN8mOHRVDuGq', NULL, '2025-06-25 06:50:35', '2025-06-25 06:50:35'),
(9, 'Achmad', 'achmad@example.com', NULL, '$2y$12$dklgRGjdrgrf9ORJioLU2unep0lKW5VmbIEWZgUqDqRmSUqVmzL9W', NULL, '2025-06-25 06:50:36', '2025-06-25 06:50:36'),
(10, 'Achmad Munir', 'achmad_munir@example.com', NULL, '$2y$12$jhshvNG.mxJjlBS59K8uTOX55/A2C0b/BM5m7GiAZ66bcc46wuQxW', NULL, '2025-06-25 06:50:37', '2025-06-25 06:50:37'),
(11, 'Ade', 'ade@example.com', NULL, '$2y$12$jPLytlbJZjcEF.OFHmBy1.ieiDhugVEA/Q1I9pMi3aIiRolWube22', NULL, '2025-06-25 06:50:38', '2025-06-27 13:02:32'),
(12, 'Ade.s', 'ade_s@example.com', NULL, '$2y$12$FLMS21iTXf3ymz8dOxG2Ceg.3CNOhajE4B0DEarpraeSiFYidyWQ6', NULL, '2025-06-25 06:50:39', '2025-06-25 06:50:39'),
(13, 'Adonoy', 'adonoy@example.com', NULL, '$2y$12$6CWRjMtvZdxq9sJxalgQSO6i0chf81Ur0iXRjdFmNN18SdU8CfYf.', NULL, '2025-06-25 06:50:40', '2025-06-25 06:50:40'),
(14, 'Agung Kurniawan', 'agung_kurniawan@example.com', NULL, '$2y$12$vne.xZ1pr0W1OlMGn8Ey4e9/YiZoprE86T2dIWY7kramxSxla7fJi', NULL, '2025-06-25 06:50:40', '2025-06-25 06:50:40'),
(15, 'Agung Riyadi', 'agung_riyadi@example.com', NULL, '$2y$12$I4VZwyj3YUB/NbmSalA3tu9bjSsJYS8veB7EL5YgCXxjBYJ9pvCk2', NULL, '2025-06-25 06:50:41', '2025-06-25 06:50:41'),
(16, 'Agung Triono', 'agung_triono@example.com', NULL, '$2y$12$yMpvc2Gh/LOGItLzvVlU5OPU4cT.jlT9gI0hZw2uleGhc4vLF9qw.', NULL, '2025-06-25 06:50:42', '2025-06-25 06:50:42'),
(17, 'Agus Mulyadi', 'agus_mulyadi@example.com', NULL, '$2y$12$4pAzJ9AZ5kdmjaoyjds2rOFaGYJsHYT5vAYptv4bvX70ajn43FYXS', NULL, '2025-06-25 06:50:43', '2025-06-25 06:50:43'),
(18, 'Agus Munadi', 'agus_munadi@example.com', NULL, '$2y$12$layvquk7M70ZyvmtOUuWfuCmlHGsnPbCL.GsnN/ZtwrB3OsuV0JAm', NULL, '2025-06-25 06:50:44', '2025-06-25 06:50:44'),
(19, 'Agus Nurwanto', 'agus_nurwanto@example.com', NULL, '$2y$12$dv3Gckul/2sOdaM2HF4b3e0Bjhv7W7GaVIUEYTEHJ4BLr752MDuvq', NULL, '2025-06-25 06:50:45', '2025-06-25 06:50:45'),
(20, 'Agus Prasetyo', 'agus_prasetyo@example.com', NULL, '$2y$12$S90LyesQLSOZOkqLFmWFHO7VLk5FbPLsB.UJDL/uiqKL8vtOthAqC', NULL, '2025-06-25 06:50:46', '2025-06-25 06:50:46'),
(21, 'Agus Yusuf', 'agus_yusuf@example.com', NULL, '$2y$12$CjiN2L3xPqFP3sb//zaBu.AuwTyBzyQGKw6Obnf7NN3zVMTjUCpzu', NULL, '2025-06-25 06:50:47', '2025-06-25 06:50:47'),
(22, 'Ahmad Choirulloh Irsyadi', 'ahmad_choirulloh_irsyadi@example.com', NULL, '$2y$12$ewH4402JO4x6m./EYsRHc.08sm7oWglwUccDoUW4xdc40Bib0o/T2', NULL, '2025-06-25 06:50:48', '2025-06-25 06:50:48'),
(23, 'Ahmad Gozali', 'ahmad_gozali@example.com', NULL, '$2y$12$I53W87.0m86SeUvQPxvlguxyqVuHPLzV8zLmeDNseumg5DBCXROzm', NULL, '2025-06-25 06:50:48', '2025-06-25 06:50:48'),
(24, 'Ahmad Rifai', 'ahmad_rifai@example.com', NULL, '$2y$12$/KY3w.mSYTTRcjA60bzSpu2Wwh26a60Tl1tbcUOYxioe/RHU1jvS2', NULL, '2025-06-25 06:50:49', '2025-06-25 06:50:49'),
(25, 'Ahmad Sayuti', 'ahmad_sayuti@example.com', NULL, '$2y$12$And.dsfnRrPkgotucuFWY.cKK57NFjr6ylwzCcZ8Idxs6ezokuZVG', NULL, '2025-06-25 06:50:50', '2025-06-25 06:50:50'),
(26, 'Ahmad Yani', 'ahmad_yani@example.com', NULL, '$2y$12$n1LU34kvWgjYOJk32p6eeujsPFo917jSFyqaRaQXIQJ03PTbUQfF2', NULL, '2025-06-25 06:50:51', '2025-06-25 06:50:51'),
(27, 'Ahmad Yunus', 'ahmad_yunus@example.com', NULL, '$2y$12$Nfi.zl0r4DGvwHzHvMQ7Pe0q6eiMoHGhUpCMO/LF3n.RZRb1bGX6S', NULL, '2025-06-25 06:50:52', '2025-06-25 06:50:52'),
(28, 'Ahmad Zaini', 'ahmad_zaini@example.com', NULL, '$2y$12$.fJcrfr9gbtpYqeXQ8lOg.KMGT7SUEFPAuQzCtKxWOSHM/FoeUOB.', NULL, '2025-06-25 06:50:53', '2025-06-25 06:50:53'),
(29, 'Ahmar /kontrakan Jamhuri', 'ahmar_kontrakan_jamhuri@example.com', NULL, '$2y$12$lUov9V74W38HHGJxynECK.cv4nTIDIYcs8.fcF1T2BLcHDx5nv2MS', NULL, '2025-06-25 06:50:54', '2025-06-25 06:50:54'),
(30, 'Alex Komang Prayoga', 'alex_komang_prayoga@example.com', NULL, '$2y$12$Uo6o.ilafSBp2dgsnlqILeGYqEFCwPNlE3wd86jIFu1fnTceKm2aO', NULL, '2025-06-25 06:50:55', '2025-06-25 06:50:55'),
(31, 'Alfian', 'alfian@example.com', NULL, '$2y$12$wmOuCcpRkrJjiNdMhDddSuigE7fL3e.8VRiyOsMv8yAPLq68JqIJG', NULL, '2025-06-25 06:50:55', '2025-06-25 06:50:55'),
(32, 'Alfiansyah', 'alfiansyah@example.com', NULL, '$2y$12$8d7Ue1NWykTlxr3yDfjafu8giH1tiXP9oD02khnOOAiF1KvHf.uxa', NULL, '2025-06-25 06:50:56', '2025-06-25 06:50:56'),
(33, 'Ali Darwis/ Kontrakan Soni', 'ali_darwis_kontrakan_soni@example.com', NULL, '$2y$12$iEp8xXrctcx.nTa9JcnE../5/Krc4NAvhMPyBL3ifOyTgwznynedC', NULL, '2025-06-25 06:50:57', '2025-06-25 06:50:57'),
(34, 'Alwi / Kontrakan H. Tohir', 'alwi_kontrakan_h_tohir@example.com', NULL, '$2y$12$5NW2.Cb9m4ZOqj5dF5n/x..EiuJvXV9YPDv2M55Y9NhseSmTGYija', NULL, '2025-06-25 06:50:58', '2025-06-25 06:50:58'),
(35, 'Amin / Kontrakan Soni', 'amin_kontrakan_soni@example.com', NULL, '$2y$12$mU69AA8/7OQKNexm6zaxheB49Qo.g8BeVSqUuuKt2CsdJhDfMp2GO', NULL, '2025-06-25 06:50:59', '2025-06-25 06:50:59'),
(36, 'Amin Sh', 'amin_sh@example.com', NULL, '$2y$12$TSVsUItsRz7YpmzKyZ0m6O5HdMEKb.4iG.TlIBQX71HyMD89F1fPS', NULL, '2025-06-25 06:51:00', '2025-06-25 06:51:00'),
(37, 'Amsanih', 'amsanih@example.com', NULL, '$2y$12$eGhyP1bGo7as2Rg1KN6GD.v1sDDW5byhzG4Ige.kPzI5RxuMz8LwG', NULL, '2025-06-25 06:51:01', '2025-06-25 06:51:01'),
(38, 'Ana Diana', 'ana_diana@example.com', NULL, '$2y$12$KHCq9yAiBqWQdi1635rD1e5Tu9gRJEfNl0xhtdsnPr3aqHxtHyl96', NULL, '2025-06-25 06:51:02', '2025-06-25 06:51:02'),
(39, 'Andi / Iis', 'andi_iis@example.com', NULL, '$2y$12$iXurdOm.KLjJV6tKh08lEOJVVkS.T6bjX3UuAQOGZs0K4F0FXQksa', NULL, '2025-06-25 06:51:03', '2025-06-25 06:51:03'),
(40, 'Andi Kusumah', 'andi_kusumah@example.com', NULL, '$2y$12$SwaF5Vd2YUiofoerfUTThOeOes9XeI2/cdoYNvGgcXZHPfflwT8jS', NULL, '2025-06-25 06:51:03', '2025-06-25 06:51:03'),
(41, 'Andri', 'andri@example.com', NULL, '$2y$12$rNHqPi4H23B6jnnY/EfBF.nY9LkmxHdrgzpQbTHPXEWfiu/67EpB2', NULL, '2025-06-25 06:51:05', '2025-06-25 06:51:05'),
(42, 'Andryani', 'andryani@example.com', NULL, '$2y$12$4Fut0QXV83BwL00BkNRIJeXH.gCkEzJWa4NDK1fkgvVRu7HxQQJkq', NULL, '2025-06-25 06:51:05', '2025-06-25 06:51:05'),
(43, 'Angger Prawiroaji', 'angger_prawiroaji@example.com', NULL, '$2y$12$qg0Te/yrU2i5JwEl7rLXtekoZiDHMuZAGmEvAjE6RMJRAVv93hGwm', NULL, '2025-06-25 06:51:06', '2025-06-25 06:51:06'),
(44, 'Anggi / Bakso', 'anggi_bakso@example.com', NULL, '$2y$12$DdJFbTE.mcQ3oF3DSEWv1OywUW7coJkPSpyKeT.L8kA0mgSN0iawO', NULL, '2025-06-25 06:51:07', '2025-06-25 06:51:07'),
(45, 'Anggi Agustiawan', 'anggi_agustiawan@example.com', NULL, '$2y$12$wbghSjwzsj..hNiaklEG8uC5NT7JjcX/W6q1GEI09qt1U0nyzs8t6', NULL, '2025-06-25 06:51:08', '2025-06-25 06:51:08'),
(46, 'Anggun Setiawan', 'anggun_setiawan@example.com', NULL, '$2y$12$1BSNCx./lGbhC8vXfwksfeWa2l4UDRDUSH5EHT6mIZQxrJUCNZELi', NULL, '2025-06-25 06:51:09', '2025-06-25 06:51:09'),
(47, 'Anjar Nugroho', 'anjar_nugroho@example.com', NULL, '$2y$12$Yv0nWUFoz9jCxuiBX/lYvONusFSubipLb/xoq4yJX2EdutXHiKeli', NULL, '2025-06-25 06:51:10', '2025-06-25 06:51:10'),
(48, 'Anto', 'anto@example.com', NULL, '$2y$12$rSwPQc77n7RxuhH4h2v3/uQIS4fs8Zg0YFd6XTo2r4hE4paS1as3G', NULL, '2025-06-25 06:51:11', '2025-06-25 06:51:11'),
(49, 'Anton Setiawan', 'anton_setiawan@example.com', NULL, '$2y$12$xdXGSTZC8AhhL2QHWJVhkOkDlON0b0ydtCtdLGaT6o8C/bFqi6nBO', NULL, '2025-06-25 06:51:12', '2025-06-25 06:51:12'),
(50, 'Anwar', 'anwar@example.com', NULL, '$2y$12$CRFqHL8ngTWPUObpqMv2Lu4GlRLeZtm6zc2KLK5u5lLCvUA/QI7da', NULL, '2025-06-25 06:51:13', '2025-06-25 06:51:13'),
(51, 'Anwar Arifin', 'anwar_arifin@example.com', NULL, '$2y$12$wcrBXCGbi8P./.tGrMHTe.HItZFLBiwv2nYDdwwAh/SwwL/OPZmHm', NULL, '2025-06-25 06:51:14', '2025-06-25 06:51:14'),
(52, 'Apotik Generik', 'apotik_generik@example.com', NULL, '$2y$12$A5LQl5Q/a1ZyzSzVScbUWuDmpH9VH8wtGMcivq6xhipNb/MvJJ0Sq', NULL, '2025-06-25 06:51:15', '2025-06-25 06:51:15'),
(53, 'Apriyadi', 'apriyadi@example.com', NULL, '$2y$12$VVq/hFjf6ZSGcG97Qb8hwedIYJgmiFJQ5t2NAEMYm4N.p85yxSRtK', NULL, '2025-06-25 06:51:16', '2025-06-25 06:51:16'),
(54, 'Arfan Haqi Lubis', 'arfan_haqi_lubis@example.com', NULL, '$2y$12$h/lMAd56OwvqorqvTyvuoe0u9pDs5hqByWXNEzzVVnpNlSJIN60Ju', NULL, '2025-06-25 06:51:17', '2025-06-25 06:51:17'),
(55, 'Arfian', 'arfian@example.com', NULL, '$2y$12$BOWuq09j4Ju4ICNa8UwhOuy7TSfHKpx7zzIyC5ly8mcPcdBqKwLdO', NULL, '2025-06-25 06:51:18', '2025-06-25 06:51:18'),
(56, 'Ari Bowo', 'ari_bowo@example.com', NULL, '$2y$12$v3CYlvxQ0jLlqbOr54dpx.eMs5mG1zpfJkdWc4.DeG28Op.F8PdhC', NULL, '2025-06-25 06:51:20', '2025-06-25 06:51:20'),
(57, 'Ari Isdiantoro', 'ari_isdiantoro@example.com', NULL, '$2y$12$WgXUwET7mmM53yTNkS3P6ekbivkPmC4CtEb0gOMEvIIsTJQEQ7xw.', NULL, '2025-06-25 06:51:21', '2025-06-25 06:51:21'),
(58, 'Ari Sigit', 'ari_sigit@example.com', NULL, '$2y$12$14zv1KgIv6s65gV9x7vRHOB.19FKsQ5DDmNZNNG/KyPme4HcO49ba', NULL, '2025-06-25 06:51:22', '2025-06-25 06:51:22'),
(59, 'Ari Toko Kue / Kont Ust Marhasan', 'ari_toko_kue_kont_ust_marhasan@example.com', NULL, '$2y$12$0zmhg1yHUvxSSqQ/q4e9T.PE77e/eD61q32blntGhhW.bvL./lr9e', NULL, '2025-06-25 06:51:23', '2025-06-25 06:51:23'),
(60, 'Arif Firdaus', 'arif_firdaus@example.com', NULL, '$2y$12$OBKZMj2pijnn7GW79P.k2eyXvOivq6Rgao4rOqKXXNl.74s6UlUcC', NULL, '2025-06-25 06:51:24', '2025-06-25 06:51:24'),
(61, 'Asep / Nasi Goreng', 'asep_nasi_goreng@example.com', NULL, '$2y$12$1qxGgS7IZI6Iqmq4qpXmouEVC47hgA8bwGA1jf6NLvkYVwijzEKjK', NULL, '2025-06-25 06:51:24', '2025-06-25 06:51:24'),
(62, 'Asep Jainudin', 'asep_jainudin@example.com', NULL, '$2y$12$wg.M9ZgRV98CBEj60FEY6OXYjKF9sDmve6Ke0wUgT2QC9T9l7ipdq', NULL, '2025-06-25 06:51:25', '2025-06-25 06:51:25'),
(63, 'Asiah / Candra', 'asiah_candra@example.com', NULL, '$2y$12$8KyrJHknFrPrlflAFCUxpuxcm07V2lpfyREDZL7lufx4UZToJ6bJy', NULL, '2025-06-25 06:51:26', '2025-06-25 06:51:26'),
(64, 'Asiyah', 'asiyah@example.com', NULL, '$2y$12$cJowTj1QchlE3KgkcskKieg00VIjgF05kw4N49QrtmNSF7KpZ6sVK', NULL, '2025-06-25 06:51:27', '2025-06-25 06:51:27'),
(65, 'Axa Frozen', 'axa_frozen@example.com', NULL, '$2y$12$gkG5isdHwEkNLNdql5V/pOh6fAmeqjpk1z8ZAHFpYPggZXz6/k5CG', NULL, '2025-06-25 06:51:28', '2025-06-25 06:51:28'),
(66, 'Bagus Ketut M', 'bagus_ketut_m@example.com', NULL, '$2y$12$7RuZttcS0N8yp3dDWm5qg..skEMmer3scyXJFpq2Dm.mS/JAykzFO', NULL, '2025-06-25 06:51:29', '2025-06-25 06:51:29'),
(67, 'Bahyudi', 'bahyudi@example.com', NULL, '$2y$12$yfaq5em1r2Fw1EJ1wMOU.ej3TYKnjpsHWf0FxBgt2kiFVMLdBT6ZO', NULL, '2025-06-25 06:51:30', '2025-06-25 06:51:30'),
(68, 'Barber Shop Gentlemen', 'barber_shop_gentlemen@example.com', NULL, '$2y$12$B67K9xDD.vd9kLjsUjlRRunWeSg0Jz5jddOK2gx8UNYY7mPAxu/ku', NULL, '2025-06-25 06:51:31', '2025-06-25 06:51:31'),
(69, 'Bartaka / Yohana', 'bartaka_yohana@example.com', NULL, '$2y$12$p7vkfNjm7Y5L2tsC/qJ53e4VtRwm1MvGRBzA/6Yk8KRajeq9/D1CC', NULL, '2025-06-25 06:51:32', '2025-06-25 06:51:32'),
(70, 'Baryanto', 'baryanto@example.com', NULL, '$2y$12$4BNCM88vAgctUrTrwah2PeJxznKqqNYPR3vQ/8xqIuG4UVv2uSFDS', NULL, '2025-06-25 06:51:33', '2025-06-25 06:51:33'),
(71, 'Bawono', 'bawono@example.com', NULL, '$2y$12$DudUynVtOief9SY0U0UEl.8Shdgz0N9EAV5HvVoiXh0sYU7ftu7TC', NULL, '2025-06-25 06:51:34', '2025-06-25 06:51:34'),
(72, 'Bayu Hidayat', 'bayu_hidayat@example.com', NULL, '$2y$12$RyEWltRY71h0Frcb5WWmseT0vH/Tj7SWZXmaYY0atU3hzmPAL50ka', NULL, '2025-06-25 06:51:34', '2025-06-25 06:51:34'),
(73, 'Bayu Nugroho', 'bayu_nugroho@example.com', NULL, '$2y$12$.xfzjixVzIQDrujV5GTlqOe5jERWCDZeKc1QArEKDFmrPyWIZ6nfq', NULL, '2025-06-25 06:51:36', '2025-06-25 06:51:36'),
(74, 'Bayu Pradipta', 'bayu_pradipta@example.com', NULL, '$2y$12$4JUqHMnoQ2rwlbBl5grk9udoqpFqQ3e7F.HQ6.f6r4Td.ZE1sJJfO', NULL, '2025-06-25 06:51:36', '2025-06-25 06:51:36'),
(75, 'Bejo Budianto', 'bejo_budianto@example.com', NULL, '$2y$12$E0RhM2s8u..nZDlXTOOUdukfxxfcg5kYtMrOuG61S/ILY4tVZotvy', NULL, '2025-06-25 06:51:37', '2025-06-25 06:51:37'),
(76, 'Benedictus Suharso', 'benedictus_suharso@example.com', NULL, '$2y$12$BYBfjWJPsSvpbCsPZPGAzOsEcEOvS56z.B.V12iIeHAjj1m9V7Iqa', NULL, '2025-06-25 06:51:38', '2025-06-25 06:51:38'),
(77, 'Bimba Fun Schooling', 'bimba_fun_schooling@example.com', NULL, '$2y$12$GLBeS4ST9AxhmfuIBS/grOEqOFl7DlY3U6dA2opwpFlBylX8z210y', NULL, '2025-06-25 06:51:39', '2025-06-25 06:51:39'),
(78, 'Bohim / Kontrakan Burhan', 'bohim_kontrakan_burhan@example.com', NULL, '$2y$12$wwXhUTYouSoZzfzeBzWIfecNw1UiicWhYCXyVybnsnFT7D1ENG4Hy', NULL, '2025-06-25 06:51:40', '2025-06-25 06:51:40'),
(79, 'Bu Gianti', 'bu_gianti@example.com', NULL, '$2y$12$QQUBfk5C0WotT4rLtGvDHe0bM9jEWmLe2kQ779qWrjBSOGr0mAAhW', NULL, '2025-06-25 06:51:41', '2025-06-25 06:51:41'),
(80, 'Bu Nanai/ Kontrakan Windi R', 'bu_nanai_kontrakan_windi_r@example.com', NULL, '$2y$12$PHrmrqCRdJUmbwfWTicfN.ou4LuoKbrsbKUXh/GNQsH1HO7w3ARm6', NULL, '2025-06-25 06:51:43', '2025-06-25 06:51:43'),
(81, 'Buang Supardi', 'buang_supardi@example.com', NULL, '$2y$12$R/lLpSCY7ws/ubH0DixQ.eViiB7QwNWtosaIM6piQf3FSb3aeHEIm', NULL, '2025-06-25 06:51:44', '2025-06-25 06:51:44'),
(82, 'Budi', 'budi@example.com', NULL, '$2y$12$.tLFoBkwEfIzM4.LGxwGlO3gNzn8/hVMz/3Rz67QOy.4SBM0uY/6m', NULL, '2025-06-25 06:51:45', '2025-06-25 06:51:45'),
(83, 'Budi Service', 'budi_service@example.com', NULL, '$2y$12$G5tZjKXxU4X5e7TOeJ06l.6UzHKrO4BpAZr13oQQqY6T4yhpwyQaO', NULL, '2025-06-25 06:51:46', '2025-06-25 06:51:46'),
(84, 'Burhan', 'burhan@example.com', NULL, '$2y$12$hH3.W2gnd1iFORFF5nrISO9OTgSE2GWEf/HTuZjWRf3Zoo0RckBp6', NULL, '2025-06-25 06:51:47', '2025-06-25 06:51:47'),
(85, 'Burhanudin', 'burhanudin@example.com', NULL, '$2y$12$GLLJXbGyWU8xCkiAUcL3hufKx8mdPLNwX0G4b.R0oV9vqB8BJMkj2', NULL, '2025-06-25 06:51:48', '2025-06-25 06:51:48'),
(86, 'Chandra', 'chandra@example.com', NULL, '$2y$12$xQOEeBUUXBYdb01.UveUn.A8IfCnCbcXchMky6FSCNces6aVKVUfu', NULL, '2025-06-25 06:51:49', '2025-06-25 06:51:49'),
(87, 'Christo A', 'christo_a@example.com', NULL, '$2y$12$f839DTzHxVp7auYqu5SlcOyj7jzCCszpcvB63kXXjsAAv3uEvvrXe', NULL, '2025-06-25 06:51:50', '2025-06-25 06:51:50'),
(88, 'Cipto Hadi', 'cipto_hadi@example.com', NULL, '$2y$12$xoBcSGwKmiJaiXisdJUH3eRyaJtLGaG/pOFjgZ4zUpp9sYO97CzMm', NULL, '2025-06-25 06:51:50', '2025-06-25 06:51:50'),
(89, 'Cucun Agus .b', 'cucun_agus_b@example.com', NULL, '$2y$12$pe8T3WTnGHa74xK5pFVXBe.hEj0QMIx5TVpwb6e3IGdrPQYTpN4dO', NULL, '2025-06-25 06:51:51', '2025-06-25 06:51:51'),
(90, 'D. Sulistyo', 'd_sulistyo@example.com', NULL, '$2y$12$gbgkX1vMgiNk5/IOXvQ5c.g9/bbZLt97gF5t1zpaBJCdmId5CBV8m', NULL, '2025-06-25 06:51:53', '2025-06-25 06:51:53'),
(91, 'Daniel . A', 'daniel_a@example.com', NULL, '$2y$12$S57qZrM.80omvexinj0AA.DSYPuAD66PMkGBEIASoy80C5D6jU0.q', NULL, '2025-06-25 06:51:54', '2025-06-25 06:51:54'),
(92, 'Darmen Silalahi', 'darmen_silalahi@example.com', NULL, '$2y$12$vERrJb1xt80W95fdeteTn.grhHxPmIo2mbBYI1Qf8hSbpwN1riLsq', NULL, '2025-06-25 06:51:55', '2025-06-25 06:51:55'),
(93, 'Daryono', 'daryono@example.com', NULL, '$2y$12$LQPFWrkKtjboIKTxEHc2a.yQeiXee0HYIE88n0VTaaXZA5H9wGIii', NULL, '2025-06-25 06:51:55', '2025-06-25 06:51:55'),
(94, 'David Simanjuntak', 'david_simanjuntak@example.com', NULL, '$2y$12$C066tQGCZgmx.NeNwyrT8eaLLTeREphmD2QxdV5i2PCNzI8UCU8EK', NULL, '2025-06-25 06:51:56', '2025-06-25 06:51:56'),
(95, 'Dayat /tukang Urut', 'dayat_tukang_urut@example.com', NULL, '$2y$12$1ffrFKgt0d.EYfjwW/KqYejXVpi/wVJ/Y6IimNrEPSCfQbG8ZeC4q', NULL, '2025-06-25 06:51:57', '2025-06-25 06:51:57'),
(96, 'Deden A.r', 'deden_a_r@example.com', NULL, '$2y$12$sc9HbsCa2YKGzd0oSy2drutdVPXKa1DlPX53NJXA9TButHu9rGDMa', NULL, '2025-06-25 06:51:58', '2025-06-25 06:51:58'),
(97, 'Dedi Hermawan', 'dedi_hermawan@example.com', NULL, '$2y$12$qtIpw4dk77.Agmc20lYwWetnBNQg8n116LbKV2wg4T7TJrut/LNi2', NULL, '2025-06-25 06:51:59', '2025-06-25 06:51:59'),
(98, 'Dedi Koswara', 'dedi_koswara@example.com', NULL, '$2y$12$JPTWbk7yJ0i9ScBbm8DAoeR43OTdrgetOLsOsIBtFy2i7zXzWkDHK', NULL, '2025-06-25 06:52:00', '2025-06-25 06:52:00'),
(99, 'Dedi Priyanto', 'dedi_priyanto@example.com', NULL, '$2y$12$EkuXL97UBDCrRL/MHa3SA.XfJyWyj80cb0GOpqyyKhRUAy.UNYeaS', NULL, '2025-06-25 06:52:01', '2025-06-25 06:52:01'),
(100, 'Deni / Barber Shop', 'deni_barber_shop@example.com', NULL, '$2y$12$GXSTghJ1bs0yKE4e.2uf4e9r1Mj.N6U9mJp.vCNAMkZ6wzjdHgS6O', NULL, '2025-06-25 06:52:02', '2025-06-25 06:52:02'),
(101, 'Deni Andriyan/ Kontrakan H. Sriyanto', 'deni_andriyan_kontrakan_h_sriyanto@example.com', NULL, '$2y$12$ZWO7dUJ5b/2d7UmSwkqyZeVtDyydFISV9I0FhvQr4VhuUALdaTUs2', NULL, '2025-06-25 06:52:03', '2025-06-25 06:52:03'),
(102, 'Dennis Hasibuan', 'dennis_hasibuan@example.com', NULL, '$2y$12$LBEMluPSziYP5ign67wRQuPmOyHv91ad26MtQmYQlMKE2c7fFvYpC', NULL, '2025-06-25 06:52:04', '2025-06-25 06:52:04'),
(103, 'Devi', 'devi@example.com', NULL, '$2y$12$gULIJ.geyngFrTElWmPzPeDBYNUfkHvUpxhPZrlVA8V1G1g2126sW', NULL, '2025-06-25 06:52:04', '2025-06-25 06:52:04'),
(104, 'Dicky', 'dicky@example.com', NULL, '$2y$12$xmFQ6H6NYpn1cMc2wim38.cyEtllxqrXi00uULUaiu2UJ9KoMGuie', NULL, '2025-06-25 06:52:05', '2025-06-25 06:52:05'),
(105, 'Dika Okta Wiliawan (sektertaris Rt 003)', 'dika_okta_wiliawan_sektertaris_rt_003_@example.com', NULL, '$2y$12$43IVB4BLOj9Wm1.1H1JyJexjVofY3Fc9DxbK2SwLeHb6l4CAUW3/2', NULL, '2025-06-25 06:52:06', '2025-06-25 06:52:06'),
(106, 'Dio / Kontrakan Mpok Asiyah', 'dio_kontrakan_mpok_asiyah@example.com', NULL, '$2y$12$lexEzDsibKNC/JxU6VnB3e.GBcvxNHi84x2xA4nx78H3Xr/Skd3Tm', NULL, '2025-06-25 06:52:07', '2025-06-25 06:52:07'),
(107, 'Djoko Priyanto S Si', 'djoko_priyanto_s_si@example.com', NULL, '$2y$12$aypFoipNEVklY8WwKDaj0.B39A4t8.3mrPv5O/XGZs6gPkP3ux4Ry', NULL, '2025-06-25 06:52:08', '2025-06-25 06:52:08'),
(108, 'Dodi / Tembok Tmii', 'dodi_tembok_tmii@example.com', NULL, '$2y$12$otuKlBBa4mZWXfBVJZBCwuCxHXMKkGa3bD3e..wGGZxxlVAHNTWPK', NULL, '2025-06-25 06:52:09', '2025-06-25 06:52:09'),
(109, 'Dr. Aron', 'dr_aron@example.com', NULL, '$2y$12$UGklIqyMatJPLowzyjZmietC27QVW.eK.HXY05hv9MWGZGvWodrUW', NULL, '2025-06-25 06:52:10', '2025-06-25 06:52:10'),
(110, 'Dra. Tutuk Himayanti', 'dra_tutuk_himayanti@example.com', NULL, '$2y$12$5AGVHotfNJwIP8/p1WXvhuKYBtxVeWMmy53yHf42DlzCrtEad.2JO', NULL, '2025-06-25 06:52:11', '2025-06-25 06:52:11'),
(111, 'Dri Sutrisna', 'dri_sutrisna@example.com', NULL, '$2y$12$4CIok61EyPJ0MdrmSBmgxuabHfIxSggfJLH8J/nt4rrgso3O9Asgi', NULL, '2025-06-25 06:52:12', '2025-06-25 06:52:12'),
(112, 'Drs. Laidu', 'drs_laidu@example.com', NULL, '$2y$12$x9NoS1/H8a8EUznfyP1trunk9GHn53bXn.lp8xl8NtPttmHHSRmvu', NULL, '2025-06-25 06:52:13', '2025-06-25 06:52:13'),
(113, 'Edi Ilham Kontrakan Muklis', 'edi_ilham_kontrakan_muklis@example.com', NULL, '$2y$12$u9/ENWKVMgDO6Tc2iSkFZ.iarT1UYKyKMm8UlIen46U2WNtdyjS1a', NULL, '2025-06-25 06:52:14', '2025-06-25 06:52:14'),
(114, 'Edy Swasono', 'edy_swasono@example.com', NULL, '$2y$12$35uqIWT8ApdR2U.OL5OL..5cGRrKIQ5GlEIfAdZoFMOc5/iED..hC', NULL, '2025-06-25 06:52:15', '2025-06-25 06:52:15'),
(115, 'Eriyanto', 'eriyanto@example.com', NULL, '$2y$12$5lQdlcaKmngE9XY4Kw7bgOLRyIz2BC9A3TO3xDd83vB2PW3XINikC', NULL, '2025-06-25 06:52:16', '2025-06-25 06:52:16'),
(116, 'Erna / Pecel Lele', 'erna_pecel_lele@example.com', NULL, '$2y$12$QjkhcB98T6tDvdZ/aCJVd.KK.OF4s3aIzT1sDcVw3uTXPd5SwK7ga', NULL, '2025-06-25 06:52:17', '2025-06-25 06:52:17'),
(117, 'Fajar Mahadi Gozali', 'fajar_mahadi_gozali@example.com', NULL, '$2y$12$lc/yzoYvzKkYWXKJeXMP8OW47tlsSZekTuMAEz5HG2nYuXkpv2Vmi', NULL, '2025-06-25 06:52:18', '2025-06-25 06:52:18'),
(118, 'Farhan Ucok', 'farhan_ucok@example.com', NULL, '$2y$12$Uat5ZEudSIJ3ygmwLrHM7umW00wfVOax5H4VLE7h6c2LAYDfQZgme', NULL, '2025-06-25 06:52:19', '2025-06-25 06:52:19'),
(119, 'Fathan Albani', 'fathan_albani@example.com', NULL, '$2y$12$Bw9H20HYNIsWxhCJFTlU8.Czn4s293p/a7gjmuso0KZ6sBwxnRPGy', NULL, '2025-06-25 06:52:20', '2025-06-25 06:52:20'),
(120, 'Fatimah', 'fatimah@example.com', NULL, '$2y$12$sUJqNkH0XfYexa73qrmNQe2.O4Qv43RW3Fah/UyZRoTiMtj9epHNC', NULL, '2025-06-25 06:52:21', '2025-06-25 06:52:21'),
(121, 'Fatmaria', 'fatmaria@example.com', NULL, '$2y$12$jwCQK7lzi5cYtaQIOtRfu.eoywfyxaUrD9oWyLmD4gAdD2Adu/SGa', NULL, '2025-06-25 06:52:22', '2025-06-25 06:52:22'),
(122, 'Ferdiansyah Reza', 'ferdiansyah_reza@example.com', NULL, '$2y$12$V5GahCNLVB92oVoa/eL57uu.b1lFD50KKhTEeBAWqMLgMrqcHLlba', NULL, '2025-06-25 06:52:22', '2025-06-25 06:52:22'),
(123, 'Firman Fitriadi', 'firman_fitriadi@example.com', NULL, '$2y$12$LXCYf0dGNEKITudKEW.1UuoiTufq2XnUh1ckO44iXw7hJXB/1w38i', NULL, '2025-06-25 06:52:23', '2025-06-25 06:52:23'),
(124, 'Fx Christiantoro', 'fx_christiantoro@example.com', NULL, '$2y$12$A3H1hIWj24KItVuPY1UQ3e8d1FpLwqNmFsjGY1W.t9eAmqWgQ.reC', NULL, '2025-06-25 06:52:24', '2025-06-25 06:52:24'),
(125, 'Girah Astuti', 'girah_astuti@example.com', NULL, '$2y$12$5W5m/Dz0R.Mb9ZA0IL2FNe.b5j0yUuL1pNHWsFpReQVBE.PPHQAb.', NULL, '2025-06-25 06:52:25', '2025-06-25 06:52:25'),
(126, 'Gita Seblak', 'gita_seblak@example.com', NULL, '$2y$12$RQ8IUNfk83rVI41127/C0epGVpKBkgZA4VagG2KkAcTKb7NM4gMAa', NULL, '2025-06-25 06:52:26', '2025-06-25 06:52:26'),
(127, 'Giyanti', 'giyanti@example.com', NULL, '$2y$12$RTjU3dXlDBT8qE5K8bE5g.U1y1CzudTGyubCT5mbvFaVVpOrnpo2G', NULL, '2025-06-25 06:52:27', '2025-06-25 06:52:27'),
(128, 'Guntur Wahyudi', 'guntur_wahyudi@example.com', NULL, '$2y$12$ffhsXZcKRshP2SeSADWqxOeTz.CyXXp9IX9SrLPhsm4CQkjg.S3lq', NULL, '2025-06-25 06:52:28', '2025-06-25 06:52:28'),
(129, 'H. Danuri', 'h_danuri@example.com', NULL, '$2y$12$gZBqqV3wIDm3d4XNokBVG.21fNMEDfKjDd4fFNt31D.aeap69idnO', NULL, '2025-06-25 06:52:29', '2025-06-25 06:52:29'),
(130, 'H. Matohir', 'h_matohir@example.com', NULL, '$2y$12$IDnT6yWW8nCoFABRe23HEeNjeoI6vBdvyUYFZ7moJ6f109DRHwR/2', NULL, '2025-06-25 06:52:30', '2025-06-25 06:52:30'),
(131, 'H. Musanef Jazuli', 'h_musanef_jazuli@example.com', NULL, '$2y$12$xj9.QyvajBFSpDmbKCtUn.U92SOIE6ZdFYccsDRKApGr2o.wSybfC', NULL, '2025-06-25 06:52:31', '2025-06-25 06:52:31'),
(132, 'H. Paltidoro', 'h_paltidoro@example.com', NULL, '$2y$12$TUgS178Q5R9GKLYUj.M9EuFIzZq7rxAoypdHArV4bfGLFCcaBHt4W', NULL, '2025-06-25 06:52:32', '2025-06-25 06:52:32'),
(133, 'H. Rosmiyati / Pop Ice', 'h_rosmiyati_pop_ice@example.com', NULL, '$2y$12$9bYgKgBtM52IuxO59n6fpOeR7UlLTGzh3XnlDS/18rEkfB1.gkjRG', NULL, '2025-06-25 06:52:32', '2025-06-25 06:52:32'),
(134, 'H. Sriyanto', 'h_sriyanto@example.com', NULL, '$2y$12$hbLMRGBpbWFN6TBj76DFeesdXNrCJ6u3PkZLct4fVe/qcvO50lHuS', NULL, '2025-06-25 06:52:33', '2025-06-25 06:52:33'),
(135, 'H. Suaib', 'h_suaib@example.com', NULL, '$2y$12$0qLRyRJxkNORNWq48iUpMuPszCGXDHo0Uqc22gW.vz3/OgDosQsnO', NULL, '2025-06-25 06:52:34', '2025-06-25 06:52:34'),
(136, 'H. Sunarno', 'h_sunarno@example.com', NULL, '$2y$12$okCRJniUNEZ3V9VHw8mPqe48spsPPi580ZqZVQdK3PBL7My/N5GUu', NULL, '2025-06-25 06:52:35', '2025-06-25 06:52:35'),
(137, 'Hakim', 'hakim@example.com', NULL, '$2y$12$xtCRVeigQ0xFFy8CMEZf9uhcVDxntgu6T3R7OajojMrrg2bmQxjsu', NULL, '2025-06-25 06:52:36', '2025-06-25 06:52:36'),
(138, 'Hamlan Hisani', 'hamlan_hisani@example.com', NULL, '$2y$12$oBu.dPbypAE1A3Mo6066x.YA7lfgfLOAKVpyrescIVdQ1m95uA46y', NULL, '2025-06-25 06:52:37', '2025-06-25 06:52:37'),
(139, 'Hardian', 'hardian@example.com', NULL, '$2y$12$ggbnZ5/0nzabgXdLar/Ov.UsE2LrTDXULs2Iuhjow9En/9EF0hm3.', NULL, '2025-06-25 06:52:38', '2025-06-25 06:52:38'),
(140, 'Hariadi', 'hariadi@example.com', NULL, '$2y$12$Vu3jox2OyR7BfNH6bTNXw.K4LceYQw9VNA5bWvUUD2PLDIWIwCzEW', NULL, '2025-06-25 06:52:38', '2025-06-25 06:52:38'),
(141, 'Haris Munandar', 'haris_munandar@example.com', NULL, '$2y$12$ZmKh9mqaz/TSrqnYqatLQuFdY4gpbNOLjhDnNJJnf1pTmQAayKu92', NULL, '2025-06-25 06:52:39', '2025-06-25 06:52:39'),
(142, 'Harsono', 'harsono@example.com', NULL, '$2y$12$xKTdQOV262H88pgmC4HfkeQrlgJhlic02hUMr2rna2F1hu746OTb.', NULL, '2025-06-25 06:52:40', '2025-06-25 06:52:40'),
(143, 'Harti', 'harti@example.com', NULL, '$2y$12$0QjzQRFXZeaGNDwQq77gOOvYIzSL8S3n5NQMG3eCuA2zqiQdCvwf6', NULL, '2025-06-25 06:52:41', '2025-06-25 06:52:41'),
(144, 'Hasan / Kontrakan H. Sriyanto', 'hasan_kontrakan_h_sriyanto@example.com', NULL, '$2y$12$QiTVxdXQuaedqp35FzLgu.v3BsfIucm72lOYarduxxSoM2WaVKfui', NULL, '2025-06-25 06:52:42', '2025-06-25 06:52:42'),
(145, 'Hashemi. N', 'hashemi_n@example.com', NULL, '$2y$12$0mlFIje0APojkifk9U8CeOvZ/fqvlgyXK4FFgf033iJI4MNKkK4CC', NULL, '2025-06-25 06:52:43', '2025-06-25 06:52:43'),
(146, 'Hayati', 'hayati@example.com', NULL, '$2y$12$HelZTewYWIwaY4NBlJJn9edhb7aCH2RQsOVNqrMO2CHGJNs/VWNHK', NULL, '2025-06-25 06:52:44', '2025-06-25 06:52:44'),
(147, 'Hazani', 'hazani@example.com', NULL, '$2y$12$C6g/yGHUb8lNYArwjyL05uyQkPsLruCodTgQFqELc44mJWQRVJxly', NULL, '2025-06-25 06:52:44', '2025-06-25 06:52:44'),
(148, 'Helmi Nawawi', 'helmi_nawawi@example.com', NULL, '$2y$12$KM56WNX2bkR6Hl2uW3hKKu2ffhPkG8..MfGobX7cEHp4MYW1vQq9K', NULL, '2025-06-25 06:52:45', '2025-06-25 06:52:45'),
(149, 'Hendi Pujianto', 'hendi_pujianto@example.com', NULL, '$2y$12$TBVbJ247wNV7kDLd9mDSR.Za5pVoQw8ZFEdkB7cmlHhhjtUVSDufy', NULL, '2025-06-25 06:52:46', '2025-06-25 06:52:46'),
(150, 'Hendi Suhendar / Kontrakan H, Karjo', 'hendi_suhendar_kontrakan_h_karjo@example.com', NULL, '$2y$12$ed/cLbxMS.Lf8EdcGm967OnOptTKk5F2tganvgyk90HsfIVY5xXca', NULL, '2025-06-25 06:52:47', '2025-06-25 06:52:47'),
(151, 'Henrizal Rasyid', 'henrizal_rasyid@example.com', NULL, '$2y$12$S.5UQbJXDP5.TH1txI8HXOR3yr9nH4gnUpVXzmh9TL.UTV51tBvXG', NULL, '2025-06-25 06:52:48', '2025-06-25 06:52:48'),
(152, 'Heriyanto', 'heriyanto@example.com', NULL, '$2y$12$reBakRjDW9SDJv1kTVQ5YeMbYksgU9FwPoGRX4tRQ..b3iL3Abkom', NULL, '2025-06-25 06:52:49', '2025-06-25 06:52:49'),
(153, 'Herman', 'herman@example.com', NULL, '$2y$12$kPbLZBY2WgDGeatGSEqyC.60BavfH7Nf6q9pIu.q/F2qLPwkOl6gW', NULL, '2025-06-25 06:52:50', '2025-06-25 06:52:50'),
(154, 'Hermawan / Kontrakan Karjo', 'hermawan_kontrakan_karjo@example.com', NULL, '$2y$12$cmArv.L/qcpvVM0/Ewdp7OU1m9h12ldvdFq46EeSnSALCwTKMz0hu', NULL, '2025-06-25 06:52:51', '2025-06-25 06:52:51'),
(155, 'Hery Mulyanto / Yuni', 'hery_mulyanto_yuni@example.com', NULL, '$2y$12$Ze9YZeQ.MQH0./BrLGhNX.LS1zU1H/e51aYbDiKgU5SbVx7WzyCN2', NULL, '2025-06-25 06:52:52', '2025-06-25 06:52:52'),
(156, 'Hisar Manurung', 'hisar_manurung@example.com', NULL, '$2y$12$ci.lqntKczdMZyOlvxsoleBTdl9O29RqQdy7JWkGpri4G71jIcLtG', NULL, '2025-06-25 06:52:52', '2025-06-25 06:52:52'),
(157, 'Hj. Arni', 'hj_arni@example.com', NULL, '$2y$12$yqrIssGVhuHQ3jrZFNXKqO/7fX0x6ChkcTjMWFZ9QK4DFz.5655k2', NULL, '2025-06-25 06:52:53', '2025-06-25 06:52:53'),
(158, 'Ibu Iin', 'ibu_iin@example.com', NULL, '$2y$12$iW6RFpYKb0K7pItMYZM8QO297Z2YBf2mVz33F6Q3eoyGpjevBx1PC', NULL, '2025-06-25 06:52:54', '2025-06-25 06:52:54'),
(159, 'Ibu Lies/ Kontrakan Yofi', 'ibu_lies_kontrakan_yofi@example.com', NULL, '$2y$12$Dm5W5oK3Clk7FcyTOUeZhOB5.m7fA9OmAtkoUhg2E9BPI01C.Ux0q', NULL, '2025-06-25 06:52:55', '2025-06-25 06:52:55'),
(160, 'Ida Fitriani', 'ida_fitriani@example.com', NULL, '$2y$12$77Ywb/E.SfUCfw2h4.eVAOos1o1Z2qlaVApOdCkfTlhKSmSkDjNSu', NULL, '2025-06-25 06:52:56', '2025-06-25 06:52:56'),
(161, 'Iko  Panji', 'iko_panji@example.com', NULL, '$2y$12$0otCy7WlWyzIANX1cdeOx.BVtrSJchskxohGVwzffrOv0fwNoofEC', NULL, '2025-06-25 06:52:57', '2025-06-25 06:52:57'),
(162, 'Ilhamsyah', 'ilhamsyah@example.com', NULL, '$2y$12$2Odo1NR4PhdSs6nAvE2pE.Ak5BUsPgMNmNR9XCpIKUjnWcYwYTm/G', NULL, '2025-06-25 06:52:58', '2025-06-25 06:52:58'),
(163, 'Ilyasa', 'ilyasa@example.com', NULL, '$2y$12$NiWRgVjHhGNzn6OB7HIDm.knPr1FujQDmcb38EldSq20CJRztzn4i', NULL, '2025-06-25 06:52:58', '2025-06-25 06:52:58'),
(164, 'Imam Buchori', 'imam_buchori@example.com', NULL, '$2y$12$HBPwAfJTmo5vXRqyUP.mJub32wRNhaPzP0WueMzs2E.fnuu09zT3u', NULL, '2025-06-25 06:52:59', '2025-06-25 06:52:59'),
(165, 'Imam Nurkholis', 'imam_nurkholis@example.com', NULL, '$2y$12$59ECxGPadsdzrTWobw6m.eUK62qmjJII8TqzfE9ZWZ3xUd0V9e8ka', NULL, '2025-06-25 06:53:00', '2025-06-25 06:53:00'),
(166, 'Ismawadi', 'ismawadi@example.com', NULL, '$2y$12$FX2Va8hx05mNjHaSviKnceTBHjZ4OCZ0NnuJtEBRKuvFqC/LKQr5a', NULL, '2025-06-25 06:53:01', '2025-06-25 06:53:01'),
(167, 'Iwan (mpok Iah)', 'iwan_mpok_iah_@example.com', NULL, '$2y$12$r9TvrdaL7ybEslz/w6JdleHbElc2mW1S.0VKy6YkXK3M0fkOaj3R.', NULL, '2025-06-25 06:53:02', '2025-06-25 06:53:02'),
(168, 'Iwan / Sheza', 'iwan_sheza@example.com', NULL, '$2y$12$EmUDv98mYCxohHuMcFH48O2TWOciqPgWh3st7QFHR4CyP.BiO7/06', NULL, '2025-06-25 06:53:03', '2025-06-25 06:53:03'),
(169, 'Jamhuri (ketua Rt 003)', 'jamhuri_ketua_rt_003_@example.com', NULL, '$2y$12$mT2OO5N53zuwsn9HM/CHb.u6YNWQP/p92vQypNt5x2sv5j4r7R9/C', NULL, '2025-06-25 06:53:04', '2025-06-25 06:53:04'),
(170, 'Joko Sriyono', 'joko_sriyono@example.com', NULL, '$2y$12$UUhUXE71FrKpQp68AYfru.wR5Zz4Ve.TpYksXcxcOBBRhy/mL1JOm', NULL, '2025-06-25 06:53:04', '2025-06-25 06:53:04'),
(171, 'Jono', 'jono@example.com', NULL, '$2y$12$LCmGKNC4fXfcR269xDOfyO1eDXtTCDyGSMtO.aH3iUVelL0gcsWXC', NULL, '2025-06-25 06:53:05', '2025-06-25 06:53:05'),
(172, 'Karno / Kontrakan Asiah', 'karno_kontrakan_asiah@example.com', NULL, '$2y$12$Nz3nRZvW51Y5B7KYqyaab..Gf/aRqyVqJPCiaiRCZCci.07GyItPy', NULL, '2025-06-25 06:53:06', '2025-06-25 06:53:06'),
(173, 'Keian / Klinik Gigi Medika', 'keian_klinik_gigi_medika@example.com', NULL, '$2y$12$3HZfwCxkfT3hh4dYYfvW1ubx04xyEgoS/X48P8p9pV7rZQeNvrWXG', NULL, '2025-06-25 06:53:07', '2025-06-25 06:53:07'),
(174, 'Khayum Basir', 'khayum_basir@example.com', NULL, '$2y$12$DN9ypLDu4Bjn1mFLhb.hxOemjRrP6OYNRMAQFBfsCkNRnJkSfRMjC', NULL, '2025-06-25 06:53:08', '2025-06-25 06:53:08'),
(175, 'Khusnul Azmi', 'khusnul_azmi@example.com', NULL, '$2y$12$dDHwnJzNXpNHS33CZarnguxL.y1MAvQ6TsOQi.hZvOP7s4DTG77V6', NULL, '2025-06-25 06:53:09', '2025-06-25 06:53:09'),
(176, 'Kios Stengbo', 'kios_stengbo@example.com', NULL, '$2y$12$vACtgTtu0OQek6reOProB.R3tZiKieO1uBX191aEJTtGu8DZIsnYO', NULL, '2025-06-25 06:53:10', '2025-06-25 06:53:10'),
(177, 'Kios Unggas', 'kios_unggas@example.com', NULL, '$2y$12$S8ZPA7hC52q7tcbXfIW5PeA2LsjZa4G.TVnbfFbnJplHsnS8X1eI6', NULL, '2025-06-25 06:53:10', '2025-06-25 06:53:10'),
(178, 'Kurnia Imam Hidayat', 'kurnia_imam_hidayat@example.com', NULL, '$2y$12$Or/SSXABZB0WaI6VcdenoO5gsOOuvc4J2L7/XWfJ7lgSgbIUIsqaK', NULL, '2025-06-25 06:53:11', '2025-06-25 06:53:11'),
(179, 'Kurniawan / Iwan', 'kurniawan_iwan@example.com', NULL, '$2y$12$y5rOloFnkBYoTY8CZB59Z.39YmhC.bWpp2ZVNeuRKjmZPCo4Dbqm6', NULL, '2025-06-25 06:53:12', '2025-06-25 06:53:12'),
(180, 'Kusnadi / Mpok Iroh', 'kusnadi_mpok_iroh@example.com', NULL, '$2y$12$AUsBF2hmN5HT68aLGZvBQOBLjGErqiJDEKHIgHDOCzcH5Ww6nOpjO', NULL, '2025-06-25 06:53:13', '2025-06-25 06:53:13'),
(181, 'Kusnadi /kontrakan Burhan', 'kusnadi_kontrakan_burhan@example.com', NULL, '$2y$12$R8/68bo4HG9ATX8T.tV.Fu.RTaetK5u5WdjDaadXZW0GCV18n63DK', NULL, '2025-06-25 06:53:14', '2025-06-25 06:53:14'),
(182, 'Lilik Triyuniati', 'lilik_triyuniati@example.com', NULL, '$2y$12$Ci7Qu/l/jEltY9MmaCN8X.urEYcigIFyWw.xhcZQ7yRHwyL.Fa5z.', NULL, '2025-06-25 06:53:15', '2025-06-25 06:53:15'),
(183, 'Lilis Citrawati Barnas', 'lilis_citrawati_barnas@example.com', NULL, '$2y$12$jFvlm8khUdeswIKVmhH3yebaxDCyaFEnOL5B83/5IOknbm6sV.LO.', NULL, '2025-06-25 06:53:16', '2025-06-25 06:53:16'),
(184, 'Linda Susanti', 'linda_susanti@example.com', NULL, '$2y$12$ZC/N6KDk51f3GW0gh86lm.9iIGWR4RLDMrzhKxSesBykmikA7Ox5C', NULL, '2025-06-25 06:53:16', '2025-06-25 06:53:16'),
(185, 'Lukman Setiawan', 'lukman_setiawan@example.com', NULL, '$2y$12$0KsU29ZHxdTP9KWGq77OaugeRrsCOaHm36Q.DM2D19.CJCvzCdkoe', NULL, '2025-06-25 06:53:17', '2025-06-25 06:53:17'),
(186, 'Lukmanul Hakim', 'lukmanul_hakim@example.com', NULL, '$2y$12$ISE8AFSAuvuIuyX4ryPI8Oh5yDvJFNZHZjicg4oja7V1ymlaHlQym', NULL, '2025-06-25 06:53:18', '2025-06-25 06:53:18'),
(187, 'M .taufan', 'm_taufan@example.com', NULL, '$2y$12$sbIMhGj9wtHSYJ1Ry907NeZOJHDvXrAD2TQyIr75hN784qj8Oe7w.', NULL, '2025-06-25 06:53:19', '2025-06-25 06:53:19'),
(188, 'M. Nawi', 'm_nawi@example.com', NULL, '$2y$12$lM9Vbd.v2UF/iopc2HzybeHNacN1WG67LBtjBKftiRWk6HkHRtvyK', NULL, '2025-06-25 06:53:20', '2025-06-25 06:53:20'),
(189, 'M. Soleh', 'm_soleh@example.com', NULL, '$2y$12$mycQo1ZitzStAqmyMDaXde4C75Wyl5YXi2L3nwD0xR/6slnYuGfrC', NULL, '2025-06-25 06:53:21', '2025-06-25 06:53:21'),
(190, 'Ma\' Asah', 'ma_asah@example.com', NULL, '$2y$12$.9ZaI24tjY4aRIZqY1F8hecKdqPnTqnG4RwEDS0J.78qVx0HWFTEm', NULL, '2025-06-25 06:53:22', '2025-06-25 06:53:22'),
(191, 'Madjuk', 'madjuk@example.com', NULL, '$2y$12$h2JMXf.skZHydBzIZba6Iu42bF9s4gynuspuqVy4CXzFdE23mCkaa', NULL, '2025-06-25 06:53:23', '2025-06-25 06:53:23'),
(192, 'Mardanih', 'mardanih@example.com', NULL, '$2y$12$rfyYMTGE85uDAlaRImC1v.CJApghERV//gp2I/wrnnvDTMxBo8f2y', NULL, '2025-06-25 06:53:23', '2025-06-25 06:53:23'),
(193, 'Mardiyansyah', 'mardiyansyah@example.com', NULL, '$2y$12$Y3QHVfH9XiOzoE2GtjsnNOL69BZEX7CcTVBME43IGVtZaB1SKH/zC', NULL, '2025-06-25 06:53:24', '2025-06-25 06:53:24'),
(194, 'Marhanih Bon Yanih', 'marhanih_bon_yanih@example.com', NULL, '$2y$12$Yxu4xQrYU1jArTUqSe8V8uxK3mr1dwbpZOToIbJJ2HK4CVU.BBujK', NULL, '2025-06-25 06:53:25', '2025-06-25 06:53:25'),
(195, 'Marhasan', 'marhasan@example.com', NULL, '$2y$12$xbuOJeFdmLiRNJnz/bQeXuSkbdjna4xLDqPmV6fyrw4qHCxEU17Wm', NULL, '2025-06-25 06:53:26', '2025-06-25 06:53:26'),
(196, 'Maria Novalia F', 'maria_novalia_f@example.com', NULL, '$2y$12$/L.v9W9ryR8PlwMTHSW9LuHUemIcXjEJ5sAYy1NDFnZnb7yO46Cg2', NULL, '2025-06-25 06:53:27', '2025-06-25 06:53:27'),
(197, 'Mariman', 'mariman@example.com', NULL, '$2y$12$ICG8NQbsatQ24xRhBo5gVOksGTkr9WufnI.7W5.A6z4/ClgINn3tu', NULL, '2025-06-25 06:53:28', '2025-06-25 06:53:28'),
(198, 'Marully Purnama', 'marully_purnama@example.com', NULL, '$2y$12$MEPENKFBOYFBzBPUXAaLaehzY/duqIAOYc4p4GKkvN16FdFZs8uYa', NULL, '2025-06-25 06:53:29', '2025-06-25 06:53:29'),
(199, 'Maruloh /kont Bu Yeni', 'maruloh_kont_bu_yeni@example.com', NULL, '$2y$12$De9bk6DFCnhepNnHusq2bu150EI4epmFFadRWEo/el8d7.bZjorJ6', NULL, '2025-06-25 06:53:30', '2025-06-25 06:53:30'),
(200, 'Maryadi', 'maryadi@example.com', NULL, '$2y$12$XfjXT6t8AO70VR28bD2i6.YSfHMjNX7A/PknYbuFNTCD3bocOPfra', NULL, '2025-06-25 06:53:31', '2025-06-25 06:53:31'),
(201, 'Maryadi Martin', 'maryadi_martin@example.com', NULL, '$2y$12$qd95j.yXdXGTMzoBxl1s/.nGDVHeWQbKsgG86uqlWICeF.NLm6Hhi', NULL, '2025-06-25 06:53:31', '2025-06-25 06:53:31'),
(202, 'Mas El / Bakmi', 'mas_el_bakmi@example.com', NULL, '$2y$12$aYKW.MWK.Ml5QB98Xc4oJumXqGaiLScAAZ8FsonbYGlK9oseOHWyO', NULL, '2025-06-25 06:53:32', '2025-06-25 06:53:32'),
(203, 'Maulana Imam Sadewa', 'maulana_imam_sadewa@example.com', NULL, '$2y$12$AxD1anUPY4zCxcJ8BjCybOv6367FsxFmQeD10ZmKiiJaaeCl3Boei', NULL, '2025-06-25 06:53:33', '2025-06-25 06:53:33'),
(204, 'Mbah Kasiah', 'mbah_kasiah@example.com', NULL, '$2y$12$40.lghC.vI8JyitXGNxmWeHtnVw3U/Ve0lVlqMaA.Tm7sgiTXbVHi', NULL, '2025-06-25 06:53:34', '2025-06-25 06:53:34'),
(205, 'Meldin Saragih', 'meldin_saragih@example.com', NULL, '$2y$12$n9AkcPs.RnroE1B2qgsHwuQvrXwfj/AyAdumzf1xsdve.mHD0TF5u', NULL, '2025-06-25 06:53:35', '2025-06-25 06:53:35'),
(206, 'Mingun', 'mingun@example.com', NULL, '$2y$12$a6IByj0JmR7vLqeYcDJi9.wMFE1ZgQLgzQqjDWQA2GmSoWUKJgTnG', NULL, '2025-06-25 06:53:36', '2025-06-25 06:53:36'),
(207, 'Misar', 'misar@example.com', NULL, '$2y$12$Xe8CHQhWw.Xv2eZz/3H8.OXRqPc8VspVEkXAsERJySM275JjrCf.S', NULL, '2025-06-25 06:53:37', '2025-06-25 06:53:37'),
(208, 'Misman', 'misman@example.com', NULL, '$2y$12$MLgFiWWjWMdM7HZlTUwTU.hR6lVfDHTB2TZ2HPSJKOTMivCSFpoMW', NULL, '2025-06-25 06:53:37', '2025-06-25 06:53:37'),
(209, 'Moh Abdul Halim', 'moh_abdul_halim@example.com', NULL, '$2y$12$37HYSvAW8wtU0uHUDlYOfudzSPnfdwiL8eWfa1fLN3FFXcvggDv5i', NULL, '2025-06-25 06:53:38', '2025-06-25 06:53:38'),
(210, 'Moh. Abdillah', 'moh_abdillah@example.com', NULL, '$2y$12$a6flcfDtaj9XHFiaSGHA7eK3EMZi93lmnxuoVNsdlj1b.dXQf2J6S', NULL, '2025-06-25 06:53:39', '2025-06-25 06:53:39'),
(211, 'Muchlis', 'muchlis@example.com', NULL, '$2y$12$Vm4/1qZw6KiURol0CDw1supdSAEVeumLrKTTvZXNI5xUeOnfCpEsO', NULL, '2025-06-25 06:53:40', '2025-06-25 06:53:40'),
(212, 'Mugiyani', 'mugiyani@example.com', NULL, '$2y$12$vhknAb94Y9IHVY0a47r1K.RJCR6TSLi4jrSP78P/wtm9.bx65QotO', NULL, '2025-06-25 06:53:41', '2025-06-25 06:53:41'),
(213, 'Muh. Rizki', 'muh_rizki@example.com', NULL, '$2y$12$O1.qNJF6oawVy5jMJSRRLeeAVc8gkV7JDFoiDHKAKopaa3riMBXdy', NULL, '2025-06-25 06:53:42', '2025-06-25 06:53:42'),
(214, 'Muhamad Budi', 'muhamad_budi@example.com', NULL, '$2y$12$vGp8wrjs19xeLifvbdixEeF/jNNgRx9k2sptCRmYnt4.xg68OFf8C', NULL, '2025-06-25 06:53:43', '2025-06-25 06:53:43'),
(215, 'Muhamad Fauzi', 'muhamad_fauzi@example.com', NULL, '$2y$12$7tNFPAUr/X3Tci4cTIStOefrzSywbaLRxSB6b6rc1Sziyz9kXa8oC', NULL, '2025-06-25 06:53:44', '2025-06-25 06:53:44'),
(216, 'Mujarwo', 'mujarwo@example.com', NULL, '$2y$12$oqLnWYT5UwPozVNAPDNfeOTb924927GPl3ZVj318i0bil9adyg1a6', NULL, '2025-06-25 06:53:45', '2025-06-25 06:53:45'),
(217, 'Mujiran', 'mujiran@example.com', NULL, '$2y$12$WURnBXWeAI5SlkeLiLn/NO0lgjKSgnhC4Ew7YtIptsBRqpqWR0RQC', NULL, '2025-06-25 06:53:45', '2025-06-25 06:53:45'),
(218, 'Munzir', 'munzir@example.com', NULL, '$2y$12$oOK1cX8K.V.Garv.0mil../0M2zs7lZYO2PpX4B9.9twYs5v8fsqC', NULL, '2025-06-25 06:53:46', '2025-06-25 06:53:46'),
(219, 'Musa Alamilahsan', 'musa_alamilahsan@example.com', NULL, '$2y$12$4gfRAhL.kkN90mro4.DBTu.vbF3zYLmHC7hZVK0y5wiF.f9OW7wQK', NULL, '2025-06-25 06:53:47', '2025-06-25 06:53:47'),
(220, 'Mustofa', 'mustofa@example.com', NULL, '$2y$12$tpg5O631FC6h3JO/BMzO3ufEOhOOJ92ZDq1mToa6j3rdyJlNwUBq2', NULL, '2025-06-25 06:53:48', '2025-06-25 06:53:48'),
(221, 'Nani/ Kontrakan Windi R', 'nani_kontrakan_windi_r@example.com', NULL, '$2y$12$tLyUzHXC6imuYeYIzqRMHOx2k2DwIL9qzP92AVpm7AvdRgnOItMwe', NULL, '2025-06-25 06:53:49', '2025-06-25 06:53:49'),
(222, 'Napsiah', 'napsiah@example.com', NULL, '$2y$12$x9KRwjz02p4bb4ou4fj7suq.T0NeTy2qucRmPXc8rc7H9Giq/5S0O', NULL, '2025-06-25 06:53:50', '2025-06-25 06:53:50'),
(223, 'Nasir', 'nasir@example.com', NULL, '$2y$12$aTgInLYnbonmB4lHeMEUzuip1bdlpXHpK1vRuOZyQkCke3qot5PaG', NULL, '2025-06-25 06:53:51', '2025-06-25 06:53:51'),
(224, 'Nemin', 'nemin@example.com', NULL, '$2y$12$cLTRIkyEQ7m09UxolZjSkOgwKaKU.TRq8p.9FltrXZvCAvpuNhk3u', NULL, '2025-06-25 06:53:52', '2025-06-25 06:53:52'),
(225, 'Nesah Budiman / Kontrakan H. Sriyanto', 'nesah_budiman_kontrakan_h_sriyanto@example.com', NULL, '$2y$12$JDTkA5AZop0AhxsrQji7ReYhDxzbg1MHQ3uDnaeuQ9z/er35mYsg2', NULL, '2025-06-25 06:53:53', '2025-06-25 06:53:53'),
(226, 'Ngesti', 'ngesti@example.com', NULL, '$2y$12$UCPqVX05rTVROq64u5MWFuz8N0.wFg6ChMc9ELaVqWUEbJXjToJWK', NULL, '2025-06-25 06:53:54', '2025-06-25 06:53:54'),
(227, 'Nike', 'nike@example.com', NULL, '$2y$12$OdFk2Eew5o8neco5r0UGQ.uKTqwDXAM57hJTFrxS7A5PweS.eDHcC', NULL, '2025-06-25 06:53:54', '2025-06-25 06:53:54'),
(228, 'Niken', 'niken@example.com', NULL, '$2y$12$tyflgzt5s0taakUTmVgTXeWBOGB7At/2rRcKyxK26F19SFc2K4rWm', NULL, '2025-06-25 06:53:55', '2025-06-25 06:53:55'),
(229, 'Nonot Suhartono', 'nonot_suhartono@example.com', NULL, '$2y$12$wDHB8lRUQIenWJM6qx7nb.DPXo8TP5GchTR97YDLw3UkHR/5jzziC', NULL, '2025-06-25 06:53:56', '2025-06-25 06:53:56'),
(230, 'Noviar Arief', 'noviar_arief@example.com', NULL, '$2y$12$VYn8ibJP5.u.UTsAPRD9a.68cDkCivx7BbKZu/wHo.736GSWHxVWu', NULL, '2025-06-25 06:53:57', '2025-06-25 06:53:57'),
(231, 'Nur Kusuma Irawan', 'nur_kusuma_irawan@example.com', NULL, '$2y$12$Rk2zwKvc7VNSCjvL9WAePeZjQG0fWZrA5NPW68QCL3E4F4qlGj.ge', NULL, '2025-06-25 06:53:58', '2025-06-25 06:53:58'),
(232, 'Nur Nahdiah Ang', 'nur_nahdiah_ang@example.com', NULL, '$2y$12$EB8R.WQZ77eHKTZuJhsqZ.zRRu93fHH3FFwoHSXIlSuUlkATCDjW6', NULL, '2025-06-25 06:53:59', '2025-06-25 06:53:59'),
(233, 'Nurbaiti Zamzami', 'nurbaiti_zamzami@example.com', NULL, '$2y$12$2g7HSQHotKJJDlyC33.5zeRLLRrNt/mC0hnD03R7EX/Pyoqqbz7G2', NULL, '2025-06-25 06:54:00', '2025-06-25 06:54:00'),
(234, 'Nurdin', 'nurdin@example.com', NULL, '$2y$12$.C3.TF.ZI6jms47qYtFwk.i.LAI0aHlhGjjKbnJB3ymdTkYbDsfzi', NULL, '2025-06-25 06:54:01', '2025-06-25 06:54:01'),
(235, 'Nurhayati', 'nurhayati@example.com', NULL, '$2y$12$h4GtsjjTB0T54.bimtV2CuooT1exTkZkro6WBgmpC3I7r6yCiwr8m', NULL, '2025-06-25 06:54:02', '2025-06-25 06:54:02'),
(236, 'Nurhayati/zaki/rumani', 'nurhayati_zaki_rumani@example.com', NULL, '$2y$12$i0YyAkYhMxxkPtciTYdxUOVRG9EbYTx/dzBqMb4aZF/qX6bfMp62.', NULL, '2025-06-25 06:54:03', '2025-06-25 06:54:03'),
(237, 'Nurman Effendi', 'nurman_effendi@example.com', NULL, '$2y$12$BSu0TtOIWT8VvSrHfzcOC.M/ALEC0ql/gPNix3QQX9RTovFkgIDz2', NULL, '2025-06-25 06:54:03', '2025-06-25 06:54:03'),
(238, 'Nursalim', 'nursalim@example.com', NULL, '$2y$12$nNGMFHwjAszl/hx3yqyQW.zl8bhxVcozVRVWRTlKjwgrvtNt8Vmr.', NULL, '2025-06-25 06:54:04', '2025-06-25 06:54:04'),
(239, 'Nurussyam Eky Gusti P', 'nurussyam_eky_gusti_p@example.com', NULL, '$2y$12$nJkuHm.DRCe63728eDID3er0YRa.I51/zVEY4fxm9JIW6wJN1Frhi', NULL, '2025-06-25 06:54:05', '2025-06-25 06:54:05'),
(240, 'Olive / Siti', 'olive_siti@example.com', NULL, '$2y$12$2HSWjpEofwLKoQbptoonKujjBhOQ7EKMpN.X6lT8VLEAtiddmQ7oK', NULL, '2025-06-25 06:54:06', '2025-06-25 06:54:06'),
(241, 'Ope Korang', 'ope_korang@example.com', NULL, '$2y$12$ZIHNrKkN0RTCfw4eCW0.feRY37od166d3nlyWNg24lavTOX/4lNay', NULL, '2025-06-25 06:54:07', '2025-06-25 06:54:07'),
(242, 'Pance', 'pance@example.com', NULL, '$2y$12$.pkEuPEJ27qn3li8UExhfuDwSWArCTLELpNy0tSpKDcL6brm28k4e', NULL, '2025-06-25 06:54:08', '2025-06-25 06:54:08'),
(243, 'Pandu Eka Sakti', 'pandu_eka_sakti@example.com', NULL, '$2y$12$ylDmK/NrSBpZXopff4wkY.0f.4TBt4k5/hCzgBBZNkQUnwdx0x2X6', NULL, '2025-06-25 06:54:09', '2025-06-25 06:54:09'),
(244, 'Panji', 'panji@example.com', NULL, '$2y$12$wWREreLPl4YcIGslO6dfxOxdAfaNfm6Zu1vnr.Cf9IACMXjN3TCP2', NULL, '2025-06-25 06:54:10', '2025-06-25 06:54:10'),
(245, 'Parsi', 'parsi@example.com', NULL, '$2y$12$j8CsusFdQ9Q2YMSTEeNTo.8g6xbnY48EbDBUmqYeeTwYzWMrnw0bq', NULL, '2025-06-25 06:54:10', '2025-06-25 06:54:10'),
(246, 'Parulian', 'parulian@example.com', NULL, '$2y$12$/IBnVeYQEKbbYO6FIQP6t.kCPRV/4C2nPNoSlkUJbi224O.oSVzI6', NULL, '2025-06-25 06:54:11', '2025-06-25 06:54:11'),
(247, 'Priandra', 'priandra@example.com', NULL, '$2y$12$AKaoAs8fHGEbE3BsryQreezxYnZslAf38znfjmddsuNlkCmH4Vmj.', NULL, '2025-06-25 06:54:12', '2025-06-25 06:54:12'),
(248, 'Priyandra', 'priyandra@example.com', NULL, '$2y$12$qOS0wJxCQFhkyW0AZfeU1uRusr/M8j9Fh3myJ9rfzzmbxd2YtN8m6', NULL, '2025-06-25 06:54:13', '2025-06-25 06:54:13'),
(249, 'Priyo', 'priyo@example.com', NULL, '$2y$12$0xuG5HWDWCYMSyWEFwiCH.4ALJkpR51o6nFcIXQhWHACPyH9DHWYq', NULL, '2025-06-25 06:54:14', '2025-06-25 06:54:14'),
(250, 'Pt Mora Telematika Indonesia', 'pt_mora_telematika_indonesia@example.com', NULL, '$2y$12$fagllotooMjQnKLwdpmfPuLR.Y0ogkJOGXvE6LcAvSSl.Vkye4oxi', NULL, '2025-06-25 06:54:15', '2025-06-25 06:54:15'),
(251, 'Puji Avianto', 'puji_avianto@example.com', NULL, '$2y$12$Rw1Kx6jgqHtkpEI67LwMyOan2e0Em5Zl98uvIl.boPHNi.jskBXpm', NULL, '2025-06-25 06:54:16', '2025-06-25 06:54:16'),
(252, 'Purnomo', 'purnomo@example.com', NULL, '$2y$12$ZMseEK2g1c2XcLEIRP6Vyu79SxLa/XiXOj3f.5iz0/QiEdwCkf4qC', NULL, '2025-06-25 06:54:17', '2025-06-25 06:54:17'),
(253, 'Putra Dirmawan', 'putra_dirmawan@example.com', NULL, '$2y$12$MptO3Vcx00N3yZa56KCiVu0GNm787IypqU4KDdY4.fxY5Ar4EzD9K', NULL, '2025-06-25 06:54:17', '2025-06-25 06:54:17'),
(254, 'R. Dudung', 'r_dudung@example.com', NULL, '$2y$12$5dX3S1SKrrbrTsDiBe9b0uVp5yuP.FCGl.Sj3NjciWIBBvu4j6j5q', NULL, '2025-06-25 06:54:18', '2025-06-25 06:54:18'),
(255, 'R. Triyanto Ws', 'r_triyanto_ws@example.com', NULL, '$2y$12$x4kECxMnBHLNH4yzQ/Txy.3WXuSW6IDnLqJBimEo1dGPQfjJM9GMa', NULL, '2025-06-25 06:54:19', '2025-06-25 06:54:19'),
(256, 'Raja / Kontrakan Burhan', 'raja_kontrakan_burhan@example.com', NULL, '$2y$12$5lAvbqSJLsPOLPkl3wtbv.EMNIlDc.NPnRznasGHK9Ei9rYMtK3Ty', NULL, '2025-06-25 06:54:20', '2025-06-25 06:54:20'),
(257, 'Ramces', 'ramces@example.com', NULL, '$2y$12$ggi7MJ6NwZBo.oXjRseZhOTJPJ1ehIr1lfrg5XZmMCzN/ZdsvCWO6', NULL, '2025-06-25 06:54:21', '2025-06-25 06:54:21'),
(258, 'Ramelan', 'ramelan@example.com', NULL, '$2y$12$EXZV25n50Ne1MYBKay3Zuu5rOI3Abjldtgkra0fFs0P5M66xBlnfi', NULL, '2025-06-25 06:54:22', '2025-06-25 06:54:22'),
(259, 'Ramli Bin Abudarwis', 'ramli_bin_abudarwis@example.com', NULL, '$2y$12$.ERObmwnquwC5qUw7kbrte71k1cKTUzTnkoeX9pHHuQZI2J9C7iGm', NULL, '2025-06-25 06:54:23', '2025-06-25 06:54:23'),
(260, 'Ratna Dewi', 'ratna_dewi@example.com', NULL, '$2y$12$hZyy13/M5gJlRCeFEE4doObQS1Lb/HZ5aN6QlgBZkyER/H0d1S2PO', NULL, '2025-06-25 06:54:24', '2025-06-25 06:54:24'),
(261, 'Richard', 'richard@example.com', NULL, '$2y$12$uJ8OG2dOUjjjfJYRhM3hCe1Gv.n1/oMcHM6CHnV5iCyjzENHzLZTq', NULL, '2025-06-25 06:54:25', '2025-06-25 06:54:25'),
(262, 'Ricky Rudolf', 'ricky_rudolf@example.com', NULL, '$2y$12$4jHJfvWunS4dbu4Xv2n8MezyoqkWA7gH2ZoSsCGcU4GkOdhAHbu6.', NULL, '2025-06-25 06:54:26', '2025-06-25 06:54:26'),
(263, 'Rifki/ Kontrakan H. Karjo', 'rifki_kontrakan_h_karjo@example.com', NULL, '$2y$12$DnNjr/NTwRV7EoR2ubT6reoHtfFPIkNuBSbdFryX3vbTp8wt2LMMq', NULL, '2025-06-25 06:54:27', '2025-06-25 06:54:27'),
(264, 'Rini / Kontrakan Sujak', 'rini_kontrakan_sujak@example.com', NULL, '$2y$12$U3uhYgZgJCiOap9IQT7Mv.vWKPAVH9TG4ZiJetMXJ2pHxv1mNjXzC', NULL, '2025-06-25 06:54:28', '2025-06-25 06:54:28'),
(265, 'Ripto', 'ripto@example.com', NULL, '$2y$12$wh0tWAj5hXxnxfj4YoVbq.KwYLX.fw2NxJfpTD9QH.KJZEfvdUm1C', NULL, '2025-06-25 06:54:29', '2025-06-25 06:54:29'),
(266, 'Risaman', 'risaman@example.com', NULL, '$2y$12$U/miFasMUldbEtA8QW4xE.2f5NIQDZSuN3S1tA15M0DUMphsNZlLy', NULL, '2025-06-25 06:54:29', '2025-06-25 06:54:29'),
(267, 'Robby Apriliyanto / Gas', 'robby_apriliyanto_gas@example.com', NULL, '$2y$12$TtYlEmuMgPh6jyuTE6Tjg.VyLGupAEuLEu5FTk.rk7AEBJXbUYppK', NULL, '2025-06-25 06:54:30', '2025-06-25 06:54:30'),
(268, 'Robi Habibuloh', 'robi_habibuloh@example.com', NULL, '$2y$12$v69FJB5wW4HVVarMvX2MlOs2jR.O.jZM78ogcUI5mvBYBAAY9/rZC', NULL, '2025-06-25 06:54:31', '2025-06-25 06:54:31'),
(269, 'Rochmat', 'rochmat@example.com', NULL, '$2y$12$1AGYlwMFDVsjLZ43Pl1pCOqlPBj7hi.Ps/IabGkhbsfOXVn/iad4O', NULL, '2025-06-25 06:54:32', '2025-06-25 06:54:32'),
(270, 'Rochyat', 'rochyat@example.com', NULL, '$2y$12$vIpoPYrRZk4pLA3MIqGec.va7fLvZY3GsvgWQybU0ZhycUxEJQjKK', NULL, '2025-06-25 06:54:33', '2025-06-25 06:54:33'),
(271, 'Rohamah', 'rohamah@example.com', NULL, '$2y$12$uOG55PbQR03bOrc/Uo7VIOpDuSz4Xp7ytTGuUvRoRnn5SWOrNv23e', NULL, '2025-06-25 06:54:34', '2025-06-25 06:54:34'),
(272, 'Rohaya', 'rohaya@example.com', NULL, '$2y$12$PzlNAH2lCIad9.P1a.HKL.CYzDx16nNMDB4Zr3q.PqTyHV0794ye.', NULL, '2025-06-25 06:54:35', '2025-06-25 06:54:35'),
(273, 'Rohmad Nur Sidiq Z', 'rohmad_nur_sidiq_z@example.com', NULL, '$2y$12$GNN.wnMb4A6P52T.VHzCOuQuoOMZ/CYKDwbNQdlbqWF8Cvsiv/xTa', NULL, '2025-06-25 06:54:36', '2025-06-25 06:54:36'),
(274, 'Rohman Es Kelapa', 'rohman_es_kelapa@example.com', NULL, '$2y$12$vwpf/lF4DBuVfJ73rNMcjuuwV08dsyQSNB62mpU4YNnOZoSiAJuwe', NULL, '2025-06-25 06:54:37', '2025-06-25 06:54:37'),
(275, 'Roni ( Toko Lampu)', 'roni_toko_lampu_@example.com', NULL, '$2y$12$MWUsfQWQqAsqcBOYZb7NCu0gzBZVV6cMuja0ky/sLmBQU3Ryg9uoa', NULL, '2025-06-25 06:54:38', '2025-06-25 06:54:38'),
(276, 'Roswati', 'roswati@example.com', NULL, '$2y$12$CjhIdRXBI.HzgMrt52o47OVYO5mO2BXSGxfByJPKXyvbzPml3iLmW', NULL, '2025-06-25 06:54:39', '2025-06-25 06:54:39'),
(277, 'Rozak', 'rozak@example.com', NULL, '$2y$12$tMTGyXRUfLxoFK7ag0Benu0.XiyRe3udCFoq1FuRQU3FjmIlb6xIS', NULL, '2025-06-25 06:54:39', '2025-06-25 06:54:39'),
(278, 'Rusdi', 'rusdi@example.com', NULL, '$2y$12$c4I6xzCu0yxcBLRGu1vJsOjC18X9cb8vTAFnPTj0n6bUmTTz6e/6O', NULL, '2025-06-25 06:54:40', '2025-06-25 06:54:40'),
(279, 'Rushadi', 'rushadi@example.com', NULL, '$2y$12$yzqiupmJS8WxnSHadEKmDOlctvdy9o6tkXf5DwZhuwfOnhV.fw61u', NULL, '2025-06-25 06:54:41', '2025-06-25 06:54:41'),
(280, 'S. Yantini', 's_yantini@example.com', NULL, '$2y$12$fcezoE3U.hT8bygU/XTQRuXNBNK0bo/B2AQfjRvsXWQdyn89juIee', NULL, '2025-06-25 06:54:42', '2025-06-25 06:54:42'),
(281, 'Sagino', 'sagino@example.com', NULL, '$2y$12$hMv8/l0Gpd7cDqyEyLlq5es8kbqT9kJyzpRsdV4tgQ7GMpAZaVaOW', NULL, '2025-06-25 06:54:43', '2025-06-25 06:54:43'),
(282, 'Sahroni', 'sahroni@example.com', NULL, '$2y$12$1VUAz3VqdR1AQQz1TB7fu.Wkywmgb9Wj7KuankpSwi6D1MkgV2iS6', NULL, '2025-06-25 06:54:44', '2025-06-25 06:54:44'),
(283, 'Said Edy', 'said_edy@example.com', NULL, '$2y$12$IrdWAeydBwWHDgoj.AYDjeb1HFH.JDbXUfTkaCuPEMSiMX8drfLRq', NULL, '2025-06-25 06:54:45', '2025-06-25 06:54:45'),
(284, 'Sarmada', 'sarmada@example.com', NULL, '$2y$12$RDO/wuk/hEbi.xQRWDV2Yew1/ItdBB2cfN/FGthlBqYqHtZhGqQVW', NULL, '2025-06-25 06:54:46', '2025-06-25 06:54:46'),
(285, 'Sarmin', 'sarmin@example.com', NULL, '$2y$12$HMg96VRhN2ipvOH4xNoD8eb8cWV3m5BcmdYcyfZszAbLE/HGLsxKK', NULL, '2025-06-25 06:54:47', '2025-06-25 06:54:47'),
(286, 'Saryali', 'saryali@example.com', NULL, '$2y$12$ocyCtRprpj/MUAeff6OW2.9PH3N21kZWGgQd7s0EQ5YQFwQk9/Dh6', NULL, '2025-06-25 06:54:48', '2025-06-25 06:54:48'),
(287, 'Satibi / Sate', 'satibi_sate@example.com', NULL, '$2y$12$KhiuRVLz3Q.iCkArSUFl1.5xIs.7KZFeEDrYh0Lvg9B5FB8aAmO1K', NULL, '2025-06-25 06:54:49', '2025-06-25 06:54:49'),
(288, 'Saut Nainggolan', 'saut_nainggolan@example.com', NULL, '$2y$12$.YWtnWOaPofTvZuiXcPVbe/FTW0UiT7PX91F29gOtjLprat2d8dCu', NULL, '2025-06-25 06:54:49', '2025-06-25 06:54:49'),
(289, 'Sayudi', 'sayudi@example.com', NULL, '$2y$12$buNzSh0D82590DNEiutVr.AyJp5GyAkcQrdWC.mmMW7O7JZErvTMG', NULL, '2025-06-25 06:54:50', '2025-06-25 06:54:50'),
(290, 'Semar Coffe', 'semar_coffe@example.com', NULL, '$2y$12$8KcBkaDnRt.M.1Vn/Lk2veH2C4I0KN0b/cOIhW/8foOBKO1Xgy2Ai', NULL, '2025-06-25 06:54:51', '2025-06-25 06:54:51'),
(291, 'Senja / Anugrah Prasetiadi', 'senja_anugrah_prasetiadi@example.com', NULL, '$2y$12$5bc4HRpe/WzKr/WbXbe/dOtBt6/dO7eDrwO4xDuiIDxRUXdpWAFCa', NULL, '2025-06-25 06:54:52', '2025-06-25 06:54:52');
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(292, 'Sim Nerie', 'sim_nerie@example.com', NULL, '$2y$12$.CPnt0ljHgIwEOyHupGZT.gaTpcOeI0K9raDC/1JkVNkww49c/e1y', NULL, '2025-06-25 06:54:53', '2025-06-25 06:54:53'),
(293, 'Sinta', 'sinta@example.com', NULL, '$2y$12$vFi16vVQ6oZQSCyKdtjSdODaTLo6P0lxYiv/2h.X0KqN7nKN4n67i', NULL, '2025-06-25 06:54:54', '2025-06-25 06:54:54'),
(294, 'Siswanto Cahyo Bakti', 'siswanto_cahyo_bakti@example.com', NULL, '$2y$12$TUkUwXTLHbcaWYrJtXfouuZMrJk6ZeobaCqSgc7m2PCkpAeTTrAhu', NULL, '2025-06-25 06:54:55', '2025-06-25 06:54:55'),
(295, 'Siti /kios Baju H. Karjo', 'siti_kios_baju_h_karjo@example.com', NULL, '$2y$12$oskPPME9Gq/96YbnfrObHeWyVIl25Gba1DgT1KMahGkcY7z8aNuxa', NULL, '2025-06-25 06:54:56', '2025-06-25 06:54:56'),
(296, 'Siti Suryani Encun', 'siti_suryani_encun@example.com', NULL, '$2y$12$E3GfoDTpKHXJfuQmV5AnbuYWXKrDCKDO4S4dGVk2fysRRR4GLzeRe', NULL, '2025-06-25 06:54:57', '2025-06-25 06:54:57'),
(297, 'Siti Yuliana S Pdi', 'siti_yuliana_s_pdi@example.com', NULL, '$2y$12$d.nup2zCFlWCUtgtvcP7k.KNYYZ1PhoJLirCTRm/k8wy3Bvl9Qd.m', NULL, '2025-06-25 06:54:58', '2025-06-25 06:54:58'),
(298, 'Soeryadi', 'soeryadi@example.com', NULL, '$2y$12$PYV7Do3gH10V5t2VrdrWkOji8IryonoP1fGuL91g2NXY5E14IlP1O', NULL, '2025-06-25 06:55:00', '2025-06-25 06:55:00'),
(299, 'Sofwan Helmi', 'sofwan_helmi@example.com', NULL, '$2y$12$E4lomPiRRsC40Ykjh9BDiOt7gjasMjALwQsdOuYgNnIPKG4MwX4pi', NULL, '2025-06-25 06:55:00', '2025-06-25 06:55:00'),
(300, 'Soni Indi .p', 'soni_indi_p@example.com', NULL, '$2y$12$bIX5R01w4GvbOF4rppIaiuqfS7mlCApO/0Ki6kLdMGyo/NJOMcLmq', NULL, '2025-06-25 06:55:02', '2025-06-25 06:55:02'),
(301, 'Sri Mulyono', 'sri_mulyono@example.com', NULL, '$2y$12$p98/4j932i.xtY6sSFudU.I5MlNYS5raE67ZcgL21ceWEAb6a8.5a', NULL, '2025-06-25 06:55:03', '2025-06-25 06:55:03'),
(302, 'Sri Prihati', 'sri_prihati@example.com', NULL, '$2y$12$3KknUARKbE7MkVM9QKKre.6srBhgjyIymTxVMSvYKMM7e.yk1uPYW', NULL, '2025-06-25 06:55:04', '2025-06-25 06:55:04'),
(303, 'Sri Winarsi', 'sri_winarsi@example.com', NULL, '$2y$12$FKwFCzbbCbK6lvrDzuAbh.zlMOd3LTTgrSteNFUVi7Izmxe3jNLLS', NULL, '2025-06-25 06:55:05', '2025-06-25 06:55:05'),
(304, 'Srihandaya (ketua Rw 011)', 'srihandaya_ketua_rw_011_@example.com', NULL, '$2y$12$YAoyVvK7Mhl0OsGgpdtYP.90TSzG2HdfLU83BCU0/EPNp1WJnYc0O', NULL, '2025-06-25 06:55:06', '2025-06-25 06:55:06'),
(305, 'Sriyanto Kuswantoro', 'sriyanto_kuswantoro@example.com', NULL, '$2y$12$0t0kZqvpgGveMv1taUp0y.qkGACj4SxgptAb3.56olvYfgXDEcrfq', NULL, '2025-06-25 06:55:07', '2025-06-25 06:55:07'),
(306, 'Subhan Arif', 'subhan_arif@example.com', NULL, '$2y$12$zDH436TpVXb6K9lxE6ukluohyQvq2SfVdSIo2SsfzDKI6stOetZ/W', NULL, '2025-06-25 06:55:08', '2025-06-25 06:55:08'),
(307, 'Suchaedi', 'suchaedi@example.com', NULL, '$2y$12$crNPPu/gCUZ2lCkDsyFe/emlGnj0inHEnFzH9uFyw4zsJgvPzFkNS', NULL, '2025-06-25 06:55:09', '2025-06-25 06:55:09'),
(308, 'Sudarno', 'sudarno@example.com', NULL, '$2y$12$/bEzreRCYjpOnIT3m9lxQenyGiJZ1XqZmm13t9OfDpx2atiwp75zO', NULL, '2025-06-25 06:55:10', '2025-06-25 06:55:10'),
(309, 'Sudiyem', 'sudiyem@example.com', NULL, '$2y$12$tMa/WVJ9R2xkdp5kQRnEh.h3EAxixoohstRbUoYRm8uZxf5JF4vVG', NULL, '2025-06-25 06:55:11', '2025-06-25 06:55:11'),
(310, 'Sugeng', 'sugeng@example.com', NULL, '$2y$12$r5ikia76OcS51cJDV8BXHOzYb8iVlA9ru9dbBXBuJ7k/NTILzJ2GS', NULL, '2025-06-25 06:55:12', '2025-06-25 06:55:12'),
(311, 'Sugiono', 'sugiono@example.com', NULL, '$2y$12$czQpIZxjZToizTPVmUGR..SOG9wrrO0HJl9BWKtQl6zQX7nqLJvNC', NULL, '2025-06-25 06:55:13', '2025-06-25 06:55:13'),
(312, 'Suhandono', 'suhandono@example.com', NULL, '$2y$12$4GJMR5Nv4Jv53c/Vf9QV8.0Kf1/XdvIwe5IK6434VKr2Td8CHEJuK', NULL, '2025-06-25 06:55:14', '2025-06-25 06:55:14'),
(313, 'Suhandri', 'suhandri@example.com', NULL, '$2y$12$1XQ4Smtdne0hC3qbt2r89u0BNMHgKgDlqS9uhlhqaXpLPBvYjc34S', NULL, '2025-06-25 06:55:16', '2025-06-25 06:55:16'),
(314, 'Sujak', 'sujak@example.com', NULL, '$2y$12$CT.5d7qwQL7tABA6jZA96.X9Zd8.CQl1qCXzHae0BN7ypPc5PjZpS', NULL, '2025-06-25 06:55:17', '2025-06-25 06:55:17'),
(315, 'Sukamto', 'sukamto@example.com', NULL, '$2y$12$MZg0BkuaaiAJFPY66koTS.poh5EP0WoahAEKjpuD68mo9UBrx2tlm', NULL, '2025-06-25 06:55:19', '2025-06-25 06:55:19'),
(316, 'Sukarno / Sri', 'sukarno_sri@example.com', NULL, '$2y$12$k5scgQi9OyPvUehdNilSq.onnEHOhNTiCMCBGKwHmiQJhC8IFwYsC', NULL, '2025-06-25 06:55:21', '2025-06-25 06:55:21'),
(317, 'Sukatno / Bu Nur', 'sukatno_bu_nur@example.com', NULL, '$2y$12$nSQn42M0UdAq1s8SW6RJpux1Bn8CYmCWBR4w0cHK0kWrey1ON/lle', NULL, '2025-06-25 06:55:22', '2025-06-25 06:55:22'),
(318, 'Sukatno /eko', 'sukatno_eko@example.com', NULL, '$2y$12$myTrn7NozyCKu0ARJUtTk.TyvNRDYcFfa3tzjyjce5OrKTj1y6OnO', NULL, '2025-06-25 06:55:24', '2025-06-25 06:55:24'),
(319, 'Sukma Beauty', 'sukma_beauty@example.com', NULL, '$2y$12$PoMCqKTfdtSAVpzjIxRjyeJSj8mprh/1SaueKdW8vYE5RNl5Q7zfS', NULL, '2025-06-25 06:55:26', '2025-06-25 06:55:26'),
(320, 'Sukran / Hendra Sulistiawan', 'sukran_hendra_sulistiawan@example.com', NULL, '$2y$12$pgYOsjdeD5vXxoROJZ7EmuaQ7Q9ZZyW1o5gV8GZ9DSEYAc5sQO3tG', NULL, '2025-06-25 06:55:27', '2025-06-25 06:55:27'),
(321, 'Sukron', 'sukron@example.com', NULL, '$2y$12$eSzIDLf70Xknja4iswjGp.yxuRGrBUYaG6p/JmrRpnqn28O2Jxceu', NULL, '2025-06-25 06:55:29', '2025-06-25 06:55:29'),
(322, 'Sularno', 'sularno@example.com', NULL, '$2y$12$Fds1bIGFDPvXFjABzqdYVObLvMYbkZSfnYAfGu5PTH3.jXEaWG942', NULL, '2025-06-25 06:55:31', '2025-06-25 06:55:31'),
(323, 'Sulasmi', 'sulasmi@example.com', NULL, '$2y$12$lH1rqa3uKQ0JaRUjZMDd5OlxyHk9H1PRyITneqwcVXWq4UAgcMOf.', NULL, '2025-06-25 06:55:32', '2025-06-25 06:55:32'),
(324, 'Sumanta', 'sumanta@example.com', NULL, '$2y$12$dtkvb/3GsFMk/I4GF.oNYukJ0rirGOqddqEPoc4ZANevzsl2/rLd2', NULL, '2025-06-25 06:55:34', '2025-06-25 06:55:34'),
(325, 'Sumawan/toko Madura/ K. Marhasan', 'sumawan_toko_madura_k_marhasan@example.com', NULL, '$2y$12$EwKtxX5kQtF6v7QElcwqnuOketnR2EskulfQtlbd3kXLUZpQYDZWm', NULL, '2025-06-25 06:55:36', '2025-06-25 06:55:36'),
(326, 'Sumbang', 'sumbang@example.com', NULL, '$2y$12$teBq1oG/d0OpKhbMo/5Tlu3wlCZbRJlZQD1IHhgumFWGL2w1ppkOe', NULL, '2025-06-25 06:55:37', '2025-06-25 06:55:37'),
(327, 'Supriyanto', 'supriyanto@example.com', NULL, '$2y$12$79sGDShJRZQqZ8yqw.bzi.npQzHyxrMAT/XAKfR57qCizSPn8GDie', NULL, '2025-06-25 06:55:38', '2025-06-25 06:55:38'),
(328, 'Suranto', 'suranto@example.com', NULL, '$2y$12$oJ0qXQ1zlNZ73PVrqURc/ugrDDlBbDX1qyNQx2iA3St8tL2IY2VlO', NULL, '2025-06-25 06:55:39', '2025-06-25 06:55:39'),
(329, 'Suratno', 'suratno@example.com', NULL, '$2y$12$S8WV3.qO8pzOot7fA0mmcO6citgk1tLxsiBvuKXT.A7zDSsxthRY6', NULL, '2025-06-25 06:55:40', '2025-06-25 06:55:40'),
(330, 'Surya', 'surya@example.com', NULL, '$2y$12$y.oiRNoWEv.WzOobdOVL9.RKzuhDTzVRyeGC64rmIua.Vwc/Bcv5m', NULL, '2025-06-25 06:55:41', '2025-06-25 06:55:41'),
(331, 'Suryadi', 'suryadi@example.com', NULL, '$2y$12$u/YzGNBP80wc7eE178GlyuapmcFlXlalf/V5xmIgR5jN3yaSgWehW', NULL, '2025-06-25 06:55:42', '2025-06-25 06:55:42'),
(332, 'Sutarmi', 'sutarmi@example.com', NULL, '$2y$12$6BQ03DKYOS6sdInIWCfpe.EuAG0n7ugsR1Fjrlqs35KIp22UVUo6u', NULL, '2025-06-25 06:55:43', '2025-06-25 06:55:43'),
(333, 'Sutiyem', 'sutiyem@example.com', NULL, '$2y$12$rlE2yxEKJVQrkBMcdthB9OmnxHbPb9c3J1OjKhWh1vLc.4o/U1CkG', NULL, '2025-06-25 06:55:44', '2025-06-25 06:55:44'),
(334, 'Sutriyoko', 'sutriyoko@example.com', NULL, '$2y$12$9B7kdvUk/apH56mxydAA8.0MDu8dBlPvBhDriJEL8hlbwOuMBqWRm', NULL, '2025-06-25 06:55:45', '2025-06-25 06:55:45'),
(335, 'Syamsul Ma\'arif', 'syamsul_ma_arif@example.com', NULL, '$2y$12$Ro7lP.ovwPiamQbhlm/zzO3yuxcpXn6kd5Ke/bVeZ/eYlzDQzieNC', NULL, '2025-06-25 06:55:46', '2025-06-25 06:55:46'),
(336, 'Syarif / Jeruk', 'syarif_jeruk@example.com', NULL, '$2y$12$KnwEYZkt7uNAgmja9sFrAuyg74y2h9jKc.MgnmPfblSrg1p2V5cEq', NULL, '2025-06-25 06:55:47', '2025-06-25 06:55:47'),
(337, 'Syarifudin Arif', 'syarifudin_arif@example.com', NULL, '$2y$12$Ie6bRzEDNaMhxRDiDH5IHui6h2zpiH0OZPh9graoqZg01pjX1R/Tu', NULL, '2025-06-25 06:55:48', '2025-06-25 06:55:48'),
(338, 'Syawal', 'syawal@example.com', NULL, '$2y$12$FjVQHRA8mQoI3f8Sg7EVTOFPP.qNEd6s0NC7e6rXA.kRGR4PZyBlq', NULL, '2025-06-25 06:55:49', '2025-06-25 06:55:49'),
(339, 'Takbir Sm', 'takbir_sm@example.com', NULL, '$2y$12$t3eRVZTFQyZQswZrsTpDLOegfeVpdd7bjy3oD7F1q5HJsdsJNrQ3m', NULL, '2025-06-25 06:55:50', '2025-06-25 06:55:50'),
(340, 'Tari / Kontrakan Sujak', 'tari_kontrakan_sujak@example.com', NULL, '$2y$12$TJgFZIKsBTTO3xOQdFQz7uq417NL1ARQRijepNQSJXBzOitPpHEBy', NULL, '2025-06-25 06:55:51', '2025-06-25 06:55:51'),
(341, 'Teguh. Hermawan', 'teguh_hermawan@example.com', NULL, '$2y$12$OKwbYmz6Zv.7NlWMJjKtTOFbULlM/l3v5WjuvOD1eFQ3UCHJvdUnm', NULL, '2025-06-25 06:55:52', '2025-06-25 06:55:52'),
(342, 'Thoriq Alfarizi', 'thoriq_alfarizi@example.com', NULL, '$2y$12$c1YSm21eU5heg.eP/yOJvu/lF0kX4LNPZ7n21XmIV4IqfJIC9nf3.', NULL, '2025-06-25 06:55:53', '2025-06-25 06:55:53'),
(343, 'Tiara/ Kontrakan Soni', 'tiara_kontrakan_soni@example.com', NULL, '$2y$12$oy.ZOc6mPPsDEsMaXhuO0.ztV7aLIkAgVjDfG14cMY2Xoym2fEbTG', NULL, '2025-06-25 06:55:54', '2025-06-25 06:55:54'),
(344, 'Tiodora Sihombing', 'tiodora_sihombing@example.com', NULL, '$2y$12$2F.ffXdBDOdCCPal1ARYfOhwBOi6kwGARVTHCLfDfrs185DV95QfS', NULL, '2025-06-25 06:55:55', '2025-06-25 06:55:55'),
(345, 'Toko Akbar', 'toko_akbar@example.com', NULL, '$2y$12$4Rif9nHThsuleH51pAh1JeodXpjolW2ejwmXlphieyyeK3lZa.vpa', NULL, '2025-06-25 06:55:56', '2025-06-25 06:55:56'),
(346, 'Toko Beras / Kamal', 'toko_beras_kamal@example.com', NULL, '$2y$12$IcF9xdz56z/vNfOJDYUS9.mUtyiffiTDYGFUAwwj/idbgS1dI7uim', NULL, '2025-06-25 06:55:57', '2025-06-25 06:55:57'),
(347, 'Toko Yo Motor', 'toko_yo_motor@example.com', NULL, '$2y$12$TrgW/hlVOqTA7cZUuK0QWuvAnQLweqGdrz040vZRfg.72PAfV9D7O', NULL, '2025-06-25 06:55:58', '2025-06-25 06:55:58'),
(348, 'Toto / Iwan', 'toto_iwan@example.com', NULL, '$2y$12$tTYW1gI5ka.qKgmIjVwemuIZABfEM95sD0GnYsiCNOAU7530NjlGe', NULL, '2025-06-25 06:55:59', '2025-06-25 06:55:59'),
(349, 'Tri Afrianto', 'tri_afrianto@example.com', NULL, '$2y$12$nxXK/QhOZHQwT4LDM27Z7uuszLqDZtzE3lOt29xePKLmEgCVjY/Be', NULL, '2025-06-25 06:56:00', '2025-06-25 06:56:00'),
(350, 'Tri Martina Se ,mm', 'tri_martina_se_mm@example.com', NULL, '$2y$12$m9gOrOnEKhTMkE26sSUR9eOBXf6MpxSwbZJR0Ab3okPWPfLoYZCP.', NULL, '2025-06-25 06:56:01', '2025-06-25 06:56:01'),
(351, 'Triyono /kontrakan H. Sriyanto', 'triyono_kontrakan_h_sriyanto@example.com', NULL, '$2y$12$PkRLU6hDLwJiIIw3vQR6qOxUzxKGmsngq08VYi4wJPiCwW2Rx879K', NULL, '2025-06-25 06:56:02', '2025-06-25 06:56:02'),
(352, 'Uday Kios Buah', 'uday_kios_buah@example.com', NULL, '$2y$12$cssMPvq7Z8qu0ZVIcGRstO1t0qfp0pb5jN3kos8LfpARtk2uuHfzu', NULL, '2025-06-25 06:56:03', '2025-06-25 06:56:03'),
(353, 'Upit', 'upit@example.com', NULL, '$2y$12$L39kf3y6M.3xkPnGetGQW.GeAf3kg7dtW7RfaOgsWNfbsklIY84Ua', NULL, '2025-06-25 06:56:04', '2025-06-25 06:56:04'),
(354, 'Usman', 'usman@example.com', NULL, '$2y$12$/WspGxbtECNZ/m4WmUe.VuRksVFuZFOYwbwysB6uLa/y5/dVEU8Cu', NULL, '2025-06-25 06:56:05', '2025-06-25 06:56:05'),
(355, 'Viren', 'viren@example.com', NULL, '$2y$12$LJzkENK4QeVR1/S7e/A6zudM0ldFzc035BAyuoVignHTmIUXRjQbS', NULL, '2025-06-25 06:56:06', '2025-06-25 06:56:06'),
(356, 'Wagiyem / Mba Pur', 'wagiyem_mba_pur@example.com', NULL, '$2y$12$XpM1ZUWZd3lRLJwNphAFeuR27HbuV6k2w8p0IyO9RVjnpq/C99h3u', NULL, '2025-06-25 06:56:07', '2025-06-25 06:56:07'),
(357, 'Wahyu /kartika / Cemilan', 'wahyu_kartika_cemilan@example.com', NULL, '$2y$12$YozTUdnpT6WGaniO5c47RO6P6kXbZ/eULs5Gcg/dc93WQ28cjbRyi', NULL, '2025-06-25 06:56:08', '2025-06-25 06:56:08'),
(358, 'Wahyudin', 'wahyudin@example.com', NULL, '$2y$12$pZeaznuh1IukP/tEIYRwROeGbWGcwrFxxXJRPwyurLgm308XCeaF6', NULL, '2025-06-25 06:56:08', '2025-06-25 06:56:08'),
(359, 'Warmin Boy', 'warmin_boy@example.com', NULL, '$2y$12$tLZg3a9TTxFLDtHFqkoz3ucNB9Hufuw21DYOvZGaH1a1xiQ1aADNu', NULL, '2025-06-25 06:56:09', '2025-06-25 06:56:09'),
(360, 'Warsun', 'warsun@example.com', NULL, '$2y$12$mGMoMLDFXv6KGRNJKUakPuh.fmT4BtZxO6l8UngyfF4l9osCawVRi', NULL, '2025-06-25 06:56:10', '2025-06-25 06:56:10'),
(361, 'Warto', 'warto@example.com', NULL, '$2y$12$irpXXZ6GN.fs50dTMffcu.k4AzAniMMwp0XMgyLOD5pxa5FKNGBAC', NULL, '2025-06-25 06:56:11', '2025-06-25 06:56:11'),
(362, 'Wawan / Kontrakan H. Tohir', 'wawan_kontrakan_h_tohir@example.com', NULL, '$2y$12$Jg2eoC5/CJoVhnZkShkjf.e4MZMCE3PVjF8hjkxmF9spcnhE.4nri', NULL, '2025-06-25 06:56:12', '2025-06-25 06:56:12'),
(363, 'Wibowo', 'wibowo@example.com', NULL, '$2y$12$OuWricDPkKv4JYsRCVSQy.RNqIIVafP.BQE9ojvAT1FOrayIBm62i', NULL, '2025-06-25 06:56:13', '2025-06-25 06:56:13'),
(364, 'Widodo', 'widodo@example.com', NULL, '$2y$12$ADY3YgTZ9.lkkTNvMT3sDuOtHWnc/12PNnYvwav1jwG4CqLYW7f.q', NULL, '2025-06-25 06:56:14', '2025-06-25 06:56:14'),
(365, 'Wihartono', 'wihartono@example.com', NULL, '$2y$12$FoAMks0pbozoGzdrQ0KnF.Lx8RU6LD60FVw8RZqV2YAdILpOK1cHq', NULL, '2025-06-25 06:56:15', '2025-06-25 06:56:15'),
(366, 'William Moerland', 'william_moerland@example.com', NULL, '$2y$12$.i6dzLREhxJIOlcOqo2bn.Az85A6PD99sdzpFFJ7RQucIB1eDPdje', NULL, '2025-06-25 06:56:16', '2025-06-25 06:56:16'),
(367, 'Winarsih', 'winarsih@example.com', NULL, '$2y$12$sh0hiEHJRm39JI4v/W/g.Og4AaFD2WVHxEm2foBc7wtX/BPHIrABi', NULL, '2025-06-25 06:56:17', '2025-06-25 06:56:17'),
(368, 'Windi Riyanto', 'windi_riyanto@example.com', NULL, '$2y$12$hb8RDWK3yjs.zrulP2sbQu/5A02yUppES9sX1utEJsry.2upB.Oje', NULL, '2025-06-25 06:56:18', '2025-06-25 06:56:18'),
(369, 'Windu Irawan', 'windu_irawan@example.com', NULL, '$2y$12$aaMydINLjFE7gwGgqQ8ut..arNpVApHZlmOUC7jOL9TnuhJq6BqKC', NULL, '2025-06-25 06:56:19', '2025-06-25 06:56:19'),
(370, 'Winoto', 'winoto@example.com', NULL, '$2y$12$wDstOhS9A69zb5BIOST4Uu4cHPjwyW44WD9Ct3MHLrgiVdGdX3cvK', NULL, '2025-06-25 06:56:20', '2025-06-25 06:56:20'),
(371, 'Wulan /belakang Yeni', 'wulan_belakang_yeni@example.com', NULL, '$2y$12$jLC2ahdd5TIiiVvmpHoeZ.NNdtZT5nB1TXWbSjz1qni1ewmQBr/su', NULL, '2025-06-25 06:56:21', '2025-06-25 06:56:21'),
(372, 'Yakub', 'yakub@example.com', NULL, '$2y$12$aep5.TgA040QCQO/7dwiv.40H0Uh95HN9.k4m7M.y6OpDdMQ0DHxa', NULL, '2025-06-25 06:56:21', '2025-06-25 06:56:21'),
(373, 'Yani / Anwar Rasyid', 'yani_anwar_rasyid@example.com', NULL, '$2y$12$PrQRuF2/yswIRRN/ifvC2uKL0kAzyRJ4P70qqir/tnXwuvk2dYdcm', NULL, '2025-06-25 06:56:22', '2025-06-25 06:56:22'),
(374, 'Yanto', 'yanto@example.com', NULL, '$2y$12$WfZAuckOwDWEzrq3RNXcluo6AowvRpG5CmSKdJ7b/IhNEJ5hPoLOi', NULL, '2025-06-25 06:56:23', '2025-06-25 06:56:23'),
(375, 'Yanuar', 'yanuar@example.com', NULL, '$2y$12$BCMZHq9Q2XNqHpyZ1UzUFe9iGafmaVLMRzyo2LDOleSFkBb.BWftS', NULL, '2025-06-25 06:56:24', '2025-06-25 06:56:24'),
(376, 'Yasin', 'yasin@example.com', NULL, '$2y$12$/SNT5.faZqGwfFB/2GhOPe5GaDzJc9DcwGNMGNFelMENWwIYn0PCK', NULL, '2025-06-25 06:56:25', '2025-06-25 06:56:25'),
(377, 'Yatiman', 'yatiman@example.com', NULL, '$2y$12$DwFshSLDq3go9DDIvGS8jO98C7oBA/BP5.v5Oz3oGew6x68dv./YK', NULL, '2025-06-25 06:56:26', '2025-06-25 06:56:26'),
(378, 'Yofi Okta J', 'yofi_okta_j@example.com', NULL, '$2y$12$a3brGN5brJXtcCa34hU2V.EDXicv6n98zKTr1PBKVjvhLd6lfR6tC', NULL, '2025-06-25 06:56:27', '2025-06-25 06:56:27'),
(379, 'Yohanes', 'yohanes@example.com', NULL, '$2y$12$elZULMXtS5JQ.7FxKGD2me23LITudp5QC0.BXC5OG159mr.MpA8US', NULL, '2025-06-25 06:56:28', '2025-06-25 06:56:28'),
(380, 'Yudha / Kontrakan H. Tohir', 'yudha_kontrakan_h_tohir@example.com', NULL, '$2y$12$ZHbJWw8dkv83UJ4VIPjJ5.FsSsSOv49CEF9KHhR1W9TQx1ISfU/5W', NULL, '2025-06-25 06:56:29', '2025-06-25 06:56:29'),
(381, 'Yudo Pratomo', 'yudo_pratomo@example.com', NULL, '$2y$12$CQVveETzyo8PEeZai2Tcx.g8B8I9tD.A9N.aqhqM0cNo2aenjY6di', NULL, '2025-06-25 06:56:30', '2025-06-25 06:56:30'),
(382, 'Yuniarti', 'yuniarti@example.com', NULL, '$2y$12$BD04KG3ZdWNREDx.agXtHOLy4JHlf1q8.4Bkgh8SLFWXoextd4ewu', NULL, '2025-06-25 06:56:31', '2025-06-25 06:56:31'),
(383, 'Yusuf/ Kontrakan H. Sriyanto', 'yusuf_kontrakan_h_sriyanto@example.com', NULL, '$2y$12$C2PzC2ZodcMQQ0EHX9.uU.u5gv.OFxFg1cbHD3XxR5majxti3gQse', NULL, '2025-06-25 06:56:31', '2025-06-25 06:56:31'),
(384, 'Yuyun Sukandar', 'yuyun_sukandar@example.com', NULL, '$2y$12$lNzsC8HTYmhsTMBsM82n1ujDF8viWeFoJWD1MV8O1kKdyIx1ooOx.', NULL, '2025-06-25 06:56:32', '2025-06-25 06:56:32'),
(385, 'Zahirsyah Usman', 'zahirsyah_usman@example.com', NULL, '$2y$12$lATgRLUg8R39gwdJseZSrOyuCWN/gmH1km1sCOAOklVCORckoFnSm', NULL, '2025-06-25 06:56:33', '2025-06-25 06:56:33'),
(386, 'Zainal / Kontrakan Heni', 'zainal_kontrakan_heni@example.com', NULL, '$2y$12$S4l4Q37KaWuMNIIAhlTtPe.yeBKgJUwJ1fe6YT7FWvvMy28omLtIW', NULL, '2025-06-25 06:56:34', '2025-06-25 06:56:34'),
(387, 'Zaki Sururi', 'zaki_sururi@example.com', NULL, '$2y$12$EZ/XYlsGP9szCQoAYVADg.hX7csuWPlxrwYWv3b20b8O/HhYfIbPC', NULL, '2025-06-25 06:56:35', '2025-06-25 06:56:35'),
(388, 'Zikri Kios Tembakau', 'zikri_kios_tembakau@example.com', NULL, '$2y$12$CTl8oJParE3XQD3TDYzSMe2zN7t7pVXbwCRsx0uh8.4tjilqGdnaC', NULL, '2025-06-25 06:56:36', '2025-06-25 06:56:36'),
(390, 'Apalah', 'apalah@example.com', NULL, '$2y$12$Bo6PPfDA59A3x3KOhKQDR.slLvKHpYBP7.U4xI.hehSr8nalVMx6.', NULL, '2025-06-25 14:03:53', '2025-06-25 14:03:53');

-- --------------------------------------------------------

--
-- Table structure for table `wargas`
--

CREATE TABLE `wargas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `nama` varchar(255) NOT NULL,
  `no_kk` varchar(255) NOT NULL,
  `no_ktp` varchar(255) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `rt_rw` varchar(255) NOT NULL,
  `no_hp` varchar(255) DEFAULT NULL,
  `status_aktif` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `wargas`
--

INSERT INTO `wargas` (`id`, `user_id`, `nama`, `no_kk`, `no_ktp`, `alamat`, `rt_rw`, `no_hp`, `status_aktif`, `created_at`, `updated_at`) VALUES
(391, 3, 'A. ROSYID/ KONT SONI', 'kk-1', 'ktp-1', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(392, 4, 'ABDILAH / KONTRAKAN BURHAN', 'kk-2', 'ktp-2', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(393, 5, 'ABDUL AZIZ', 'kk-3', 'ktp-3', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(394, 6, 'ABDUL FAJAR', 'kk-4', 'ktp-4', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(395, 7, 'ABDUL HALIM', 'kk-5', 'ktp-5', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(396, 8, 'ABDUL MUJIB', 'kk-6', 'ktp-6', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(397, 9, 'ACHMAD', 'kk-7', 'ktp-7', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(398, 10, 'ACHMAD MUNIR', 'kk-8', 'ktp-8', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(399, 11, 'ADE', 'kk-9', 'ktp-9', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(400, 12, 'ADE.S', 'kk-10', 'ktp-10', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(401, 13, 'ADONOY', 'kk-11', 'ktp-11', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(402, 14, 'AGUNG KURNIAWAN', 'kk-12', 'ktp-12', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(403, 15, 'AGUNG RIYADI', 'kk-13', 'ktp-13', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(404, 16, 'AGUNG TRIONO', 'kk-14', 'ktp-14', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(405, 17, 'AGUS MULYADI', 'kk-15', 'ktp-15', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(406, 18, 'AGUS MUNADI', 'kk-16', 'ktp-16', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(407, 19, 'AGUS NURWANTO', 'kk-17', 'ktp-17', '', '', '', 0, NULL, '2025-06-25 23:30:28'),
(408, 20, 'AGUS PRASETYO', 'kk-18', 'ktp-18', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(409, 21, 'AGUS YUSUF', 'kk-19', 'ktp-19', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(410, 22, 'AHMAD CHOIRULLOH IRSYADI', 'kk-20', 'ktp-20', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(411, 23, 'AHMAD GOZALI', 'kk-21', 'ktp-21', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(412, 24, 'AHMAD RIFAI', 'kk-22', 'ktp-22', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(413, 25, 'AHMAD SAYUTI', 'kk-23', 'ktp-23', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(414, 26, 'AHMAD YANI', 'kk-24', 'ktp-24', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(415, 27, 'AHMAD YUNUS', 'kk-25', 'ktp-25', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(416, 28, 'AHMAD ZAINI', 'kk-26', 'ktp-26', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(417, 29, 'AHMAR /KONTRAKAN JAMHURI', 'kk-27', 'ktp-27', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(418, 30, 'ALEX KOMANG PRAYOGA', 'kk-28', 'ktp-28', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(419, 31, 'ALFIAN', 'kk-29', 'ktp-29', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(420, 32, 'ALFIANSYAH', 'kk-30', 'ktp-30', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(421, 33, 'ALI DARWIS/ KONTRAKAN SONI', 'kk-31', 'ktp-31', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(422, 34, 'ALWI / KONTRAKAN H. TOHIR', 'kk-32', 'ktp-32', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(423, 35, 'AMIN / KONTRAKAN SONI', 'kk-33', 'ktp-33', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(424, 36, 'AMIN SH', 'kk-34', 'ktp-34', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(425, 37, 'AMSANIH', 'kk-35', 'ktp-35', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(426, 38, 'ANA DIANA', 'kk-36', 'ktp-36', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(427, 39, 'ANDI / IIS', 'kk-37', 'ktp-37', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(428, 40, 'ANDI KUSUMAH', 'kk-38', 'ktp-38', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(429, 41, 'ANDRI', 'kk-39', 'ktp-39', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(430, 42, 'ANDRYANI', 'kk-40', 'ktp-40', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(431, 43, 'ANGGER PRAWIROAJI', 'kk-41', 'ktp-41', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(432, 44, 'ANGGI / BAKSO', 'kk-42', 'ktp-42', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(433, 45, 'ANGGI AGUSTIAWAN', 'kk-43', 'ktp-43', '', '', '', 0, NULL, '2025-06-25 23:30:29'),
(434, 46, 'ANGGUN SETIAWAN', 'kk-44', 'ktp-44', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(435, 47, 'ANJAR NUGROHO', 'kk-45', 'ktp-45', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(436, 48, 'ANTO', 'kk-46', 'ktp-46', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(437, 49, 'ANTON SETIAWAN', 'kk-47', 'ktp-47', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(438, 50, 'ANWAR', 'kk-48', 'ktp-48', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(439, 51, 'ANWAR ARIFIN', 'kk-49', 'ktp-49', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(440, 52, 'APOTIK GENERIK', 'kk-50', 'ktp-50', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(441, 53, 'APRIYADI', 'kk-51', 'ktp-51', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(442, 54, 'ARFAN HAQI LUBIS', 'kk-52', 'ktp-52', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(443, 55, 'ARFIAN', 'kk-53', 'ktp-53', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(444, 56, 'ARI BOWO', 'kk-54', 'ktp-54', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(445, 57, 'ARI ISDIANTORO', 'kk-55', 'ktp-55', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(446, 58, 'ARI SIGIT', 'kk-56', 'ktp-56', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(447, 59, 'ARI TOKO KUE / KONT UST MARHASAN', 'kk-57', 'ktp-57', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(448, 60, 'ARIF FIRDAUS', 'kk-58', 'ktp-58', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(449, 61, 'ASEP / NASI GORENG', 'kk-59', 'ktp-59', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(450, 62, 'ASEP JAINUDIN', 'kk-60', 'ktp-60', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(451, 63, 'ASIAH / CANDRA', 'kk-61', 'ktp-61', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(452, 64, 'ASIYAH', 'kk-62', 'ktp-62', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(453, 65, 'AXA FROZEN', 'kk-63', 'ktp-63', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(454, 66, 'BAGUS KETUT M', 'kk-64', 'ktp-64', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(455, 67, 'BAHYUDI', 'kk-65', 'ktp-65', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(456, 68, 'BARBER SHOP GENTLEMEN', 'kk-66', 'ktp-66', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(457, 69, 'BARTAKA / YOHANA', 'kk-67', 'ktp-67', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(458, 70, 'BARYANTO', 'kk-68', 'ktp-68', '', '', '', 0, NULL, '2025-06-25 23:30:30'),
(459, 71, 'BAWONO', 'kk-69', 'ktp-69', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(460, 72, 'BAYU HIDAYAT', 'kk-70', 'ktp-70', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(461, 73, 'BAYU NUGROHO', 'kk-71', 'ktp-71', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(462, 74, 'BAYU PRADIPTA', 'kk-72', 'ktp-72', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(463, 75, 'BEJO BUDIANTO', 'kk-73', 'ktp-73', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(464, 76, 'BENEDICTUS SUHARSO', 'kk-74', 'ktp-74', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(465, 77, 'BIMBA FUN SCHOOLING', 'kk-75', 'ktp-75', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(466, 78, 'BOHIM / KONTRAKAN BURHAN', 'kk-76', 'ktp-76', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(467, 79, 'BU GIANTI', 'kk-77', 'ktp-77', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(468, 80, 'BU NANAI/ KONTRAKAN WINDI R', 'kk-78', 'ktp-78', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(469, 81, 'BUANG SUPARDI', 'kk-79', 'ktp-79', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(470, 82, 'BUDI', 'kk-80', 'ktp-80', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(471, 83, 'BUDI SERVICE', 'kk-81', 'ktp-81', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(472, 84, 'BURHAN', 'kk-82', 'ktp-82', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(473, 85, 'BURHANUDIN', 'kk-83', 'ktp-83', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(474, 86, 'CHANDRA', 'kk-84', 'ktp-84', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(475, 87, 'CHRISTO A', 'kk-85', 'ktp-85', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(476, 88, 'CIPTO HADI', 'kk-86', 'ktp-86', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(477, 89, 'CUCUN AGUS .B', 'kk-87', 'ktp-87', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(478, 90, 'D. SULISTYO', 'kk-88', 'ktp-88', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(479, 91, 'DANIEL . A', 'kk-89', 'ktp-89', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(480, 92, 'DARMEN SILALAHI', 'kk-90', 'ktp-90', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(481, 93, 'DARYONO', 'kk-91', 'ktp-91', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(482, 94, 'DAVID SIMANJUNTAK', 'kk-92', 'ktp-92', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(483, 95, 'DAYAT /TUKANG URUT', 'kk-93', 'ktp-93', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(484, 96, 'DEDEN A.R', 'kk-94', 'ktp-94', '', '', '', 0, NULL, '2025-06-25 23:30:31'),
(485, 97, 'DEDI HERMAWAN', 'kk-95', 'ktp-95', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(486, 98, 'DEDI KOSWARA', 'kk-96', 'ktp-96', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(487, 99, 'DEDI PRIYANTO', 'kk-97', 'ktp-97', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(488, 100, 'DENI / BARBER SHOP', 'kk-98', 'ktp-98', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(489, 101, 'DENI ANDRIYAN/ KONTRAKAN H. SRIYANTO', 'kk-99', 'ktp-99', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(490, 102, 'DENNIS HASIBUAN', 'kk-100', 'ktp-100', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(491, 103, 'DEVI', 'kk-101', 'ktp-101', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(492, 104, 'DICKY', 'kk-102', 'ktp-102', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(493, 105, 'DIKA OKTA WILIAWAN (SEKTERTARIS RT 003)', 'kk-103', 'ktp-103', 'Jl. Raya Kosambi-Curug Km 3,8 Dsn. Kebon Kacang', '4/5', NULL, 0, NULL, '2025-06-26 00:49:45'),
(494, 106, 'DIO / KONTRAKAN MPOK ASIYAH', 'kk-104', 'ktp-104', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(495, 107, 'DJOKO PRIYANTO S Si', 'kk-105', 'ktp-105', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(496, 108, 'DODI / TEMBOK TMII', 'kk-106', 'ktp-106', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(497, 109, 'dr. ARON', 'kk-107', 'ktp-107', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(498, 110, 'DRA. TUTUK HIMAYANTI', 'kk-108', 'ktp-108', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(499, 111, 'DRI SUTRISNA', 'kk-109', 'ktp-109', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(500, 112, 'DRS. LAIDU', 'kk-110', 'ktp-110', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(501, 113, 'EDI ILHAM KONTRAKAN MUKLIS', 'kk-111', 'ktp-111', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(502, 114, 'EDY SWASONO', 'kk-112', 'ktp-112', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(503, 115, 'ERIYANTO', 'kk-113', 'ktp-113', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(504, 116, 'ERNA / PECEL LELE', 'kk-114', 'ktp-114', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(505, 117, 'FAJAR MAHADI GOZALI', 'kk-115', 'ktp-115', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(506, 118, 'FARHAN UCOK', 'kk-116', 'ktp-116', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(507, 119, 'FATHAN ALBANI', 'kk-117', 'ktp-117', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(508, 120, 'FATIMAH', 'kk-118', 'ktp-118', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(509, 121, 'FATMARIA', 'kk-119', 'ktp-119', '', '', '', 0, NULL, '2025-06-25 23:30:32'),
(510, 122, 'FERDIANSYAH REZA', 'kk-120', 'ktp-120', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(511, 123, 'FIRMAN FITRIADI', 'kk-121', 'ktp-121', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(512, 124, 'FX CHRISTIANTORO', 'kk-122', 'ktp-122', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(513, 125, 'GIRAH ASTUTI', 'kk-123', 'ktp-123', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(514, 126, 'GITA SEBLAK', 'kk-124', 'ktp-124', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(515, 127, 'GIYANTI', 'kk-125', 'ktp-125', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(516, 128, 'GUNTUR WAHYUDI', 'kk-126', 'ktp-126', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(517, 129, 'H. DANURI', 'kk-127', 'ktp-127', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(518, 130, 'H. MATOHIR', 'kk-128', 'ktp-128', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(519, 131, 'H. MUSANEF JAZULI', 'kk-129', 'ktp-129', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(520, 132, 'H. PALTIDORO', 'kk-130', 'ktp-130', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(521, 133, 'H. ROSMIYATI / POP ICE', 'kk-131', 'ktp-131', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(522, 134, 'H. SRIYANTO', 'kk-132', 'ktp-132', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(523, 135, 'H. SUAIB', 'kk-133', 'ktp-133', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(524, 136, 'H. SUNARNO', 'kk-134', 'ktp-134', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(525, 137, 'HAKIM', 'kk-135', 'ktp-135', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(526, 138, 'HAMLAN HISANI', 'kk-136', 'ktp-136', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(527, 139, 'HARDIAN', 'kk-137', 'ktp-137', '', '', '', 0, NULL, '2025-06-25 23:30:33'),
(528, 140, 'HARIADI', 'kk-138', 'ktp-138', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(529, 141, 'HARIS MUNANDAR', 'kk-139', 'ktp-139', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(530, 142, 'HARSONO', 'kk-140', 'ktp-140', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(531, 143, 'HARTI', 'kk-141', 'ktp-141', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(532, 144, 'HASAN / KONTRAKAN H. SRIYANTO', 'kk-142', 'ktp-142', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(533, 145, 'HASHEMI. N', 'kk-143', 'ktp-143', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(534, 146, 'HAYATI', 'kk-144', 'ktp-144', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(535, 147, 'HAZANI', 'kk-145', 'ktp-145', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(536, 148, 'HELMI NAWAWI', 'kk-146', 'ktp-146', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(537, 149, 'HENDI PUJIANTO', 'kk-147', 'ktp-147', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(538, 150, 'HENDI SUHENDAR / KONTRAKAN H, KARJO', 'kk-148', 'ktp-148', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(539, 151, 'HENRIZAL RASYID', 'kk-149', 'ktp-149', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(540, 152, 'HERIYANTO', 'kk-150', 'ktp-150', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(541, 153, 'HERMAN', 'kk-151', 'ktp-151', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(542, 154, 'HERMAWAN / KONTRAKAN KARJO', 'kk-152', 'ktp-152', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(543, 155, 'HERY MULYANTO / YUNI', 'kk-153', 'ktp-153', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(544, 156, 'HISAR MANURUNG', 'kk-154', 'ktp-154', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(545, 157, 'HJ. ARNI', 'kk-155', 'ktp-155', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(546, 158, 'IBU IIN', 'kk-156', 'ktp-156', '', '', '', 0, NULL, '2025-06-25 23:30:34'),
(547, 159, 'IBU LIES/ KONTRAKAN YOFI', 'kk-157', 'ktp-157', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(548, 160, 'IDA FITRIANI', 'kk-158', 'ktp-158', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(549, 161, 'IKO  PANJI', 'kk-159', 'ktp-159', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(550, 162, 'ILHAMSYAH', 'kk-160', 'ktp-160', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(551, 163, 'ILYASA', 'kk-161', 'ktp-161', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(552, 164, 'IMAM BUCHORI', 'kk-162', 'ktp-162', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(553, 165, 'IMAM NURKHOLIS', 'kk-163', 'ktp-163', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(554, 166, 'ISMAWADI', 'kk-164', 'ktp-164', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(555, 167, 'IWAN (MPOK IAH)', 'kk-165', 'ktp-165', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(556, 168, 'IWAN / SHEZA', 'kk-166', 'ktp-166', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(557, 169, 'JAMHURI (KETUA RT 003)', 'kk-167', 'ktp-167', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(558, 170, 'JOKO SRIYONO', 'kk-168', 'ktp-168', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(559, 171, 'JONO', 'kk-169', 'ktp-169', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(560, 172, 'KARNO / KONTRAKAN ASIAH', 'kk-170', 'ktp-170', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(561, 173, 'KEIAN / KLINIK GIGI MEDIKA', 'kk-171', 'ktp-171', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(562, 174, 'KHAYUM BASIR', 'kk-172', 'ktp-172', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(563, 175, 'KHUSNUL AZMI', 'kk-173', 'ktp-173', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(564, 176, 'KIOS STENGBO', 'kk-174', 'ktp-174', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(565, 177, 'KIOS UNGGAS', 'kk-175', 'ktp-175', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(566, 178, 'KURNIA IMAM HIDAYAT', 'kk-176', 'ktp-176', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(567, 179, 'KURNIAWAN / IWAN', 'kk-177', 'ktp-177', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(568, 180, 'KUSNADI / MPOK IROH', 'kk-178', 'ktp-178', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(569, 181, 'KUSNADI /KONTRAKAN BURHAN', 'kk-179', 'ktp-179', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(570, 182, 'LILIK TRIYUNIATI', 'kk-180', 'ktp-180', '', '', '', 0, NULL, '2025-06-25 23:30:35'),
(571, 183, 'LILIS CITRAWATI BARNAS', 'kk-181', 'ktp-181', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(572, 184, 'LINDA SUSANTI', 'kk-182', 'ktp-182', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(573, 185, 'LUKMAN SETIAWAN', 'kk-183', 'ktp-183', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(574, 186, 'LUKMANUL HAKIM', 'kk-184', 'ktp-184', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(575, 187, 'M .TAUFAN', 'kk-185', 'ktp-185', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(576, 188, 'M. NAWI', 'kk-186', 'ktp-186', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(577, 189, 'M. SOLEH', 'kk-187', 'ktp-187', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(578, 190, 'MA\' ASAH', 'kk-188', 'ktp-188', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(579, 191, 'MADJUK', 'kk-189', 'ktp-189', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(580, 192, 'MARDANIH', 'kk-190', 'ktp-190', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(581, 193, 'MARDIYANSYAH', 'kk-191', 'ktp-191', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(582, 194, 'MARHANIH BON YANIH', 'kk-192', 'ktp-192', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(583, 195, 'MARHASAN', 'kk-193', 'ktp-193', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(584, 196, 'MARIA NOVALIA F', 'kk-194', 'ktp-194', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(585, 197, 'MARIMAN', 'kk-195', 'ktp-195', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(586, 198, 'MARULLY PURNAMA', 'kk-196', 'ktp-196', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(587, 199, 'MARULOH /KONT BU YENI', 'kk-197', 'ktp-197', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(588, 200, 'MARYADI', 'kk-198', 'ktp-198', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(589, 201, 'MARYADI MARTIN', 'kk-199', 'ktp-199', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(590, 202, 'MAS EL / BAKMI', 'kk-200', 'ktp-200', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(591, 203, 'MAULANA IMAM SADEWA', 'kk-201', 'ktp-201', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(592, 204, 'MBAH KASIAH', 'kk-202', 'ktp-202', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(593, 205, 'MELDIN SARAGIH', 'kk-203', 'ktp-203', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(594, 206, 'MINGUN', 'kk-204', 'ktp-204', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(595, 207, 'MISAR', 'kk-205', 'ktp-205', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(596, 208, 'MISMAN', 'kk-206', 'ktp-206', '', '', '', 0, NULL, '2025-06-25 23:30:36'),
(597, 209, 'MOH ABDUL HALIM', 'kk-207', 'ktp-207', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(598, 210, 'MOH. ABDILLAH', 'kk-208', 'ktp-208', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(599, 211, 'MUCHLIS', 'kk-209', 'ktp-209', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(600, 212, 'MUGIYANI', 'kk-210', 'ktp-210', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(601, 213, 'MUH. RIZKI', 'kk-211', 'ktp-211', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(602, 214, 'MUHAMAD BUDI', 'kk-212', 'ktp-212', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(603, 215, 'MUHAMAD FAUZI', 'kk-213', 'ktp-213', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(604, 216, 'MUJARWO', 'kk-214', 'ktp-214', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(605, 217, 'MUJIRAN', 'kk-215', 'ktp-215', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(606, 218, 'MUNZIR', 'kk-216', 'ktp-216', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(607, 219, 'MUSA ALAMILAHSAN', 'kk-217', 'ktp-217', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(608, 220, 'MUSTOFA', 'kk-218', 'ktp-218', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(609, 221, 'NANI/ KONTRAKAN WINDI R', 'kk-219', 'ktp-219', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(610, 222, 'NAPSIAH', 'kk-220', 'ktp-220', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(611, 223, 'NASIR', 'kk-221', 'ktp-221', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(612, 224, 'NEMIN', 'kk-222', 'ktp-222', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(613, 225, 'NESAH BUDIMAN / KONTRAKAN H. SRIYANTO', 'kk-223', 'ktp-223', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(614, 226, 'NGESTI', 'kk-224', 'ktp-224', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(615, 227, 'NIKE', 'kk-225', 'ktp-225', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(616, 228, 'NIKEN', 'kk-226', 'ktp-226', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(617, 229, 'NONOT SUHARTONO', 'kk-227', 'ktp-227', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(618, 230, 'NOVIAR ARIEF', 'kk-228', 'ktp-228', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(619, 231, 'NUR KUSUMA IRAWAN', 'kk-229', 'ktp-229', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(620, 232, 'NUR NAHDIAH ANG', 'kk-230', 'ktp-230', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(621, 233, 'NURBAITI ZAMZAMI', 'kk-231', 'ktp-231', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(622, 234, 'NURDIN', 'kk-232', 'ktp-232', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(623, 235, 'NURHAYATI', 'kk-233', 'ktp-233', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(624, 236, 'NURHAYATI/ZAKI/RUMANI', 'kk-234', 'ktp-234', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(625, 237, 'NURMAN EFFENDI', 'kk-235', 'ktp-235', '', '', '', 0, NULL, '2025-06-25 23:30:37'),
(626, 238, 'NURSALIM', 'kk-236', 'ktp-236', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(627, 239, 'NURUSSYAM EKY GUSTI P', 'kk-237', 'ktp-237', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(628, 240, 'OLIVE / SITI', 'kk-238', 'ktp-238', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(629, 241, 'OPE KORANG', 'kk-239', 'ktp-239', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(630, 242, 'PANCE', 'kk-240', 'ktp-240', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(631, 243, 'PANDU EKA SAKTI', 'kk-241', 'ktp-241', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(632, 244, 'PANJI', 'kk-242', 'ktp-242', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(633, 245, 'PARSI', 'kk-243', 'ktp-243', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(634, 246, 'PARULIAN', 'kk-244', 'ktp-244', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(635, 247, 'PRIANDRA', 'kk-245', 'ktp-245', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(636, 248, 'PRIYANDRA', 'kk-246', 'ktp-246', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(637, 249, 'PRIYO', 'kk-247', 'ktp-247', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(638, 250, 'PT MORA TELEMATIKA INDONESIA', 'kk-248', 'ktp-248', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(639, 251, 'PUJI AVIANTO', 'kk-249', 'ktp-249', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(640, 252, 'PURNOMO', 'kk-250', 'ktp-250', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(641, 253, 'PUTRA DIRMAWAN', 'kk-251', 'ktp-251', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(642, 254, 'R. DUDUNG', 'kk-252', 'ktp-252', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(643, 255, 'R. TRIYANTO WS', 'kk-253', 'ktp-253', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(644, 256, 'RAJA / KONTRAKAN BURHAN', 'kk-254', 'ktp-254', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(645, 257, 'RAMCES', 'kk-255', 'ktp-255', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(646, 258, 'RAMELAN', 'kk-256', 'ktp-256', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(647, 259, 'RAMLI BIN ABUDARWIS', 'kk-257', 'ktp-257', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(648, 260, 'RATNA DEWI', 'kk-258', 'ktp-258', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(649, 261, 'RICHARD', 'kk-259', 'ktp-259', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(650, 262, 'RICKY RUDOLF', 'kk-260', 'ktp-260', '', '', '', 0, NULL, '2025-06-25 23:30:38'),
(651, 263, 'RIFKI/ KONTRAKAN H. KARJO', 'kk-261', 'ktp-261', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(652, 264, 'RINI / KONTRAKAN SUJAK', 'kk-262', 'ktp-262', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(653, 265, 'RIPTO', 'kk-263', 'ktp-263', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(654, 266, 'RISAMAN', 'kk-264', 'ktp-264', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(655, 267, 'ROBBY APRILIYANTO / GAS', 'kk-265', 'ktp-265', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(656, 268, 'ROBI HABIBULOH', 'kk-266', 'ktp-266', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(657, 269, 'ROCHMAT', 'kk-267', 'ktp-267', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(658, 270, 'ROCHYAT', 'kk-268', 'ktp-268', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(659, 271, 'ROHAMAH', 'kk-269', 'ktp-269', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(660, 272, 'ROHAYA', 'kk-270', 'ktp-270', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(661, 273, 'ROHMAD NUR SIDIQ Z', 'kk-271', 'ktp-271', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(662, 274, 'ROHMAN ES KELAPA', 'kk-272', 'ktp-272', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(663, 275, 'RONI ( TOKO LAMPU)', 'kk-273', 'ktp-273', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(664, 276, 'ROSWATI', 'kk-274', 'ktp-274', '', '', '', 0, NULL, '2025-06-25 23:30:39'),
(665, 277, 'ROZAK', 'kk-275', 'ktp-275', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(666, 278, 'RUSDI', 'kk-276', 'ktp-276', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(667, 279, 'RUSHADI', 'kk-277', 'ktp-277', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(668, 280, 'S. YANTINI', 'kk-278', 'ktp-278', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(669, 281, 'SAGINO', 'kk-279', 'ktp-279', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(670, 282, 'SAHRONI', 'kk-280', 'ktp-280', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(671, 283, 'SAID EDY', 'kk-281', 'ktp-281', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(672, 284, 'SARMADA', 'kk-282', 'ktp-282', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(673, 285, 'SARMIN', 'kk-283', 'ktp-283', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(674, 286, 'SARYALI', 'kk-284', 'ktp-284', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(675, 287, 'SATIBI / SATE', 'kk-285', 'ktp-285', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(676, 288, 'SAUT NAINGGOLAN', 'kk-286', 'ktp-286', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(677, 289, 'SAYUDI', 'kk-287', 'ktp-287', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(678, 290, 'SEMAR COFFE', 'kk-288', 'ktp-288', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(679, 291, 'SENJA / ANUGRAH PRASETIADI', 'kk-289', 'ktp-289', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(680, 292, 'SIM NERIE', 'kk-290', 'ktp-290', '', '', '', 0, NULL, '2025-06-25 23:30:40'),
(681, 293, 'SINTA', 'kk-291', 'ktp-291', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(682, 294, 'SISWANTO CAHYO BAKTI', 'kk-292', 'ktp-292', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(683, 295, 'SITI /KIOS BAJU H. KARJO', 'kk-293', 'ktp-293', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(684, 296, 'SITI SURYANI ENCUN', 'kk-294', 'ktp-294', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(685, 297, 'SITI YULIANA S PDi', 'kk-295', 'ktp-295', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(686, 298, 'SOERYADI', 'kk-296', 'ktp-296', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(687, 299, 'SOFWAN HELMI', 'kk-297', 'ktp-297', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(688, 300, 'SONI INDI .P', 'kk-298', 'ktp-298', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(689, 301, 'SRI MULYONO', 'kk-299', 'ktp-299', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(690, 302, 'SRI PRIHATI', 'kk-300', 'ktp-300', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(691, 303, 'SRI WINARSI', 'kk-301', 'ktp-301', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(692, 304, 'SRIHANDAYA (KETUA RW 011)', 'kk-302', 'ktp-302', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(693, 305, 'SRIYANTO KUSWANTORO', 'kk-303', 'ktp-303', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(694, 306, 'SUBHAN ARIF', 'kk-304', 'ktp-304', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(695, 307, 'SUCHAEDI', 'kk-305', 'ktp-305', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(696, 308, 'SUDARNO', 'kk-306', 'ktp-306', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(697, 309, 'SUDIYEM', 'kk-307', 'ktp-307', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(698, 310, 'SUGENG', 'kk-308', 'ktp-308', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(699, 311, 'SUGIONO', 'kk-309', 'ktp-309', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(700, 312, 'SUHANDONO', 'kk-310', 'ktp-310', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(701, 313, 'SUHANDRI', 'kk-311', 'ktp-311', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(702, 314, 'SUJAK', 'kk-312', 'ktp-312', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(703, 315, 'SUKAMTO', 'kk-313', 'ktp-313', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(704, 316, 'SUKARNO / SRI', 'kk-314', 'ktp-314', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(705, 317, 'SUKATNO / BU NUR', 'kk-315', 'ktp-315', '', '', '', 0, NULL, '2025-06-25 23:30:41'),
(706, 318, 'SUKATNO /EKO', 'kk-316', 'ktp-316', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(707, 319, 'SUKMA BEAUTY', 'kk-317', 'ktp-317', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(708, 320, 'SUKRAN / HENDRA SULISTIAWAN', 'kk-318', 'ktp-318', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(709, 321, 'SUKRON', 'kk-319', 'ktp-319', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(710, 322, 'SULARNO', 'kk-320', 'ktp-320', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(711, 323, 'SULASMI', 'kk-321', 'ktp-321', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(712, 324, 'SUMANTA', 'kk-322', 'ktp-322', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(713, 325, 'SUMAWAN/TOKO MADURA/ K. MARHASAN', 'kk-323', 'ktp-323', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(714, 326, 'SUMBANG', 'kk-324', 'ktp-324', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(715, 327, 'SUPRIYANTO', 'kk-325', 'ktp-325', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(716, 328, 'SURANTO', 'kk-326', 'ktp-326', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(717, 329, 'SURATNO', 'kk-327', 'ktp-327', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(718, 330, 'SURYA', 'kk-328', 'ktp-328', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(719, 331, 'SURYADI', 'kk-329', 'ktp-329', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(720, 332, 'SUTARMI', 'kk-330', 'ktp-330', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(721, 333, 'SUTIYEM', 'kk-331', 'ktp-331', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(722, 334, 'SUTRIYOKO', 'kk-332', 'ktp-332', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(723, 335, 'SYAMSUL MA\'ARIF', 'kk-333', 'ktp-333', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(724, 336, 'SYARIF / JERUK', 'kk-334', 'ktp-334', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(725, 337, 'SYARIFUDIN ARIF', 'kk-335', 'ktp-335', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(726, 338, 'SYAWAL', 'kk-336', 'ktp-336', '', '', '', 0, NULL, '2025-06-25 23:30:42'),
(727, 339, 'TAKBIR SM', 'kk-337', 'ktp-337', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(728, 340, 'TARI / KONTRAKAN SUJAK', 'kk-338', 'ktp-338', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(729, 341, 'TEGUH. HERMAWAN', 'kk-339', 'ktp-339', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(730, 342, 'THORIQ ALFARIZI', 'kk-340', 'ktp-340', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(731, 343, 'TIARA/ KONTRAKAN SONI', 'kk-341', 'ktp-341', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(732, 344, 'TIODORA SIHOMBING', 'kk-342', 'ktp-342', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(733, 345, 'TOKO AKBAR', 'kk-343', 'ktp-343', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(734, 346, 'TOKO BERAS / KAMAL', 'kk-344', 'ktp-344', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(735, 347, 'TOKO YO MOTOR', 'kk-345', 'ktp-345', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(736, 348, 'TOTO / IWAN', 'kk-346', 'ktp-346', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(737, 349, 'TRI AFRIANTO', 'kk-347', 'ktp-347', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(738, 350, 'TRI MARTINA SE ,MM', 'kk-348', 'ktp-348', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(739, 351, 'TRIYONO /KONTRAKAN H. SRIYANTO', 'kk-349', 'ktp-349', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(740, 352, 'UDAY KIOS BUAH', 'kk-350', 'ktp-350', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(741, 353, 'UPIT', 'kk-351', 'ktp-351', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(742, 354, 'USMAN', 'kk-352', 'ktp-352', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(743, 355, 'VIREN', 'kk-353', 'ktp-353', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(744, 356, 'WAGIYEM / MBA PUR', 'kk-354', 'ktp-354', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(745, 357, 'WAHYU /KARTIKA / CEMILAN', 'kk-355', 'ktp-355', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(746, 358, 'WAHYUDIN', 'kk-356', 'ktp-356', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(747, 359, 'WARMIN BOY', 'kk-357', 'ktp-357', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(748, 360, 'WARSUN', 'kk-358', 'ktp-358', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(749, 361, 'WARTO', 'kk-359', 'ktp-359', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(750, 362, 'WAWAN / KONTRAKAN H. TOHIR', 'kk-360', 'ktp-360', '', '', '', 0, NULL, '2025-06-25 23:30:43'),
(751, 363, 'WIBOWO', 'kk-361', 'ktp-361', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(752, 364, 'WIDODO', 'kk-362', 'ktp-362', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(753, 365, 'WIHARTONO', 'kk-363', 'ktp-363', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(754, 366, 'WILLIAM MOERLAND', 'kk-364', 'ktp-364', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(755, 367, 'WINARSIH', 'kk-365', 'ktp-365', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(756, 368, 'WINDI RIYANTO', 'kk-366', 'ktp-366', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(757, 369, 'WINDU IRAWAN', 'kk-367', 'ktp-367', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(758, 370, 'WINOTO', 'kk-368', 'ktp-368', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(759, 371, 'WULAN /BELAKANG YENI', 'kk-369', 'ktp-369', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(760, 372, 'YAKUB', 'kk-370', 'ktp-370', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(761, 373, 'YANI / ANWAR RASYID', 'kk-371', 'ktp-371', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(762, 374, 'YANTO', 'kk-372', 'ktp-372', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(763, 375, 'YANUAR', 'kk-373', 'ktp-373', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(764, 376, 'YASIN', 'kk-374', 'ktp-374', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(765, 377, 'YATIMAN', 'kk-375', 'ktp-375', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(766, 378, 'YOFI OKTA J', 'kk-376', 'ktp-376', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(767, 379, 'YOHANES', 'kk-377', 'ktp-377', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(768, 380, 'YUDHA / KONTRAKAN H. TOHIR', 'kk-378', 'ktp-378', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(769, 381, 'YUDO PRATOMO', 'kk-379', 'ktp-379', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(770, 382, 'YUNIARTI', 'kk-380', 'ktp-380', '', '', '', 0, NULL, '2025-06-25 23:30:44'),
(771, 383, 'YUSUF/ KONTRAKAN H. SRIYANTO', 'kk-381', 'ktp-381', '', '', '', 0, NULL, '2025-06-25 23:30:45'),
(772, 384, 'YUYUN SUKANDAR', 'kk-382', 'ktp-382', '', '', '', 0, NULL, '2025-06-25 23:30:45'),
(773, 385, 'ZAHIRSYAH USMAN', 'kk-383', 'ktp-383', '', '', '', 0, NULL, '2025-06-25 23:30:45'),
(774, 386, 'ZAINAL / KONTRAKAN HENI', 'kk-384', 'ktp-384', '', '', '', 0, NULL, '2025-06-25 23:30:45'),
(775, 387, 'ZAKI SURURI', 'kk-385', 'ktp-385', '', '', '', 0, NULL, '2025-06-25 23:30:45'),
(776, 388, 'ZIKRI KIOS TEMBAKAU', 'kk-386', 'ktp-386', '', '', '', 0, NULL, '2025-06-25 23:30:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `iuran_wargas`
--
ALTER TABLE `iuran_wargas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `iuran_wargas_id_warga_foreign` (`id_warga`),
  ADD KEY `iuran_wargas_id_jenis_iuran_foreign` (`id_jenis_iuran`);

--
-- Indexes for table `jenis_iurans`
--
ALTER TABLE `jenis_iurans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kas_wargas`
--
ALTER TABLE `kas_wargas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kas_wargas_kode_unique` (`kode`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `pengeluarans`
--
ALTER TABLE `pengeluarans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `periodes`
--
ALTER TABLE `periodes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `periodes_nama_periode_unique` (`nama_periode`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `rukems`
--
ALTER TABLE `rukems`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `rukems_kode_rukem_unique` (`kode_rukem`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `wargas`
--
ALTER TABLE `wargas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wargas_no_kk_unique` (`no_kk`),
  ADD UNIQUE KEY `wargas_no_ktp_unique` (`no_ktp`),
  ADD KEY `wargas_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `iuran_wargas`
--
ALTER TABLE `iuran_wargas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jenis_iurans`
--
ALTER TABLE `jenis_iurans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kas_wargas`
--
ALTER TABLE `kas_wargas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `pengeluarans`
--
ALTER TABLE `pengeluarans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `periodes`
--
ALTER TABLE `periodes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rukems`
--
ALTER TABLE `rukems`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=391;

--
-- AUTO_INCREMENT for table `wargas`
--
ALTER TABLE `wargas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=777;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `iuran_wargas`
--
ALTER TABLE `iuran_wargas`
  ADD CONSTRAINT `iuran_wargas_id_jenis_iuran_foreign` FOREIGN KEY (`id_jenis_iuran`) REFERENCES `jenis_iurans` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `iuran_wargas_id_warga_foreign` FOREIGN KEY (`id_warga`) REFERENCES `wargas` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wargas`
--
ALTER TABLE `wargas`
  ADD CONSTRAINT `wargas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
