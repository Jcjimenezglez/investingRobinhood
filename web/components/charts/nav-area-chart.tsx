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
    theme: {
      light: "#171717",
      dark: "#ededed",
    },
  },
};

export function NavAreaChart({ data }: { data: NavPoint[] }) {
  return (
    <ChartContainer config={chartConfig} className="aspect-[2.8/1] h-[220px] w-full">
      <AreaChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={false}
          tickLine={false}
          axisLine={{ stroke: "var(--border)", strokeWidth: 1 }}
          height={12}
        />
        <YAxis
          tick={false}
          tickLine={false}
          axisLine={{ stroke: "var(--border)", strokeWidth: 1 }}
          width={12}
          domain={["dataMin - 1", "dataMax + 1"]}
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
