<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\IuranWargaController;
use App\Http\Controllers\JenisIuranController;
use App\Http\Controllers\KasController;
use App\Http\Controllers\KoordinatorController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\PeriodeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\RukemController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\WargaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::middleware(['auth', 'role:admin'])->get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::middleware(['auth', 'role:koordinator'])
->get('/dashboardkoordinator', [KoordinatorController::class, 'index'])->name('dashboard.koordinator') ;




Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])
    ->name('dashboard')
    ->middleware('role:admin|koordinator');

    Route::get('data_warga', function () {
        return Inertia::render('warga/index');
    })->name('profile')
      ->middleware('role:admin|koordinator');

    // Dashboard untuk warga
    Route::get('/dashboardwarga', [DashboardController::class, 'indexDashboardWarga'])->name('dashboardwarga.index')->middleware('role:admin|koordinator|warga');
    Route::get('/dashboardwarga/kas-warga', [DashboardController::class, 'indexKasWarga'])->name('dashboardwarga.kaswarga')->middleware('role:admin|koordinator|warga');
    Route::get('/dashboardwarga/rukem-warga', [DashboardController::class, 'indexKasRukem'])->name('dashboardwarga.kasrukem')->middleware('role:admin|koordinator|warga');
    Route::get('/dashboardwarga/iuran-pribadi', [DashboardController::class, 'iuranPribadi'])->name('dashboardwarga.iuranpribadi')->middleware('role:admin|koordinator|warga');
    Route::get('/dashboardwarga/profil-pribadi', [DashboardController::class, 'profilSaya'])->name('dashboardwarga.profilSaya')->middleware('role:admin|koordinator|warga');
    Route::patch('/dashboardwarga/update-profil-pribadi', [DashboardController::class, 'updateProfilSaya'])->name('dashboardwarga.updateProfilSaya')->middleware('role:admin|koordinator|warga');
    Route::get('/dashboardwarga/setting-profil-user', function () {
        return Inertia::render('DashboardWarga/settings/profile');
    })->name('dashboardwarga.settingProfilUser')->middleware('role:admin|koordinator|warga');
    Route::get('/dashboardwarga/setting-password-user', function () {
        return Inertia::render('DashboardWarga/settings/password');
    })->name('dashboardwarga.settingPasswordUser')->middleware('role:admin|koordinator|warga');
    // Dashboard untuk Koordinator
    Route::get('/dashboardkoordinator/kas-warga', [KoordinatorController::class, 'indexKasWarga'])->name('dashboardkoordinator.kaswarga')->middleware('role:admin|koordinator');
    Route::get('/dashboardkoordinator/rukem-warga', [KoordinatorController::class, 'indexKasRukem'])->name('dashboardkoordinator.kasrukem')->middleware('role:admin|koordinator');
    Route::get('/dashboardkoordinator/iuran-pribadi', [KoordinatorController::class, 'iuranPribadi'])->name('dashboardkoordinator.iuranpribadi')->middleware('role:admin|koordinator');
    Route::get('/dashboardkoordinator/profil-pribadi', [KoordinatorController::class, 'profilSaya'])->name('dashboardkoordinator.profilSaya')->middleware('role:admin|koordinator');
    Route::patch('/dashboardkoordinator/update-profil-pribadi', [KoordinatorController::class, 'updateProfilSaya'])->name('dashboardkoordinator.updateProfilSaya')->middleware('role:admin|koordinator');
    Route::get('/dashboardkoordinator/list-iuran-warga', [KoordinatorController::class, 'listIuran'])->name('dashboardkoordinator.listIuran')->middleware('role:admin|koordinator');
     Route::get('/dashboardkoordinator/setting-profil-user', function () {
        return Inertia::render('DashboardKoordinator/settings/profile');
    })->name('dashboardkoordinator.settingProfilUser')->middleware('role:admin|koordinator');
    Route::get('/dashboardkoordinator/setting-password-user', function () {
        return Inertia::render('DashboardKoordinator/settings/password');
    })->name('dashboardkoordinator.settingPasswordUser')->middleware('role:admin|koordinator');



    // User management - hanya admin
    Route::resource('users', UsersController::class)->middleware('role:admin');

    // Role management - hanya admin
    Route::resource('role', RoleController::class)->middleware('role:admin');

    // Data warga
    Route::get('/warga', [WargaController::class, 'index'])->name('warga.index')->middleware('role:admin|koordinator|warga');
    Route::get('/warga/{warga}', [WargaController::class, 'show'])->name('warga.show')->middleware('role:admin|koordinator|warga');
    Route::post('/warga', [WargaController::class, 'store'])->name('warga.store')->middleware('role:admin');
    Route::match(['put', 'patch'], '/warga/{warga}', [WargaController::class, 'update'])->name('warga.update')->middleware('role:admin|koordinator|warga');
    Route::delete('/warga/{warga}', [WargaController::class, 'destroy'])->name('warga.destroy')->middleware('role:admin');

    // Iuran warga dan jenis iuran - admin dan koordinator
    Route::resource('iuran-warga', IuranWargaController::class)->middleware('role:admin|koordinator');
    Route::resource('jenis-iuran', JenisIuranController::class)->middleware('role:admin|koordinator');

    // Pengeluaran dan kas - hanya admin
    Route::resource('pengeluaran', PengeluaranController::class)->middleware('role:admin');
    Route::resource('kas', KasController::class)->middleware('role:admin');
    Route::post('/kas/kas-out', [KasController::class, 'storeKasOut'])->name('kas.storeKasOut')->middleware('role:admin');
    Route::post('/kas/income-lain', [KasController::class, 'storeIncomeLain'])->name('kas.storeIncomeLain')->middleware('role:admin');

    // Periode - hanya admin
    Route::resource('periode', PeriodeController::class)->middleware('role:admin');

    // Rukem - hanya admin
    Route::resource('rukem', RukemController::class)->middleware('role:admin');
    Route::post('rukem/income-lain', [RukemController::class, 'storeLain'])->name('rukem.storeLain')->middleware('role:admin');
    Route::post('rukem/rukem-out', [RukemController::class, 'storeRukemOut'])->name('rukem.storeRukemOut')->middleware('role:admin');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
