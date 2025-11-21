export type Kpi = {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "steady";
};

export type AppRow = {
  app: string;
  users: string;
  revenue: string;
  status: string;
  lastRelease: string;
};

export const kpis: Kpi[] = [
  {
    label: "Total users",
    value: "128K",
    delta: "+6.4%",
    trend: "up"
  },
  {
    label: "Monthly revenue",
    value: "$86.3K",
    delta: "+4.1%",
    trend: "up"
  },
  {
    label: "Productivity index",
    value: "8.3",
    delta: "+0.7",
    trend: "steady"
  }
];

export const trendPoints = [
  { label: "Mon", users: 90, revenue: 62, productivity: 70 },
  { label: "Tue", users: 94, revenue: 65, productivity: 74 },
  { label: "Wed", users: 101, revenue: 66, productivity: 73 },
  { label: "Thu", users: 107, revenue: 68, productivity: 76 },
  { label: "Fri", users: 111, revenue: 71, productivity: 79 },
  { label: "Sat", users: 118, revenue: 74, productivity: 83 },
  { label: "Sun", users: 128, revenue: 86, productivity: 84 }
];

export const appRows: AppRow[] = [
  {
    app: "Pulseboard",
    users: "34.5K",
    revenue: "$32.1K",
    status: "Scaling",
    lastRelease: "Nov 12"
  },
  {
    app: "Nexus Health",
    users: "22.4K",
    revenue: "$24.0K",
    status: "Stable",
    lastRelease: "Nov 09"
  },
  {
    app: "Ledgerly",
    users: "41.0K",
    revenue: "$21.7K",
    status: "Scaling",
    lastRelease: "Nov 08"
  },
  {
    app: "Tempo Go",
    users: "30.1K",
    revenue: "$8.5K",
    status: "Beta",
    lastRelease: "Nov 10"
  }
];

