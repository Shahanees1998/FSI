"use client";

import ChartWrapper from "@/components/ChartWrapper";

interface DashboardChartCardProps {
  title: string;
  subtitle?: string;
  type: string;
  data: any;
  options?: any;
  height?: string;
  emptyMessage?: string;
  className?: string;
}

function chartHasData(type: string, data: any): boolean {
  const labels = data?.labels;
  if (!Array.isArray(labels) || labels.length === 0) {
    return false;
  }
  const datasets = data?.datasets;
  if (!Array.isArray(datasets) || datasets.length === 0) {
    return false;
  }
  const values = datasets.flatMap((d: { data?: unknown[] }) =>
    Array.isArray(d.data) ? d.data : []
  ) as number[];
  if (values.length === 0) {
    return false;
  }
  if (type === "line" || type === "bar") {
    return values.some((v) => typeof v === "number" && v !== 0);
  }
  return values.some((v) => typeof v === "number");
}

export default function DashboardChartCard({
  title,
  subtitle,
  type,
  data,
  options,
  height = "280px",
  emptyMessage = "No data to display yet.",
  className = "",
}: DashboardChartCardProps) {
  const hasData = chartHasData(type, data);

  return (
    <div
      className={`surface-card border-round border-1 surface-border p-4 flex flex-column h-full w-full ${className}`.trim()}
    >
      <h3 className="mt-0 mb-2">{title}</h3>
      {subtitle && <p className="text-600 mt-0 mb-3">{subtitle}</p>}
      {hasData ? (
        <div className="flex-grow-1 min-h-0" style={{ minHeight: height }}>
          <ChartWrapper
            type={type}
            data={data}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: "#475569",
                  },
                },
              },
              scales:
                type === "doughnut" || type === "pie"
                  ? undefined
                  : {
                      x: {
                        ticks: { color: "#64748b" },
                        grid: { color: "#e2e8f0" },
                      },
                      y: {
                        ticks: { color: "#64748b" },
                        grid: { color: "#e2e8f0" },
                      },
                    },
              ...options,
            }}
            style={{ height: "100%", width: "100%" }}
            className="w-full h-full"
          />
        </div>
      ) : (
        <div
          className="flex align-items-center justify-content-center border-round surface-100 text-600 text-center px-4 flex-grow-1"
          style={{ minHeight: height }}
        >
          <p className="m-0 line-height-3" style={{ maxWidth: "22rem" }}>
            {emptyMessage}
          </p>
        </div>
      )}
    </div>
  );
}
