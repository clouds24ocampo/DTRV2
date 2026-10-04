import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Department from "../models/global/department.model";
import UserModel from "../models/workforce/user.model";
import Schedule from "../models/global/schedule.model";

const UNIFIED_PASSWORD = "Admin@123456";

interface DummyDeptEmployee {
  deptName: string;
  isHead: boolean;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  position: string[];
  systemRole: string[]; // For UI navigation access (HR, Operation Manager, Workforce, Employee, etc.)
  shift: string;
}

const DUMMY_ACCOUNTS: DummyDeptEmployee[] = [
  // ── PRIVATE SECTOR ──────────────────────────────────────────────────────────
  {
    deptName: "Executive & Corporate Governance",
    isHead: true,
    username: "ceo.private",
    email: "ceo@quantumcloud.com",
    firstName: "Victoria",
    lastName: "Valdez",
    position: ["President / CEO", "Operation Manager"],
    systemRole: ["Operation Manager", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Human Resources Department",
    isHead: true,
    username: "head.hr",
    email: "head.hr@quantumcloud.com",
    firstName: "Beatrice",
    lastName: "Mendoza",
    position: ["Human Resources Director / Manager", "HR"],
    systemRole: ["HR", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Human Resources Department",
    isHead: false,
    username: "staff.hr",
    email: "staff.hr@quantumcloud.com",
    firstName: "Claire",
    lastName: "Pascual",
    position: ["Talent Acquisition / Recruitment Specialist", "HR"],
    systemRole: ["HR", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Finance & Administration",
    isHead: true,
    username: "head.finance",
    email: "head.finance@quantumcloud.com",
    firstName: "Dominic",
    lastName: "Tan",
    position: ["Finance Manager / Director", "Operation Manager"],
    systemRole: ["Operation Manager", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Finance & Administration",
    isHead: false,
    username: "staff.accounting",
    email: "accounting@quantumcloud.com",
    firstName: "Lorenzo",
    lastName: "Chua",
    position: ["Senior Accountant / Certified Public Accountant", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Operations",
    isHead: true,
    username: "head.operations",
    email: "head.operations@quantumcloud.com",
    firstName: "Gabriel",
    lastName: "Mercado",
    position: ["Operations Director / Manager", "Operation Manager", "Workforce"],
    systemRole: ["Operation Manager", "Workforce", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Sales & Marketing",
    isHead: true,
    username: "head.sales",
    email: "head.sales@quantumcloud.com",
    firstName: "Patricia",
    lastName: "Reyes",
    position: ["Sales Director / Manager", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Procurement & Supply Chain",
    isHead: true,
    username: "head.procurement",
    email: "head.procurement@quantumcloud.com",
    firstName: "Raymond",
    lastName: "Aquino",
    position: ["Procurement / Purchasing Manager", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Information Technology (IT)",
    isHead: true,
    username: "head.it",
    email: "head.it@quantumcloud.com",
    firstName: "Christian",
    lastName: "Navarro",
    position: ["IT Director / Manager", "Operation Manager", "Workforce"],
    systemRole: ["Operation Manager", "Workforce", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Research & Specialized Functions",
    isHead: true,
    username: "head.research",
    email: "head.research@quantumcloud.com",
    firstName: "Eleanor",
    lastName: "Castillo",
    position: ["Research & Development (R&D) Manager", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },

  // ── PUBLIC SECTOR / NATIONAL GOVERNMENT ─────────────────────────────────────
  {
    deptName: "Executive / Administrative Offices",
    isHead: true,
    username: "director.admin",
    email: "director.exec@gov.ph",
    firstName: "Danilo",
    lastName: "Soriano",
    position: ["Executive Director", "Operation Manager"],
    systemRole: ["Operation Manager", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Human Resource Management Office (HRMO)",
    isHead: true,
    username: "hrmo.director",
    email: "director.hrmo@gov.ph",
    firstName: "Esperanza",
    lastName: "Lim",
    position: ["Director / HRMO V", "HR"],
    systemRole: ["HR", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Finance & Accounting Office",
    isHead: true,
    username: "finance.public",
    email: "finance.public@gov.ph",
    firstName: "Manuel",
    lastName: "Roxas",
    position: ["Chief Administrative Officer (Finance)", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Procurement & Supply Office",
    isHead: true,
    username: "procurement.public",
    email: "procurement@gov.ph",
    firstName: "Ferdinand",
    lastName: "Magno",
    position: ["BAC Secretariat Head / Procurement Officer V", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Operations / Service Delivery",
    isHead: true,
    username: "ops.service",
    email: "services@gov.ph",
    firstName: "Teresa",
    lastName: "Flores",
    position: ["Operations Chief / Division Chief", "Operation Manager"],
    systemRole: ["Operation Manager", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Management Information Systems / ICT",
    isHead: true,
    username: "ict.public",
    email: "ict.director@gov.ph",
    firstName: "Enrico",
    lastName: "Villanueva",
    position: ["Information Technology Officer III", "Workforce"],
    systemRole: ["Workforce", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Legal, Compliance & Oversight",
    isHead: true,
    username: "legal.public",
    email: "attorney.general@gov.ph",
    firstName: "Atty. Rafael",
    lastName: "Abad",
    position: ["Attorney V / Division Chief (Legal)", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Public Relations & Citizen Services",
    isHead: true,
    username: "pio.public",
    email: "pio@gov.ph",
    firstName: "Maricel",
    lastName: "Gomez",
    position: ["Public Information Officer (PIO) V", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },

  // ── PHILIPPINE LOCAL GOVERNMENT UNIT (LGU) ──────────────────────────────────
  {
    deptName: "Office of the Municipal Mayor",
    isHead: true,
    username: "mayor.lgu",
    email: "mayor@quezoncity.gov.ph",
    firstName: "Hon. Arthur",
    lastName: "Salazar",
    position: ["City / Municipal Mayor", "Operation Manager"],
    systemRole: ["Operation Manager", "HR", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Office of the Vice Mayor & Sangguniang Bayan",
    isHead: true,
    username: "vicemayor.lgu",
    email: "vicemayor@quezoncity.gov.ph",
    firstName: "Hon. Katherine",
    lastName: "Bernardo",
    position: ["City / Municipal Vice Mayor", "Operation Manager"],
    systemRole: ["Operation Manager", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Planning & Development Office (MPDO)",
    isHead: true,
    username: "mpdo.head",
    email: "mpdo.head@quezoncity.gov.ph",
    firstName: "Engr. Ernesto",
    lastName: "Dizon",
    position: ["City / Municipal Planning & Development Coordinator (CPDC/MPDC)", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Budget Office",
    isHead: true,
    username: "budget.lgu",
    email: "budget@quezoncity.gov.ph",
    firstName: "Rosario",
    lastName: "Magpantay",
    position: ["City / Municipal Budget Officer", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Accounting Office",
    isHead: true,
    username: "accountant.lgu",
    email: "accountant@quezoncity.gov.ph",
    firstName: "Carmela",
    lastName: "Cruz",
    position: ["City / Municipal Accountant", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Treasury Office",
    isHead: true,
    username: "treasurer.lgu",
    email: "treasurer@quezoncity.gov.ph",
    firstName: "Guillermo",
    lastName: "Tolentino",
    position: ["City / Municipal Treasurer", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Assessor's Office",
    isHead: true,
    username: "assessor.lgu",
    email: "assessor@quezoncity.gov.ph",
    firstName: "Leonardo",
    lastName: "Vargas",
    position: ["City / Municipal Assessor", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Legal Office",
    isHead: true,
    username: "legal.lgu",
    email: "citylegal@quezoncity.gov.ph",
    firstName: "Atty. Katrina",
    lastName: "Alcantara",
    position: ["City / Municipal Legal Officer", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal HRMO",
    isHead: true,
    username: "hrmo.lgu",
    email: "hrmo@quezoncity.gov.ph",
    firstName: "Corazon",
    lastName: "Aquino",
    position: ["Local Government HRMO V", "HR"],
    systemRole: ["HR", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Engineering Office",
    isHead: true,
    username: "engineer.lgu",
    email: "cityengineer@quezoncity.gov.ph",
    firstName: "Engr. Renato",
    lastName: "Bautista",
    position: ["City / Municipal Engineer", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Health Office (MHO)",
    isHead: true,
    username: "health.lgu",
    email: "healthofficer@quezoncity.gov.ph",
    firstName: "Dr. Angelica",
    lastName: "Montemayor",
    position: ["City / Municipal Health Officer (MHO)", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Social Welfare & Development (MSWDO)",
    isHead: true,
    username: "mswdo.lgu",
    email: "socialwelfare@quezoncity.gov.ph",
    firstName: "Flordeliza",
    lastName: "Ramos",
    position: ["Social Welfare & Development Officer (CSWDO/MSWDO)", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Agriculture Office",
    isHead: true,
    username: "agriculturist.lgu",
    email: "agriculture@quezoncity.gov.ph",
    firstName: "Felipe",
    lastName: "Guanzon",
    position: ["City / Municipal Agriculturist", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Environment & Natural Resources (MENRO)",
    isHead: true,
    username: "menro.lgu",
    email: "menro@quezoncity.gov.ph",
    firstName: "Vicente",
    lastName: "Manansala",
    position: ["City / Municipal Environment & Natural Resources Officer (CENRO/MENRO)", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Disaster Risk Reduction & Management (MDRRMO)",
    isHead: true,
    username: "mdrrmo.lgu",
    email: "drrmo@quezoncity.gov.ph",
    firstName: "Col. Jaime",
    lastName: "Del Rosario",
    position: ["Disaster Risk Reduction & Management Officer (CDRRMO/MDRRMO)", "Operation Manager"],
    systemRole: ["Operation Manager", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal General Services Office (GSO)",
    isHead: true,
    username: "gso.lgu",
    email: "gso@quezoncity.gov.ph",
    firstName: "Alfonso",
    lastName: "Serrano",
    position: ["General Services Officer (CGSO/MGSO)", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Information Technology / ICT Office",
    isHead: true,
    username: "ict.lgu",
    email: "ict@quezoncity.gov.ph",
    firstName: "Mark",
    lastName: "Esguerra",
    position: ["Local Government ICT Officer", "Workforce"],
    systemRole: ["Workforce", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Municipal Civil Registrar",
    isHead: true,
    username: "registrar.lgu",
    email: "civilregistrar@quezoncity.gov.ph",
    firstName: "Milagros",
    lastName: "Cunanan",
    position: ["City / Municipal Civil Registrar", "Employee"],
    systemRole: ["Employee"],
    shift: "Morning",
  },
  {
    deptName: "Public Employment Service Office (PESO)",
    isHead: true,
    username: "peso.lgu",
    email: "peso@quezoncity.gov.ph",
    firstName: "Eduardo",
    lastName: "Balagtas",
    position: ["PESO Manager / Employment Facilitator", "HR"],
    systemRole: ["HR", "Employee"],
    shift: "Morning",
  },
  {
    deptName: "Business Permits & Licensing Office (BPLO)",
    isHead: true,
    username: "bplo.lgu",
    email: "bplo@quezoncity.gov.ph",
    firstName: "Aurelio",
    lastName: "Ocampo",
    position: ["BPLO Head / Licensing Officer", "Operation Manager"],
    systemRole: ["Operation Manager", "Employee"],
    shift: "Morning",
  },
];

async function seedDummyEmployees() {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hrms";
  console.log(`Connecting to MongoDB at: ${mongoUri}`);
  await mongoose.connect(mongoUri);

  // Hash universal password
  const hashedPassword = await bcrypt.hash(UNIFIED_PASSWORD, 10);

  // Remove duplicate temporary test records (roberto.dc.xxxx)
  const delResult = await UserModel.deleteMany({
    username: { $regex: /^roberto\.dc\./ },
  });
  console.log(`Cleaned up ${delResult.deletedCount} temporary test users.`);

  let idCounter = 100;
  const pad = (n: number) => String(n).padStart(2, "0");
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const toDateStr = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  const scheduleDates = [
    { date: toDateStr(yesterday), label: "Regular Past Shift" },
    { date: toDateStr(today), label: "Standard Work Day" },
    { date: toDateStr(tomorrow), label: "Upcoming Scheduled Shift" },
  ];

  console.log(`\nSeeding dummy accounts for departments...`);

  for (const item of DUMMY_ACCOUNTS) {
    idCounter++;
    const idNumber = `QC-2026-${String(idCounter).padStart(4, "0")}`;

    // Find the department
    const dept = await Department.findOne({
      name: { $regex: new RegExp(`^${item.deptName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
    });

    const deptId = dept ? dept._id : null;

    // Check if user already exists
    let user = await UserModel.findOne({
      $or: [{ username: item.username }, { email: item.email }],
    });

    if (user) {
      user.firstName = item.firstName;
      user.lastName = item.lastName;
      user.position = item.position;
      user.department = deptId;
      user.password = hashedPassword;
      user.archived = false;
      await user.save();
      console.log(`Updated user: ${user.username} (${item.deptName})`);
    } else {
      user = await UserModel.create({
        username: item.username,
        email: item.email,
        password: hashedPassword,
        firstName: item.firstName,
        lastName: item.lastName,
        idNumber,
        position: item.position,
        department: deptId,
        shift: item.shift,
        shiftType: "Fixed",
        workInfo: "Full-Time",
        location: dept?.location || "Headquarters",
        salary: 65000,
        salaryType: "monthly",
        archived: false,
      });
      console.log(`Created user: ${user.username} [${idNumber}] (${item.deptName})`);
    }

    // If this account is the Department Head, set head on the department
    if (dept) {
      const updateData: any = {
        $addToSet: { members: user._id },
      };
      if (item.isHead) {
        updateData.$set = { head: user._id };
      }
      await Department.findByIdAndUpdate(dept._id, updateData);
    }

    // Seed 3 sample schedules (Past, Present, Future) for timeline & DTR inspection
    for (const s of scheduleDates) {
      const existingSched = await Schedule.findOne({
        userId: user._id.toString(),
        date: s.date,
      });

      if (!existingSched) {
        await Schedule.create({
          userId: user._id.toString(),
          date: s.date,
          teamName: dept?.name || "Main Team",
          workstationId: "WS-01",
          sessions: [
            {
              label: s.label,
              workCredits: "08:00",
              breakCredits: "01:00",
              breakCount: 1,
              mealCredits: "01:00",
              mealCount: 1,
              scheduledStartTime: "08:00",
              scheduledEndTime: "17:00",
              startMealTime: ["12:00", "13:00"],
              fullSched: [
                { type: "work", start: "08:00", end: "12:00" },
                { type: "meal", start: "12:00", end: "13:00" },
                { type: "work", start: "13:00", end: "17:00" },
              ],
            },
          ],
        });
      }
    }
  }

  console.log(`\n======================================================`);
  console.log(`DUMMY ACCOUNTS SEEDED SUCCESSFULLY!`);
  console.log(`All accounts have the UNIFIED PASSWORD: ${UNIFIED_PASSWORD}`);
  console.log(`======================================================\n`);

  await mongoose.disconnect();
}

seedDummyEmployees().catch(console.error);
