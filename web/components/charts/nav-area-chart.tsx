"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { NavPoint } from "@/lib/types";

const chartConfig = {
  nav: {
    label: "NAV",
    color: "#0a0a0a",
  },
};

function formatDate(date: string) {
  const d = new Date(date + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function NavAreaChart({ data }: { data: NavPoint[] }) {
  const chartData = data.map((p) => ({
    ...p,
    label: formatDate(p.date),
  }));

  return (
    <ChartContainer config={chartConfig} className="aspect-[2.8/1] h-[220px] w-full">
      <AreaChart data={chartData} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={24}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={48}
          domain={["dataMin - 1", "dataMax + 1"]}
          tickFormatter={(v) => `$${v}`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.date ?? ""
              }
              formatter={(value) => [`$${Number(value).toFixed(2)}`, "NAV"]}
            />
          }
        />
        <Area
          type="monotone"
          dataKey="nav"
          stroke="var(--color-nav)"
          fill="var(--color-nav)"
          fillOpacity={0.06}
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
