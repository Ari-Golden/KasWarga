<?php

use App\Http\Controllers\IuranWargaController;
use App\Http\Controllers\JenisIuranController;
use App\Http\Controllers\KasController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\PeriodeController;
use App\Http\Controllers\WargaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('data_warga', function () {
        return Inertia::render('warga/index');
    })->name('profile');
    Route::get('/warga', [WargaController::class, 'index'])->name('warga.index');
    Route::get('/warga/{warga}', [WargaController::class, 'show'])->name('warga.show');
    Route::post('/warga', [WargaController::class, 'store'])->name('warga.store');
    // Route::put('/warga/{warga}', [WargaController::class, 'update'])->name('warga.update');
    Route::delete('/warga/{warga}', [WargaController::class, 'destroy'])->name('warga.destroy');
    Route::match(['put', 'patch'],'/warga/{warga}', [WargaController::class, 'update'])->name('warga.update');
    Route::resource('iuran-warga', IuranWargaController::class);
    Route::resource('jenis-iuran', JenisIuranController::class);
    Route::resource('pengeluaran',PengeluaranController::class);
    Route::resource('kas',KasController::class);
    Route::post('/kas/kas-out', [KasController::class, 'storeKasOut'])->name('kas.storeKasOut');
    Route::resource('periode',PeriodeController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
