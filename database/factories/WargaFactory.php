<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Warga>
 */
class WargaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => $this->faker->name,
            'no_kk' => $this->faker->numerify('############'),
            'no_ktp' => $this->faker->numerify('################'),
            'alamat' => $this->faker->address,
            'rt_rw' => 'RT ' . $this->faker->numerify('###') . ' RW ' . $this->faker->numerify('###'),
            'no_hp' => $this->faker->phoneNumber,
            'status_aktif' => true, // 1 untuk aktif, 0 untuk tidak aktif
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
