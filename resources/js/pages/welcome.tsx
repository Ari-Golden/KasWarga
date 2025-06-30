import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { type SharedData } from '@/types';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Selamat Datang" />

            <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
                >
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        Selamat Datang di <span className="text-blue-600 dark:text-blue-400">Kas Warga</span>
                    </h1>
                                                            <motion.p
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: 'easeInOut',
                        }}
                        className="text-gray-600 dark:text-gray-400 text-xl font-semibold -mt-2 mb-4"
                    >
                        RT 003 RW 011 Kelurahan Lubang Buaya Kecamatan Cipayung Jakarta Timur
                    </motion.p>
                    <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                        Aplikasi modern untuk mencatat iuran dan pengeluaran warga RT. Transparan, cepat, dan mudah.
                    </p>

                    <div className="flex justify-center lg:justify-start gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        rotate: [0, 1, -1, 0], // Sedikit rotasi ke kiri dan kanan
                        y: [0, 0.5, -0.5, 0], // Sedikit pergerakan vertikal halus
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                    }}
                    className="w-full lg:w-1/2 flex justify-center"
                >
                    <img
                        src="/gambar2.svg"
                        alt="Kas Warga Illustration"
                        className="w-3/4 lg:w-full max-w-md"
                    />
                </motion.div>
            </div>
        </>
    );
}
