export interface PositionItem {
  value: string;
  label: string;
  category: string;
  sector: "Private" | "Public" | "Government / LGU" | "Core";
  description?: string;
}

export type SectorType = "All" | "Private" | "Public" | "Government / LGU" | "Core";

export const SECTOR_TABS = [
  { id: "All", label: "All Positions", icon: "🌐" },
  { id: "Private", label: "Private Sector", icon: "🏢" },
  { id: "Public", label: "Public Sector", icon: "🏛️" },
  { id: "Government / LGU", label: "Philippine LGU", icon: "🇵🇭" },
  { id: "Core", label: "Core Roles", icon: "🔑" },
] as const;

export const ALL_POSITIONS_DATA: PositionItem[] = [
  // ── CORE SYSTEM ROLES ─────────────────────────────────────────────────────
  { value: "HR", label: "HR (Human Resources)", category: "System Access", sector: "Core" },
  { value: "Operation Manager", label: "Operation Manager", category: "System Access", sector: "Core" },
  { value: "Workforce", label: "Workforce Staff", category: "System Access", sector: "Core" },
  { value: "Employee", label: "General Employee", category: "General Staff", sector: "Core" },
  { value: "Team Leader - Operation", label: "Team Leader - Operation", category: "Supervisory", sector: "Core" },
  { value: "Team Leader - Field", label: "Team Leader - Field", category: "Supervisory", sector: "Core" },
  { value: "Employee - Operation", label: "Employee - Operation", category: "Operations", sector: "Core" },
  { value: "Employee - Field", label: "Employee - Field", category: "Field", sector: "Core" },
  { value: "Frontline / Agent Roles", label: "Frontline / Agent Roles", category: "Frontline", sector: "Core" },
  { value: "Specialized Agent Roles", label: "Specialized Agent Roles", category: "Frontline", sector: "Core" },
  { value: "Supervisory & Management Roles", label: "Supervisory & Management Roles", category: "Management", sector: "Core" },
  { value: "Support & Back-Office Roles", label: "Support & Back-Office Roles", category: "Support", sector: "Core" },
  { value: "Intern", label: "Intern", category: "Apprentice", sector: "Core" },
  { value: "Trainee", label: "Trainee", category: "Apprentice", sector: "Core" },
  { value: "Provisionary", label: "Provisionary Employee", category: "Probationary", sector: "Core" },
  { value: "Instructor", label: "Instructor / Trainer", category: "Education", sector: "Core" },
  { value: "Student", label: "Student", category: "Academic", sector: "Core" },
  { value: "Marketer", label: "Marketer", category: "Marketing", sector: "Core" },

  // ── 1. PRIVATE-SECTOR COMPANY POSITIONS ──────────────────────────────────
  // Executive & Corporate Governance
  { value: "Board of Directors Member", label: "Board of Directors Member", category: "Executive & Corporate Governance", sector: "Private" },
  { value: "President / CEO", label: "President / CEO", category: "Executive & Corporate Governance", sector: "Private" },
  { value: "Chief Operating Officer (COO)", label: "Chief Operating Officer (COO)", category: "Executive & Corporate Governance", sector: "Private" },
  { value: "Chief Financial Officer (CFO)", label: "Chief Financial Officer (CFO)", category: "Executive & Corporate Governance", sector: "Private" },
  { value: "Chief Technology Officer (CTO)", label: "Chief Technology Officer (CTO)", category: "Executive & Corporate Governance", sector: "Private" },
  { value: "Executive Management", label: "Executive Management", category: "Executive & Corporate Governance", sector: "Private" },
  { value: "Corporate Planning / Strategy Officer", label: "Corporate Planning / Strategy Officer", category: "Executive & Corporate Governance", sector: "Private" },
  { value: "Corporate Governance Officer", label: "Corporate Governance Officer", category: "Executive & Corporate Governance", sector: "Private" },
  { value: "Internal Audit Officer", label: "Internal Audit Officer", category: "Executive & Corporate Governance", sector: "Private" },
  { value: "Risk Management Officer", label: "Risk Management Officer", category: "Executive & Corporate Governance", sector: "Private" },
  { value: "Legal / Corporate Counsel", label: "Legal / Corporate Counsel", category: "Executive & Corporate Governance", sector: "Private" },
  { value: "Corporate Communications Lead", label: "Corporate Communications Lead", category: "Executive & Corporate Governance", sector: "Private" },

  // Human Resources
  { value: "Human Resources Director / Manager", label: "Human Resources Director / Manager", category: "Human Resources", sector: "Private" },
  { value: "Talent Acquisition / Recruitment Specialist", label: "Talent Acquisition / Recruitment Specialist", category: "Human Resources", sector: "Private" },
  { value: "HR Operations Specialist", label: "HR Operations Specialist", category: "Human Resources", sector: "Private" },
  { value: "Compensation & Benefits Specialist", label: "Compensation & Benefits Specialist", category: "Human Resources", sector: "Private" },
  { value: "Learning & Development Specialist", label: "Learning & Development Specialist", category: "Human Resources", sector: "Private" },
  { value: "Performance Management Specialist", label: "Performance Management Specialist", category: "Human Resources", sector: "Private" },
  { value: "Employee Relations Specialist", label: "Employee Relations Specialist", category: "Human Resources", sector: "Private" },
  { value: "Organizational Development Officer", label: "Organizational Development Officer", category: "Human Resources", sector: "Private" },
  { value: "HR Information Systems (HRIS) Analyst", label: "HR Information Systems (HRIS) Analyst", category: "Human Resources", sector: "Private" },
  { value: "Employee Engagement / Wellness Officer", label: "Employee Engagement / Wellness Officer", category: "Human Resources", sector: "Private" },

  // Finance & Administration
  { value: "Finance Manager / Director", label: "Finance Manager / Director", category: "Finance & Administration", sector: "Private" },
  { value: "Senior Accountant / Certified Public Accountant", label: "Senior Accountant / Certified Public Accountant", category: "Finance & Administration", sector: "Private" },
  { value: "Treasury Specialist", label: "Treasury Specialist", category: "Finance & Administration", sector: "Private" },
  { value: "Budget & Financial Planning Analyst", label: "Budget & Financial Planning Analyst", category: "Finance & Administration", sector: "Private" },
  { value: "Tax Specialist", label: "Tax Specialist", category: "Finance & Administration", sector: "Private" },
  { value: "Payroll Specialist", label: "Payroll Specialist", category: "Finance & Administration", sector: "Private" },
  { value: "Administrative Manager", label: "Administrative Manager", category: "Finance & Administration", sector: "Private" },
  { value: "General Services Officer", label: "General Services Officer", category: "Finance & Administration", sector: "Private" },
  { value: "Facilities Management Officer", label: "Facilities Management Officer", category: "Finance & Administration", sector: "Private" },
  { value: "Asset Management Specialist", label: "Asset Management Specialist", category: "Finance & Administration", sector: "Private" },
  { value: "Records Management Officer", label: "Records Management Officer", category: "Finance & Administration", sector: "Private" },

  // Operations
  { value: "Operations Director / Manager", label: "Operations Director / Manager", category: "Operations", sector: "Private" },
  { value: "Production / Manufacturing Supervisor", label: "Production / Manufacturing Supervisor", category: "Operations", sector: "Private" },
  { value: "Quality Assurance Specialist", label: "Quality Assurance Specialist", category: "Operations", sector: "Private" },
  { value: "Quality Control Inspector", label: "Quality Control Inspector", category: "Operations", sector: "Private" },
  { value: "Process Improvement Specialist", label: "Process Improvement Specialist", category: "Operations", sector: "Private" },
  { value: "Maintenance Engineer", label: "Maintenance Engineer", category: "Operations", sector: "Private" },
  { value: "Industrial Engineer", label: "Industrial Engineer", category: "Operations", sector: "Private" },
  { value: "Health, Safety & Environment (HSE) Officer", label: "Health, Safety & Environment (HSE) Officer", category: "Operations", sector: "Private" },

  // Sales & Marketing
  { value: "Sales Director / Manager", label: "Sales Director / Manager", category: "Sales & Marketing", sector: "Private" },
  { value: "Business Development Manager", label: "Business Development Manager", category: "Sales & Marketing", sector: "Private" },
  { value: "Marketing Director / Manager", label: "Marketing Director / Manager", category: "Sales & Marketing", sector: "Private" },
  { value: "Digital Marketing Specialist", label: "Digital Marketing Specialist", category: "Sales & Marketing", sector: "Private" },
  { value: "Brand Manager", label: "Brand Manager", category: "Sales & Marketing", sector: "Private" },
  { value: "Customer Relations Officer", label: "Customer Relations Officer", category: "Sales & Marketing", sector: "Private" },
  { value: "Customer Service Representative", label: "Customer Service Representative", category: "Sales & Marketing", sector: "Private" },
  { value: "Public Relations Specialist", label: "Public Relations Specialist", category: "Sales & Marketing", sector: "Private" },

  // Procurement & Supply Chain
  { value: "Procurement / Purchasing Officer", label: "Procurement / Purchasing Officer", category: "Procurement & Supply Chain", sector: "Private" },
  { value: "Supply Chain Manager", label: "Supply Chain Manager", category: "Procurement & Supply Chain", sector: "Private" },
  { value: "Logistics Specialist", label: "Logistics Specialist", category: "Procurement & Supply Chain", sector: "Private" },
  { value: "Warehouse / Inventory Specialist", label: "Warehouse / Inventory Specialist", category: "Procurement & Supply Chain", sector: "Private" },
  { value: "Import & Export Specialist", label: "Import & Export Specialist", category: "Procurement & Supply Chain", sector: "Private" },
  { value: "Vendor / Supplier Management Specialist", label: "Vendor / Supplier Management Specialist", category: "Procurement & Supply Chain", sector: "Private" },

  // Information Technology
  { value: "Information Technology (IT) Director", label: "Information Technology (IT) Director", category: "Information Technology", sector: "Private" },
  { value: "IT Infrastructure Specialist", label: "IT Infrastructure Specialist", category: "Information Technology", sector: "Private" },
  { value: "Network Administrator", label: "Network Administrator", category: "Information Technology", sector: "Private" },
  { value: "Systems Administrator", label: "Systems Administrator", category: "Information Technology", sector: "Private" },
  { value: "Software Developer", label: "Software Developer", category: "Information Technology", sector: "Private" },
  { value: "Lead Developer", label: "Lead Developer", category: "Information Technology", sector: "Private" },
  { value: "Software Engineer", label: "Software Engineer (flexible time)", category: "Information Technology", sector: "Private" },
  { value: "Application Support Specialist", label: "Application Support Specialist", category: "Information Technology", sector: "Private" },
  { value: "Cybersecurity / Information Security Analyst", label: "Cybersecurity / Information Security Analyst", category: "Information Technology", sector: "Private" },
  { value: "Data / Database Administrator (DBA)", label: "Data / Database Administrator (DBA)", category: "Information Technology", sector: "Private" },
  { value: "Cloud / DevOps Engineer", label: "Cloud / DevOps Engineer", category: "Information Technology", sector: "Private" },
  { value: "IT Helpdesk / Technical Support", label: "IT Helpdesk / Technical Support", category: "Information Technology", sector: "Private" },

  // Research & Specialized Functions
  { value: "Research & Development (R&D) Specialist", label: "Research & Development (R&D) Specialist", category: "Research & Specialized Functions", sector: "Private" },
  { value: "Product Development Manager", label: "Product Development Manager", category: "Research & Specialized Functions", sector: "Private" },
  { value: "Data Analytics / Business Intelligence Specialist", label: "Data Analytics / Business Intelligence Specialist", category: "Research & Specialized Functions", sector: "Private" },
  { value: "Innovation Specialist", label: "Innovation Specialist", category: "Research & Specialized Functions", sector: "Private" },
  { value: "Compliance Officer", label: "Compliance Officer", category: "Research & Specialized Functions", sector: "Private" },
  { value: "Regulatory Affairs Officer", label: "Regulatory Affairs Officer", category: "Research & Specialized Functions", sector: "Private" },
  { value: "Corporate Social Responsibility (CSR) Officer", label: "Corporate Social Responsibility (CSR) Officer", category: "Research & Specialized Functions", sector: "Private" },

  // ── 2. PUBLIC-SECTOR / GOVERNMENT POSITIONS ──────────────────────────────
  // Executive / Administrative Offices
  { value: "Head of Agency / Director General", label: "Head of Agency / Director General", category: "Executive / Administrative", sector: "Public" },
  { value: "Deputy / Assistant Head of Agency", label: "Deputy / Assistant Head of Agency", category: "Executive / Administrative", sector: "Public" },
  { value: "Public Administrative Officer", label: "Public Administrative Officer", category: "Executive / Administrative", sector: "Public" },
  { value: "Planning and Development Officer (Govt)", label: "Planning and Development Officer (Govt)", category: "Executive / Administrative", sector: "Public" },
  { value: "Government Legal Officer", label: "Government Legal Officer", category: "Executive / Administrative", sector: "Public" },
  { value: "Internal Audit Officer (Govt)", label: "Internal Audit Officer (Govt)", category: "Executive / Administrative", sector: "Public" },
  { value: "Public Information / Communications Officer", label: "Public Information / Communications Officer", category: "Executive / Administrative", sector: "Public" },
  { value: "MIS / ICT Officer (Govt)", label: "MIS / ICT Officer (Govt)", category: "Executive / Administrative", sector: "Public" },

  // Human Resources
  { value: "HRMO Head / Director", label: "HRMO Head / Director", category: "Human Resources (Public)", sector: "Public" },
  { value: "Personnel Administration Officer", label: "Personnel Administration Officer", category: "Human Resources (Public)", sector: "Public" },
  { value: "Recruitment & Selection Specialist (Govt)", label: "Recruitment & Selection Specialist (Govt)", category: "Human Resources (Public)", sector: "Public" },
  { value: "Training & Development Officer (Govt)", label: "Training & Development Officer (Govt)", category: "Human Resources (Public)", sector: "Public" },
  { value: "Public Performance Management Officer", label: "Public Performance Management Officer", category: "Human Resources (Public)", sector: "Public" },
  { value: "Public Employee Relations Officer", label: "Public Employee Relations Officer", category: "Human Resources (Public)", sector: "Public" },
  { value: "Personnel Records Officer (Civil Service)", label: "Personnel Records Officer (Civil Service)", category: "Human Resources (Public)", sector: "Public" },
  { value: "Public Compensation & Benefits Officer", label: "Public Compensation & Benefits Officer", category: "Human Resources (Public)", sector: "Public" },
  { value: "Occupational Health / Employee Welfare Officer", label: "Occupational Health / Employee Welfare Officer", category: "Human Resources (Public)", sector: "Public" },

  // Finance
  { value: "Government Chief Accountant", label: "Government Chief Accountant", category: "Finance (Public)", sector: "Public" },
  { value: "Public Budget Officer", label: "Public Budget Officer", category: "Finance (Public)", sector: "Public" },
  { value: "Treasury / Cash Management Officer (Govt)", label: "Treasury / Cash Management Officer (Govt)", category: "Finance (Public)", sector: "Public" },
  { value: "Revenue / Collection Officer (Govt)", label: "Revenue / Collection Officer (Govt)", category: "Finance (Public)", sector: "Public" },
  { value: "Public Financial Management Analyst", label: "Public Financial Management Analyst", category: "Finance (Public)", sector: "Public" },

  // Procurement & Supply
  { value: "Public Procurement Officer", label: "Public Procurement Officer", category: "Procurement & Supply (Public)", sector: "Public" },
  { value: "Bids and Awards Committee (BAC) Chairman / Member", label: "Bids and Awards Committee (BAC) Chairman / Member", category: "Procurement & Supply (Public)", sector: "Public" },
  { value: "BAC Secretariat Head / Staff", label: "BAC Secretariat Head / Staff", category: "Procurement & Supply (Public)", sector: "Public" },
  { value: "Procurement Management Unit Staff", label: "Procurement Management Unit Staff", category: "Procurement & Supply (Public)", sector: "Public" },
  { value: "Government Supply Officer", label: "Government Supply Officer", category: "Procurement & Supply (Public)", sector: "Public" },
  { value: "Property / Asset Custodian", label: "Property / Asset Custodian", category: "Procurement & Supply (Public)", sector: "Public" },
  { value: "Warehouse / Stockroom In-Charge (Govt)", label: "Warehouse / Stockroom In-Charge (Govt)", category: "Procurement & Supply (Public)", sector: "Public" },

  // Operations / Service Delivery
  { value: "Public Operations Officer", label: "Public Operations Officer", category: "Operations & Service Delivery", sector: "Public" },
  { value: "Public Program Manager", label: "Public Program Manager", category: "Operations & Service Delivery", sector: "Public" },
  { value: "Public Project Management Officer", label: "Public Project Management Officer", category: "Operations & Service Delivery", sector: "Public" },
  { value: "Technical Services Specialist (Govt)", label: "Technical Services Specialist (Govt)", category: "Operations & Service Delivery", sector: "Public" },
  { value: "Government Engineer", label: "Government Engineer", category: "Operations & Service Delivery", sector: "Public" },
  { value: "Inspection / Monitoring Inspector", label: "Inspection / Monitoring Inspector", category: "Operations & Service Delivery", sector: "Public" },
  { value: "Quality Management Officer (ISO/Govt)", label: "Quality Management Officer (ISO/Govt)", category: "Operations & Service Delivery", sector: "Public" },
  { value: "Field Operations Officer (Govt)", label: "Field Operations Officer (Govt)", category: "Operations & Service Delivery", sector: "Public" },

  // Information & Technology
  { value: "Information and Communications Technology (ICT) Officer", label: "Information and Communications Technology (ICT) Officer", category: "ICT (Public)", sector: "Public" },
  { value: "Public Systems Administrator", label: "Public Systems Administrator", category: "ICT (Public)", sector: "Public" },
  { value: "Public Network Administrator", label: "Public Network Administrator", category: "ICT (Public)", sector: "Public" },
  { value: "Public Database Administrator", label: "Public Database Administrator", category: "ICT (Public)", sector: "Public" },
  { value: "Government Application Developer", label: "Government Application Developer", category: "ICT (Public)", sector: "Public" },
  { value: "Government Cybersecurity Officer", label: "Government Cybersecurity Officer", category: "ICT (Public)", sector: "Public" },
  { value: "Government IT Support Specialist", label: "Government IT Support Specialist", category: "ICT (Public)", sector: "Public" },
  { value: "Data Management Officer (Public)", label: "Data Management Officer (Public)", category: "ICT (Public)", sector: "Public" },
  { value: "Geographic Information System (GIS) Specialist", label: "Geographic Information System (GIS) Specialist", category: "ICT (Public)", sector: "Public" },

  // Legal, Compliance & Oversight
  { value: "Government Legal Counsel", label: "Government Legal Counsel", category: "Legal & Oversight", sector: "Public" },
  { value: "Public Compliance Officer", label: "Public Compliance Officer", category: "Legal & Oversight", sector: "Public" },
  { value: "Public Risk Management Analyst", label: "Public Risk Management Analyst", category: "Legal & Oversight", sector: "Public" },
  { value: "Government Archivist / Records Officer", label: "Government Archivist / Records Officer", category: "Legal & Oversight", sector: "Public" },
  { value: "Freedom of Information (FOI) Receiving Officer", label: "Freedom of Information (FOI) Receiving Officer", category: "Legal & Oversight", sector: "Public" },
  { value: "Data Protection Officer (DPO - Govt)", label: "Data Protection Officer (DPO - Govt)", category: "Legal & Oversight", sector: "Public" },
  { value: "Investigation / Administrative Hearing Officer", label: "Investigation / Administrative Hearing Officer", category: "Legal & Oversight", sector: "Public" },

  // Public Relations & Citizen Services
  { value: "Public Information Officer (PIO)", label: "Public Information Officer (PIO)", category: "Citizen Services", sector: "Public" },
  { value: "Public Assistance / Citizen Helpdesk Officer", label: "Public Assistance / Citizen Helpdesk Officer", category: "Citizen Services", sector: "Public" },
  { value: "Community Relations Officer", label: "Community Relations Officer", category: "Citizen Services", sector: "Public" },
  { value: "Communications Specialist (Govt)", label: "Communications Specialist (Govt)", category: "Citizen Services", sector: "Public" },
  { value: "Public Affairs Specialist", label: "Public Affairs Specialist", category: "Citizen Services", sector: "Public" },
  { value: "Social Services Officer (Govt)", label: "Social Services Officer (Govt)", category: "Citizen Services", sector: "Public" },

  // ── 3. PHILIPPINE LGU STRUCTURE POSITIONS ─────────────────────────────────
  { value: "Office of the Municipal Mayor - Mayor", label: "Municipal Mayor (Chief Executive)", category: "LGU Executive", sector: "Government / LGU" },
  { value: "Office of the Vice Mayor - Vice Mayor", label: "Municipal Vice Mayor (Presiding Officer)", category: "LGU Legislative", sector: "Government / LGU" },
  { value: "Sangguniang Bayan Member / Councilor", label: "Sangguniang Bayan Member (Councilor)", category: "LGU Legislative", sector: "Government / LGU" },
  { value: "Municipal Administrator", label: "Municipal Administrator", category: "LGU Executive", sector: "Government / LGU" },
  { value: "Municipal Planning & Development Coordinator (MPDC)", label: "Municipal Planning & Development Coordinator (MPDC)", category: "LGU Planning", sector: "Government / LGU" },
  { value: "Municipal Budget Officer", label: "Municipal Budget Officer", category: "LGU Finance", sector: "Government / LGU" },
  { value: "Municipal Accountant", label: "Municipal Accountant", category: "LGU Finance", sector: "Government / LGU" },
  { value: "Municipal Treasurer", label: "Municipal Treasurer", category: "LGU Finance", sector: "Government / LGU" },
  { value: "Assistant Municipal Treasurer", label: "Assistant Municipal Treasurer", category: "LGU Finance", sector: "Government / LGU" },
  { value: "Municipal Assessor", label: "Municipal Assessor", category: "LGU Revenue", sector: "Government / LGU" },
  { value: "Municipal Legal Officer", label: "Municipal Legal Officer", category: "LGU Legal", sector: "Government / LGU" },
  { value: "Municipal Human Resource Management Officer (HRMO)", label: "Municipal Human Resource Management Officer (HRMO)", category: "LGU HR", sector: "Government / LGU" },
  { value: "Municipal Engineer", label: "Municipal Engineer", category: "LGU Engineering", sector: "Government / LGU" },
  { value: "Local Building Official", label: "Local Building Official", category: "LGU Engineering", sector: "Government / LGU" },
  { value: "Municipal Health Officer (MHO)", label: "Municipal Health Officer (MHO / Doctor)", category: "LGU Health", sector: "Government / LGU" },
  { value: "Municipal Social Welfare & Development Officer (MSWDO)", label: "Municipal Social Welfare & Development Officer (MSWDO)", category: "LGU Welfare", sector: "Government / LGU" },
  { value: "Municipal Agriculturist", label: "Municipal Agriculturist", category: "LGU Agriculture", sector: "Government / LGU" },
  { value: "Municipal Environment & Natural Resources Officer (MENRO)", label: "Municipal Environment & Natural Resources Officer (MENRO)", category: "LGU Environment", sector: "Government / LGU" },
  { value: "Municipal Disaster Risk Reduction & Management Officer (MDRRMO)", label: "Municipal Disaster Risk Reduction & Management Officer (MDRRMO)", category: "LGU Disaster & Safety", sector: "Government / LGU" },
  { value: "Municipal General Services Officer (GSO)", label: "Municipal General Services Officer (GSO)", category: "LGU General Services", sector: "Government / LGU" },
  { value: "Municipal Information Technology / ICT Officer", label: "Municipal Information Technology / ICT Officer", category: "LGU ICT", sector: "Government / LGU" },
  { value: "Municipal Information Officer (MIO)", label: "Municipal Information Officer (MIO)", category: "LGU Communications", sector: "Government / LGU" },
  { value: "Municipal Civil Registrar (MCR)", label: "Municipal Civil Registrar (MCR)", category: "LGU Civil Registry", sector: "Government / LGU" },
  { value: "Local Economic Enterprise Officer", label: "Local Economic Enterprise Officer", category: "LGU Enterprise", sector: "Government / LGU" },
  { value: "Public Employment Service Office (PESO) Manager", label: "Public Employment Service Office (PESO) Manager", category: "LGU Employment", sector: "Government / LGU" },
  { value: "Business Permits & Licensing Officer (BPLO)", label: "Business Permits & Licensing Officer (BPLO)", category: "LGU Licensing", sector: "Government / LGU" },
  { value: "Procurement / BAC Secretariat Officer (LGU)", label: "Procurement / BAC Secretariat Officer (LGU)", category: "LGU Procurement", sector: "Government / LGU" },
  { value: "Tourism Officer", label: "Tourism Officer", category: "LGU Tourism", sector: "Government / LGU" },
  { value: "Cooperative Development Officer", label: "Cooperative Development Officer", category: "LGU Cooperatives", sector: "Government / LGU" },
  { value: "Local Youth Development Officer (LYDO)", label: "Local Youth Development Officer (LYDO)", category: "LGU Youth", sector: "Government / LGU" },
  { value: "Barangay Affairs Coordinator", label: "Barangay Affairs Coordinator", category: "LGU Community", sector: "Government / LGU" },
  { value: "Administrative Aide / Staff (LGU)", label: "Administrative Aide / Staff (LGU)", category: "LGU Support", sector: "Government / LGU" },
  { value: "Revenue Collection Clerk (LGU)", label: "Revenue Collection Clerk (LGU)", category: "LGU Revenue", sector: "Government / LGU" },
  { value: "Traffic Management Officer / Enforcer", label: "Traffic Management Officer / Enforcer", category: "LGU Safety", sector: "Government / LGU" },
];

export const getPositionsBySector = (sector: SectorType): PositionItem[] => {
  if (sector === "All") return ALL_POSITIONS_DATA;
  return ALL_POSITIONS_DATA.filter((p) => p.sector === sector);
};
