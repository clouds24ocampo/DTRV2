import { appConfig } from "src/config/app.config";
// user-auth.controller.ts
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import UserModel from "../../../models/workforce/user.model";
import Department from "../../../models/global/department.model";
import { resolveEmployeeIdNumber } from "../../../utils/global/id-number.utils";

interface AuthenticatedRequest extends Request {
  user?: { id: string; position: string };
}

export const registerEmployee = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      username,
      email,
      password,
      lastName,
      firstName,
      middleName,
      idNumber,
      position,
      workInfo,
      location,
      salaryType,
      salary,
      departmentId,
      department,
    } = req.body;

    const requiredFields = [
      username,
      email,
      lastName,
      firstName,
      position,
    ];
    // Note: middleName, workInfo, location, and salary are optional fields.
    // idNumber is optional: blank/omitted → auto-generated (QC-YYYY-NNNN).
    // password defaults to "Welcome@123" if not provided by HR form.
    // salaryType defaults to "monthly" if not provided.
    if (
      requiredFields.some(
        (field) =>
          !field ||
          (typeof field === "string" && field.trim() === "")
      )
    ) {
      res
        .status(400)
        .json({ message: "All required fields (Username, Email, First Name, Last Name, Position) must be provided." });
      return;
    }

    const cleanUsername = String(username).trim().toLowerCase();
    const cleanEmail = String(email).trim().toLowerCase();
    const finalPassword =
      password && typeof password === "string" && password.trim() !== ""
        ? password.trim()
        : "Welcome@123";
    const finalSalaryType =
      salaryType && typeof salaryType === "string" && salaryType.trim() !== ""
        ? salaryType.trim()
        : "monthly";

    const existingUsername = await UserModel.findOne({ username: cleanUsername });
    if (existingUsername) {
      res
        .status(409)
        .json({ message: `Username "${username}" is already taken. Please choose another.` });
      return;
    }

    const existingUser = await UserModel.findOne({ email: cleanEmail });
    if (existingUser) {
      res
        .status(409)
        .json({ message: `Email "${email}" is already registered.` });
      return;
    }

    let finalIdNumber: string;
    try {
      finalIdNumber = await resolveEmployeeIdNumber(idNumber);
    } catch (err: unknown) {
      const status =
        typeof err === "object" && err !== null && "status" in err
          ? Number((err as { status: unknown }).status) || 400
          : 400;
      res.status(status).json({
        message: err instanceof Error ? err.message : "Invalid ID number.",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(finalPassword, appConfig.auth.bcryptRounds);

    const targetDeptId = (departmentId || department)?.toString()?.trim() || null;
    let validDeptId: any = null;
    if (targetDeptId && targetDeptId !== "null" && targetDeptId !== "undefined") {
      const foundDept = await Department.findById(targetDeptId);
      if (foundDept) {
        validDeptId = foundDept._id;
      }
    }

    const createdUser = await UserModel.create({
      username: cleanUsername,
      email: cleanEmail,
      password: hashedPassword,
      firstName: String(firstName).trim(),
      middleName: middleName ? String(middleName).trim() : "",
      lastName: String(lastName).trim(),
      idNumber: finalIdNumber,
      position: Array.isArray(position) ? position : [position],
      department: validDeptId,
      workInfo: workInfo || "",
      location: location || "",
      salary: Number(salary) || 0,
      salaryType: finalSalaryType,
    });

    if (validDeptId) {
      await Department.findByIdAndUpdate(validDeptId, {
        $addToSet: { members: createdUser._id },
      });
    }

    res.status(201).json({
      message: "Employee registered successfully",
      idNumber: finalIdNumber,
      employee: createdUser,
    });
  } catch (error: any) {
    console.error("Error in registerEmployee:", error);
    if (res.headersSent) return;

    if (error?.code === 11000) {
      const dupField = Object.keys(error.keyPattern || {})[0] || "field";
      res.status(409).json({
        message: `An employee with this ${dupField} already exists.`,
      });
      return;
    }

    if (error?.name === "ValidationError") {
      res.status(400).json({
        message: error.message || "Invalid employee information.",
      });
      return;
    }

    res.status(500).json({
      message: error?.message || "Internal server error",
    });
  }
};
