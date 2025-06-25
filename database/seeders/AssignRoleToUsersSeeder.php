<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AssignRoleToUsersSeeder extends Seeder
{
    public function run()
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $wargaRole = Role::firstOrCreate(['name' => 'warga']);

        $users = User::all();

        foreach ($users as $user) {
            if ($user->email === 'admin@gmail.com') {
                $user->syncRoles([$adminRole]);
            } else {
                $user->syncRoles([$wargaRole]);
            }
        }

        $this->command->info('Semua user telah diberikan role sesuai ketentuan.');
    }
}
