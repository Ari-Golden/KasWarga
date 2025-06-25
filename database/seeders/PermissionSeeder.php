<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset permission cache
        // app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Buat permission list
        $permissions = [
            // Iuran
            'iuran.view',
            'iuran.create',
            'iuran.edit',
            'iuran.delete',

            // Warga
            'warga.view',
            'warga.create',
            'warga.edit',
            'warga.delete',

            // Kas
            'kas.view',
            'kas.create',
            'kas.edit',
            'kas.delete',

             // Rukem
            'rukem.view',
            'rukem.create',
            'rukem.edit',
            'rukem.delete',

            // Role
            'role.view',
            'role.create',
            'role.edit',
            'role.delete',

            // User
            'user.view',
            'user.create',
            'user.edit',
            'user.delete',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Role Admin dapat semua
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions(Permission::all());

        // Role Koordinator (boleh ditambah nanti)
        $koordinator = Role::firstOrCreate(['name' => 'koordinator']);
        $koordinator->syncPermissions([
            'iuran.view', 'iuran.create', 'iuran.edit', 'iuran.delete',
            'warga.view',
            'kas.view',
            'rukem.view',
        ]);

        // Role Warga
        $warga = Role::firstOrCreate(['name' => 'warga']);
        $warga->syncPermissions([
            'warga.view',
            'kas.view',
            'rukem.view',
        ]);

        // Assign ke admin@gmail.com
        $adminUser = User::where('email', 'admin@gmail.com')->first();
        if ($adminUser) {
            $adminUser->assignRole('admin');
        }
    }
}
