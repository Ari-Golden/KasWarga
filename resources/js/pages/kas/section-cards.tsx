
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardsProps {
  iuranTotal: number;
  iuranCount: number;
  wargaCount: number;
  totalPengeluaran: number;
  totalKas: number;
}

export function SectionCards({
  iuranTotal,
  iuranCount,
  wargaCount,
  totalPengeluaran,
  totalKas,
}: SectionCardsProps) {
  const formatRupiah = (angka: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
      {/* Card 1 */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Iuran Bulanan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(iuranTotal)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Jumlah Transaksi: {iuranCount}
          </div>
          <div className="text-muted-foreground">Iuran masuk bulan ini</div>
        </CardFooter>
      </Card>

      {/* Card 2 */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Warga</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {wargaCount}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Data warga aktif
          </div>
          <div className="text-muted-foreground">Update terbaru</div>
        </CardFooter>
      </Card>

      {/* Card 3 */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pengeluaran</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(totalPengeluaran)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -7%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Dana keluar bulan ini
          </div>
          <div className="text-muted-foreground">Monitoring ketat</div>
        </CardFooter>
      </Card>

      {/* Card 4 */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Kas Sekarang</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(totalKas)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Saldo kas saat ini
          </div>
          <div className="text-muted-foreground">Aman</div>
        </CardFooter>
      </Card>
    </div>
  );
}
