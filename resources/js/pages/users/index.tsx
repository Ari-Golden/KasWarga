import { AppSidebar } from '@/components/app-sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarHeader, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Head } from '@inertiajs/react';
import DataUsers from './data_users';

type User = {
    id: number;
    name: string;
    email: string;
};

type Role = {
    id: number;
    name: string;
};

interface IndexProps {
    users: User[];
    roles: Role[];
}

export default function Index({ users, roles }: IndexProps) {
    console.log(roles);
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': 'calc(var(--spacing) * 72)',
                    '--header-height': 'calc(var(--spacing) * 12)',
                } as React.CSSProperties
            }
        >
            <Head title="Daftar Users" />
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SidebarHeader />
                <div className="mx-auto ml-4 flex w-full max-w-screen-xl flex-1 flex-col gap-2">
                    <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>

                    <Card className="mt-4 p-4 shadow-md">
                        <Card>
                            <CardHeader>
                                <CardTitle>Data Users</CardTitle>
                                <CardDescription>Data user aplikasi</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataUsers users={users} />
                            </CardContent>
                        </Card>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
