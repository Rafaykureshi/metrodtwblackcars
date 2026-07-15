import { redirect } from "next/navigation";

// This route is now managed inside the main Admin Panel (/admin)
// Fleet management is accessible via the sidebar: Admin → Manage Fleet
export default function FleetPage() {
    redirect("/admin");
}