import db from "../config/db.js";
import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";


// =====================================================
// 🔥 COMMON FUNCTION TO ADD IMAGE SAFELY
// =====================================================
const addImageSafe = (workbook, worksheet, imagePath, rowIndex, colIndex) => {
  try {
    if (!imagePath) return;

    if (fs.existsSync(imagePath)) {

      const extension = path.extname(imagePath).replace(".", "").toLowerCase();

      // Allow only supported formats
      if (!["jpg", "jpeg", "png"].includes(extension)) return;

      const imageId = workbook.addImage({
        buffer: fs.readFileSync(imagePath),
        extension: extension
      });

      worksheet.addImage(imageId, {
        tl: { col: colIndex, row: rowIndex - 1 },
        ext: { width: 80, height: 80 }
      });
    }

  } catch (error) {
    console.log("Image Insert Error:", error.message);
  }
};



// =====================================================
// ✅ GST EXPORT WITH ALL IMAGES
// =====================================================
export const exportGST = async (req, res) => {

  db.query("SELECT * FROM gst_registration ORDER BY created_at DESC", async (err, results) => {
    if (err) return res.status(500).json(err);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("GST Registration");

   worksheet.columns = [
  { header: "ID", key: "id", width: 8 },
  { header: "Full Name", key: "full_name", width: 20 },
  { header: "Email", key: "email", width: 25 },
  { header: "Mobile", key: "mobile", width: 15 },
  { header: "PAN Number", key: "pan_number", width: 15 },
  { header: "Aadhaar Number", key: "aadhaar_number", width: 20 },

  { header: "PAN Photo", key: "pan_photo", width: 18 },
  { header: "Aadhaar Photo", key: "aadhaar_photo", width: 18 },
  { header: "Proprietor Photo", key: "proprietor_photo", width: 20 },
  { header: "Business Address Proof", key: "business_address_proof", width: 25 },
  { header: "Shop Act License", key: "shop_act_license", width: 20 },
  { header: "Udyam Certificate", key: "udyam_certificate", width: 20 },
  { header: "Shop Photo", key: "shop_photo", width: 18 },
  { header: "Bank Proof", key: "bank_proof", width: 18 }
];

    results.forEach((row, index) => {

      const rowIndex = index + 2;

      worksheet.addRow({
        id: row.id,
        full_name: row.full_name,
        email: row.email,
        mobile: row.mobile,
        pan_number: row.pan_number,
        aadhaar_number: row.aadhaar_number
      });

      worksheet.getRow(rowIndex).height = 90;

      addImageSafe(workbook, worksheet, row.pan_photo, rowIndex, 6);
      addImageSafe(workbook, worksheet, row.aadhaar_photo, rowIndex, 7);
      addImageSafe(workbook, worksheet, row.proprietor_photo, rowIndex, 8);
      addImageSafe(workbook, worksheet, row.business_address_proof, rowIndex, 9);
      addImageSafe(workbook, worksheet, row.shop_act_license, rowIndex, 10);
      addImageSafe(workbook, worksheet, row.udyam_certificate, rowIndex, 11);
      addImageSafe(workbook, worksheet, row.shop_photo, rowIndex, 12);
      addImageSafe(workbook, worksheet, row.bank_proof, rowIndex, 13);

    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=gst_with_images.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  });
};



// =====================================================
// ✅ INCOME TAX EXPORT WITH IMAGES
// =====================================================
export const exportIncomeTax = async (req, res) => {

  db.query("SELECT * FROM income_tax_registration ORDER BY created_at DESC", async (err, results) => {
    if (err) return res.status(500).json(err);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Income Tax Registration");

    worksheet.columns = [
      { header: "ID", key: "id", width: 8 },
      { header: "Full Name", key: "full_name", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "Mobile", key: "mobile", width: 15 },
      { header: "PAN Number", key: "pan_number", width: 15 },
      { header: "Aadhaar Number", key: "aadhaar_number", width: 20 },

      { header: "Salary Income", key: "salary_income", width: 18 },
      { header: "House Property Income", key: "house_property_income", width: 22 },
      { header: "Family Pension Income", key: "family_pension_income", width: 22 },
      { header: "Agricultural Income", key: "agricultural_income", width: 20 },
      { header: "Capital Gain 112A", key: "capital_gain_112a", width: 18 },

      { header: "Interest Savings", key: "interest_savings", width: 18 },
      { header: "Interest Deposits", key: "interest_deposits", width: 18 },
      { header: "Interest Refund", key: "interest_refund", width: 18 },
      { header: "Interest Enhanced Comp", key: "interest_enhanced_comp", width: 22 },
      { header: "Other Interest Income", key: "other_interest_income", width: 22 },

      { header: "PAN Photo", key: "pan_photo", width: 18 },
      { header: "Aadhaar Photo", key: "aadhaar_photo", width: 18 }
    ];

    results.forEach((row, index) => {

      const rowIndex = index + 2;

      worksheet.addRow({
        ...row
      });

      worksheet.getRow(rowIndex).height = 90;

      addImageSafe(workbook, worksheet, row.pan_photo, rowIndex, 16);
      addImageSafe(workbook, worksheet, row.aadhaar_photo, rowIndex, 17);
    });

    worksheet.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=income_tax_with_images.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  });
};



// =====================================================
// ✅ UDYAM EXPORT WITH IMAGES
// =====================================================
export const exportUdyam = async (req, res) => {

  db.query("SELECT * FROM udyam_registration ORDER BY created_at DESC", async (err, results) => {
    if (err) return res.status(500).json(err);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Udyam Registration");

    worksheet.columns = [
      { header: "ID", key: "id", width: 8 },
      { header: "Full Name", key: "full_name", width: 20 },
      { header: "Email", key: "email", width: 25 },
      { header: "Mobile", key: "mobile", width: 15 },
      { header: "PAN Number", key: "pan_number", width: 15 },
      { header: "Aadhaar Number", key: "aadhaar_number", width: 20 },

      { header: "PAN Photo", key: "pan_photo", width: 18 },
      { header: "Aadhaar Photo", key: "aadhaar_photo", width: 18 },
      { header: "Proprietor Photo", key: "proprietor_photo", width: 20 },
      { header: "Business Address Proof", key: "business_address_proof", width: 25 },
      { header: "Shop Act License", key: "shop_act_license", width: 20 },
      { header: "Bank Proof", key: "bank_proof", width: 20 }
    ];

    results.forEach((row, index) => {

      const rowIndex = index + 2;

      worksheet.addRow({
        ...row
      });

      worksheet.getRow(rowIndex).height = 90;

      addImageSafe(workbook, worksheet, row.pan_photo, rowIndex, 6);
      addImageSafe(workbook, worksheet, row.aadhaar_photo, rowIndex, 7);
      addImageSafe(workbook, worksheet, row.proprietor_photo, rowIndex, 8);
      addImageSafe(workbook, worksheet, row.business_address_proof, rowIndex, 9);
      addImageSafe(workbook, worksheet, row.shop_act_license, rowIndex, 10);
      addImageSafe(workbook, worksheet, row.bank_proof, rowIndex, 11);
    });

    worksheet.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=udyam_with_images.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  });
};