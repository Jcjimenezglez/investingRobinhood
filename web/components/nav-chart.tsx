import type { NavPoint } from "@/lib/types";

export function NavChart({ data }: { data: NavPoint[] }) {
  if (data.length < 2) return null;

  const width = 640;
  const height = 200;
  const padding = 24;
  const minNav = Math.min(...data.map((d) => d.nav)) - 1;
  const maxNav = Math.max(...data.map((d) => d.nav)) + 1;
  const range = maxNav - minNav || 1;

  const points = data.map((d, i) => {
    const x =
      padding + (i / (data.length - 1)) * (width - padding * 2);
    const y =
      height -
      padding -
      ((d.nav - minNav) / range) * (height - padding * 2);
    return { x, y, ...d };
  });

  const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = [
    `${points[0].x},${height - padding}`,
    ...points.map((p) => `${p.x},${p.y}`),
    `${points[points.length - 1].x},${height - padding}`,
  ].join(" ");

  const last = points[points.length - 1];
  const first = data[0];
  const up = last.nav >= first.nav;

  return (
    <figure className="nav-chart" aria-label="Fund NAV over time">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`NAV from $${first.nav} to $${last.nav.toFixed(2)}`}
      >
        <defs>
          <linearGradient id="navFill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={up ? "var(--green)" : "var(--red)"}
              stopOpacity="0.25"
            />
            <stop offset="100%" stopColor="var(--bg)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="url(#navFill)"
          stroke="none"
          points={area}
        />
        <polyline
          fill="none"
          stroke={up ? "var(--green)" : "var(--red)"}
          strokeWidth="2.5"
          points={polyline}
        />
        <circle
          cx={last.x}
          cy={last.y}
          r="4"
          fill={up ? "var(--green)" : "var(--red)"}
        />
      </svg>
      <figcaption>
        NAV {first.date} → {last.date}: ${first.nav.toFixed(2)} → $
        {last.nav.toFixed(2)}
      </figcaption>
    </figure>
  );
}
