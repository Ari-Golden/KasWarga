<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SinkronUserKeWarga extends Command
{
    protected $signature = 'sinkron:user-ke-warga';
    protected $description = 'Sinkronisasi user_id ke tabel wargas berdasarkan nama';
    public function handle()
    {
        $this->info('Mulai menyinkronkan user_id ke tabel wargas...');

        // Contoh: cocokkan berdasarkan nama
        $users = \App\Models\User::all();

        foreach ($users as $user) {
            $warga = \App\Models\Warga::where('nama', $user->name)->first();
            if ($warga) {
                $warga->user_id = $user->id;
                $warga->save();
                $this->line("✓ {$user->name} → Warga #{$warga->id}");
            } else {
                $this->warn("✗ Tidak ditemukan warga dengan nama: {$user->name}");
            }
        }

        $this->info('Selesai!');
    }
}
