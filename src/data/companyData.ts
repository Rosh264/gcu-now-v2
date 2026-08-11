export interface Company {
  id: string;
  company: string;
  logoText?: string;
  logoBg?: string;
  logoColor?: string;
  logoType?: 'text' | 'icon';
  industry: string;
  type: string;
  status: 'Interested' | 'Prospect' | 'Drive Confirmed' | 'Contacted';
  statusClass: string;
  lastContact: string;
  nextFollowup: string;
  activeDrives: number;
}

export const companies: Company[] = [
  {
    id: "1",
    company: "TechFlow Inc.",
    logoText: "Z",
    logoBg: "#E0F2FE",
    logoColor: "#0284C7",
    industry: "Software & IT",
    type: "Enterprise",
    status: "Interested",
    statusClass: "status-interested",
    lastContact: "Oct 12, 2023",
    nextFollowup: "Oct 15, 2023",
    activeDrives: 1,
  },
  {
    id: "2",
    company: "Global Industries",
    logoText: "G",
    logoBg: "#1F2937",
    logoColor: "#FFFFFF",
    industry: "Manufacturing",
    type: "Mid-Market",
    status: "Prospect",
    statusClass: "status-prospect",
    lastContact: "Sep 28, 2023",
    nextFollowup: "-",
    activeDrives: 0,
  },
  {
    id: "3",
    company: "Nova Finance",
    logoText: "📈",
    logoBg: "#ECFDF5",
    logoColor: "#10B981",
    logoType: "icon",
    industry: "Financial Services",
    type: "Startup",
    status: "Drive Confirmed",
    statusClass: "status-confirmed",
    lastContact: "Oct 14, 2023",
    nextFollowup: "Nov 01, 2023",
    activeDrives: 2,
  },
  {
    id: "4",
    company: "Apex Energy",
    logoText: "⚡",
    logoBg: "#FEF3C7",
    logoColor: "#F59E0B",
    logoType: "icon",
    industry: "Energy",
    type: "Enterprise",
    status: "Contacted",
    statusClass: "status-contacted",
    lastContact: "Oct 10, 2023",
    nextFollowup: "Oct 20, 2023",
    activeDrives: 0,
  },
];