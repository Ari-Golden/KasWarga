<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Warga;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class WargaToUserSeeder extends Seeder
{
    public function run(): void
    {
        $wargas = Warga::whereNotNull('nama')->where('nama', '!=', '')->get();

        foreach ($wargas as $warga) {
            $name = trim($warga->nama);

            if (empty($name)) {
                dump("Lewati: Data warga ID {$warga->id} tidak memiliki nama.");
                continue;
            }

            // Generate email dari nama
            $emailName = preg_replace('/[^a-z0-9]+/i', '_', strtolower($name));
            $email = $emailName . '@example.com';

            dump("Menambahkan: {$warga->nama} - $email");

            // Cek apakah sudah ada user dengan email ini
            User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => ucwords(strtolower($name)),
                    'password' => Hash::make('12345678'),
                ]
            );
        }

        info('Sukses menyinkronkan warga menjadi user.');
    }
}