import "dotenv/config";
import mongoose from "mongoose";
import Department from "../models/global/department.model";
import UserModel from "../models/workforce/user.model";

const DEPARTMENTS_DATA = [
  // ── 1. Private-Sector Company Departments ──────────────────────────────────
  {
    name: "Executive & Corporate Governance",
    type: "Private",
    description: "Board of Directors, Executive Management, Strategy, Legal & Corporate Communications",
    location: "Corporate Headquarters",
  },
  {
    name: "Human Resources Department",
    type: "Private",
    description: "Talent Acquisition, HR Operations, Comp & Benefits, Learning, Performance & Employee Relations",
    location: "Corporate Headquarters",
  },
  {
    name: "Finance & Administration",
    type: "Private",
    description: "Finance, Accounting, Treasury, Budget, Tax, Payroll, Facilities & Records Management",
    location: "Corporate Headquarters",
  },
  {
    name: "Operations",
    type: "Private",
    description: "Operations, Production, QA, Quality Control, Process Improvement, Maintenance & HSE",
    location: "Main Office / Facility",
  },
  {
    name: "Sales & Marketing",
    type: "Private",
    description: "Sales, Business Development, Digital Marketing, Brand, Customer Relations & PR",
    location: "Corporate Headquarters",
  },
  {
    name: "Procurement & Supply Chain",
    type: "Private",
    description: "Purchasing, Supply Chain Management, Logistics, Warehouse, Import/Export & Vendor Management",
    location: "Logistics Hub",
  },
  {
    name: "Information Technology (IT)",
    type: "Private",
    description: "Infrastructure, Network, Software Development, App Support, Cybersecurity, DBA, DevOps & Helpdesk",
    location: "Tech Center",
  },
  {
    name: "Research & Specialized Functions",
    type: "Private",
    description: "R&D, Product Development, Data Analytics, Innovation, Regulatory Affairs & CSR",
    location: "Innovation Hub",
  },

  // ── 2. Public-Sector / Government Departments ──────────────────────────────
  {
    name: "Executive / Administrative Offices",
    type: "Public",
    description: "Office of the Head of Agency, Planning, Internal Audit & Public Communications",
    location: "Government Center",
  },
  {
    name: "Human Resource Management Office (HRMO)",
    type: "Public",
    description: "Personnel Administration, Recruitment, Training, Welfare & Records",
    location: "Government Center",
  },
  {
    name: "Finance & Accounting Office",
    type: "Public",
    description: "Accounting, Budget, Treasury, Cash Management & Revenue Collection",
    location: "Government Center",
  },
  {
    name: "Procurement & Supply Office",
    type: "Public",
    description: "Bids and Awards Committee (BAC), Supply, Asset Management & Warehouse",
    location: "Government Center",
  },
  {
    name: "Operations / Service Delivery",
    type: "Public",
    description: "Program Management, Technical Services, Engineering & Field Operations",
    location: "Operations Complex",
  },
  {
    name: "Management Information Systems / ICT",
    type: "Public",
    description: "ICT, Network Administration, Database, Cyber Security, GIS & Helpdesk",
    location: "Government Center",
  },
  {
    name: "Legal, Compliance & Oversight",
    type: "Public",
    description: "Legal Office, Data Privacy, Freedom of Information (FOI) & Administrative Cases",
    location: "Government Center",
  },
  {
    name: "Public Relations & Citizen Services",
    type: "Public",
    description: "Public Information Office (PIO), Citizen Helpdesk, Community Relations & Social Services",
    location: "Public Service Center",
  },

  // ── 3. Philippine LGU Structure ───────────────────────────────────────────
  {
    name: "Office of the Municipal Mayor",
    type: "Government / LGU",
    description: "Executive leadership and administration of the municipality",
    location: "Municipal Hall",
  },
  {
    name: "Office of the Vice Mayor & Sangguniang Bayan",
    type: "Government / LGU",
    description: "Legislative branch and municipal council affairs",
    location: "Legislative Building",
  },
  {
    name: "Municipal Planning & Development Office (MPDO)",
    type: "Government / LGU",
    description: "Socio-economic planning, zoning, and municipal development initiatives",
    location: "Municipal Hall",
  },
  {
    name: "Municipal Budget Office",
    type: "Government / LGU",
    description: "Budget preparation, expenditure monitoring, and fiscal allocations",
    location: "Municipal Hall",
  },
  {
    name: "Municipal Accounting Office",
    type: "Government / LGU",
    description: "Government accounting, financial statements, and pre-audit services",
    location: "Municipal Hall",
  },
  {
    name: "Municipal Treasury Office",
    type: "Government / LGU",
    description: "Revenue collection, cash custody, and local disbursements",
    location: "Municipal Hall",
  },
  {
    name: "Municipal Assessor's Office",
    type: "Government / LGU",
    description: "Real property assessment, tax mapping, and property classification",
    location: "Municipal Hall",
  },
  {
    name: "Municipal Legal Office",
    type: "Government / LGU",
    description: "Legal advisory, ordinance formulation, and municipal representation",
    location: "Municipal Hall",
  },
  {
    name: "Municipal HRMO",
    type: "Government / LGU",
    description: "Civil service compliance, plantilla management, employee benefits & attendance",
    location: "Municipal Hall",
  },
  {
    name: "Municipal Engineering Office",
    type: "Government / LGU",
    description: "Public infrastructure, building permits, and civil works monitoring",
    location: "Engineering Compound",
  },
  {
    name: "Municipal Health Office (MHO)",
    type: "Government / LGU",
    description: "Rural health units, primary healthcare, sanitation, and disease surveillance",
    location: "Rural Health Center",
  },
  {
    name: "Municipal Social Welfare & Development (MSWDO)",
    type: "Government / LGU",
    description: "Social protection, senior citizen/PWD assistance, crisis intervention",
    location: "Community Center",
  },
  {
    name: "Municipal Agriculture Office",
    type: "Government / LGU",
    description: "Farmer and fisherfolk support, food security, and agricultural extension",
    location: "Agriculture Hub",
  },
  {
    name: "Municipal Environment & Natural Resources (MENRO)",
    type: "Government / LGU",
    description: "Solid waste management, tree planting, and ecological protection",
    location: "Municipal Hall",
  },
  {
    name: "Municipal Disaster Risk Reduction & Management (MDRRMO)",
    type: "Government / LGU",
    description: "Emergency response, disaster preparedness, rescue operations, and sirens",
    location: "Emergency Operations Center",
  },
  {
    name: "Municipal General Services Office (GSO)",
    type: "Government / LGU",
    description: "Property custody, inventory management, building maintenance, and supply logistics",
    location: "GSO Depot",
  },
  {
    name: "Municipal Information Technology / ICT Office",
    type: "Government / LGU",
    description: "Digital transformation, municipal network, portals, and biometrics systems",
    location: "Municipal Hall",
  },
  {
    name: "Municipal Civil Registrar",
    type: "Government / LGU",
    description: "Vital statistics, birth, marriage, and death registrations",
    location: "Municipal Hall",
  },
  {
    name: "Public Employment Service Office (PESO)",
    type: "Government / LGU",
    description: "Job facilitation, skills matching, livelihoods, and summer job programs",
    location: "Livelihood Center",
  },
  {
    name: "Business Permits & Licensing Office (BPLO)",
    type: "Government / LGU",
    description: "One-stop shop business registration, clearances, and regulatory inspections",
    location: "Business Center",
  },
];

async function seedDepartments() {
  const uri = process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/hrms";
  console.log(`Connecting to MongoDB at: ${uri}`);
  await mongoose.connect(uri);

  // Find super admin or first user to designate as default head where appropriate
  const superAdmin = await UserModel.findOne({
    $or: [
      { email: "quantumcloudcorporation@gmail.com" },
      { username: "admin" },
      { position: { $in: ["HR", "Operation Manager"] } },
    ],
  });

  const adminId = superAdmin ? superAdmin._id : null;
  console.log(`Using default administrator: ${superAdmin?.firstName} ${superAdmin?.lastName} (${superAdmin?.email})`);

  let createdCount = 0;
  let updatedCount = 0;

  for (const depData of DEPARTMENTS_DATA) {
    const existing = await Department.findOne({ name: depData.name });
    if (existing) {
      await Department.updateOne(
        { _id: existing._id },
        {
          $set: {
            type: depData.type,
            description: depData.description,
            location: depData.location,
            status: true,
            // If head not set yet, set admin as head for key management departments
            head: existing.head || (depData.name.includes("Human Resources") || depData.name.includes("Executive") ? adminId : null),
          },
        }
      );
      updatedCount++;
    } else {
      await Department.create({
        ...depData,
        head: depData.name.includes("Human Resources") || depData.name.includes("Executive") ? adminId : null,
        members: adminId ? [adminId] : [],
        status: true,
      });
      createdCount++;
    }
  }

  const total = await Department.countDocuments();
  console.log(`\n==================================================`);
  console.log(`DEPARTMENTS SEEDED SUCCESSFULLY:`);
  console.log(`- Created: ${createdCount}`);
  console.log(`- Updated: ${updatedCount}`);
  console.log(`- Total Departments in Database: ${total}`);
  console.log(`==================================================\n`);

  await mongoose.disconnect();
}

seedDepartments().catch(console.error);
