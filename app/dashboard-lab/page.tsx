import type { Metadata } from "next";
import { Dashboard } from "@/components/dashboard";
import rows from "@/data/dashboard-sample.json";

export const metadata: Metadata = {
  title: "Dashboard Lab",
  description: "Explore a filterable dashboard built with clearly labelled synthetic sample data.",
};

export default function DashboardLabPage() {
  return (
    <div className="site-shell py-16 md:py-24">
      <p className="eyebrow">01 / Dashboard Lab</p>
      <h1 className="page-heading mb-6 mt-5 max-w-4xl">A working view of sample commercial data.</h1>
      <p className="body-copy mb-10 max-w-2xl">Every record on this page is synthetic and for demonstration only. It is not client, platform or market data. Figures update when you filter the view.</p>
      <Dashboard rows={rows} />
    </div>
  );
}
