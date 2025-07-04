
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardsProps {
  iuranKasWarga: number;
  iuranRukem: number;
  iuranTotal: number;
  danaTaktis: number;
  totalPengeluaran: number;
  totalKas: number;
  totalRukem: number;
  wargaCount: number;
}

export function SectionCards({
  iuranKasWarga,
  iuranRukem,
  iuranTotal,
  danaTaktis,
  totalPengeluaran,
  totalKas,
  totalRukem,
  wargaCount,
}: SectionCardsProps) {
  const formatRupiah = (angka: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Iuran</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(iuranTotal)}
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Kas: {formatRupiah(iuranKasWarga)}
          </div>
          <div className="text-sm text-muted-foreground">
            Rukem: {formatRupiah(iuranRukem)}
          </div>
           <div className="text-sm text-muted-foreground">
            Dana Taktis: {formatRupiah(danaTaktis)}
          </div>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Pengeluaran</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(totalPengeluaran)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Saldo Kas Warga</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(totalKas)}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Saldo Rukem</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {formatRupiah(totalRukem)}
          </CardTitle>
        </CardHeader>
      </Card>
       <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Warga</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {wargaCount}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
