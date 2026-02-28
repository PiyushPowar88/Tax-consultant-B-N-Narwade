// import db from "../config/db.js";


// // ===============================
// // ✅ INCOME TAX REGISTRATION
// // ===============================
// export const saveIncomeTaxRegistration = (req, res) => {
//   const {
//     full_name,
//     email,
//     mobile,
//     aadhaar_number,
//     pan_number,
//     salary_income,
//     house_property_income,
//     family_pension_income,
//     agricultural_income,
//     capital_gain_112a,
//     interest_savings,
//     interest_deposits,
//     interest_refund,
//     interest_enhanced_comp,
//     other_interest_income
//   } = req.body;

//   // 🔥 Use file path instead of buffer
//   const aadhaar_photo = req.files["aadhaar_photo"]?.[0]?.path || null;
//   const pan_photo = req.files["pan_photo"]?.[0]?.path || null;

//   const sql = `
//     INSERT INTO income_tax_registration
//     (full_name,email,mobile,aadhaar_number,aadhaar_photo,
//      pan_number,pan_photo,salary_income,house_property_income,
//      family_pension_income,agricultural_income,capital_gain_112a,
//      interest_savings,interest_deposits,interest_refund,
//      interest_enhanced_comp,other_interest_income)
//     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
//   `;

//   db.query(sql, [
//     full_name,
//     email,
//     mobile,
//     aadhaar_number,
//     aadhaar_photo,
//     pan_number,
//     pan_photo,
//     salary_income || 0,
//     house_property_income || 0,
//     family_pension_income || 0,
//     agricultural_income || 0,
//     capital_gain_112a || 0,
//     interest_savings || 0,
//     interest_deposits || 0,
//     interest_refund || 0,
//     interest_enhanced_comp || 0,
//     other_interest_income || 0
//   ], (err) => {
//     if (err) {
//       console.log("INCOME TAX ERROR:", err);
//       return res.status(500).json(err);
//     }
//     res.json({ message: "Income Tax Registration Saved Successfully" });
//   });
// };



// // ===============================
// // ✅ GST REGISTRATION
// // ===============================
// export const saveGSTRegistration = (req, res) => {
//   const {
//     full_name,
//     email,
//     mobile,
//     pan_number,
//     aadhaar_number
//   } = req.body;

//   const pan_photo = req.files["pan_photo"]?.[0]?.path || null;
//   const aadhaar_photo = req.files["aadhaar_photo"]?.[0]?.path || null;
//   const proprietor_photo = req.files["proprietor_photo"]?.[0]?.path || null;
//   const business_address_proof = req.files["business_address_proof"]?.[0]?.path || null;
//   const shop_act_license = req.files["shop_act_license"]?.[0]?.path || null;
//   const udyam_certificate = req.files["udyam_certificate"]?.[0]?.path || null;
//   const shop_photo = req.files["shop_photo"]?.[0]?.path || null;
//   const bank_proof = req.files["bank_proof"]?.[0]?.path || null;

//   const sql = `
//     INSERT INTO gst_registration
//     (full_name,email,mobile,pan_number,pan_photo,
//      aadhaar_number,aadhaar_photo,
//      proprietor_photo,business_address_proof,
//      shop_act_license,udyam_certificate,
//      shop_photo,bank_proof)
//     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
//   `;

//   db.query(sql, [
//     full_name,
//     email,
//     mobile,
//     pan_number,
//     pan_photo,
//     aadhaar_number,
//     aadhaar_photo,
//     proprietor_photo,
//     business_address_proof,
//     shop_act_license,
//     udyam_certificate,
//     shop_photo,
//     bank_proof
//   ], (err) => {
//     if (err) {
//       console.log("GST ERROR:", err);
//       return res.status(500).json(err);
//     }
//     res.json({ message: "GST Registration Saved Successfully" });
//   });
// };



// // ===============================
// // ✅ UDYAM REGISTRATION
// // ===============================
// export const saveUdyamRegistration = (req, res) => {
//   const {
//     full_name,
//     email,
//     mobile,
//     pan_number,
//     aadhaar_number
//   } = req.body;

//   const pan_photo = req.files["pan_photo"]?.[0]?.path || null;
//   const aadhaar_photo = req.files["aadhaar_photo"]?.[0]?.path || null;
//   const proprietor_photo = req.files["proprietor_photo"]?.[0]?.path || null;
//   const business_address_proof = req.files["business_address_proof"]?.[0]?.path || null;
//   const shop_act_license = req.files["shop_act_license"]?.[0]?.path || null;
//   const bank_proof = req.files["bank_proof"]?.[0]?.path || null;

//   const sql = `
//     INSERT INTO udyam_registration
//     (full_name,email,mobile,pan_number,pan_photo,
//      aadhaar_number,aadhaar_photo,
//      proprietor_photo,business_address_proof,
//      shop_act_license,bank_proof)
//     VALUES (?,?,?,?,?,?,?,?,?,?,?)
//   `;

//   db.query(sql, [
//     full_name,
//     email,
//     mobile,
//     pan_number,
//     pan_photo,
//     aadhaar_number,
//     aadhaar_photo,
//     proprietor_photo,
//     business_address_proof,
//     shop_act_license,
//     bank_proof
//   ], (err) => {
//     if (err) {
//       console.log("UDYAM ERROR:", err);
//       return res.status(500).json(err);
//     }
//     res.json({ message: "Udyam Registration Saved Successfully" });
//   });
// };













import db from "../config/db.js";


// ===============================
// ✅ INCOME TAX REGISTRATION
// ===============================
export const saveIncomeTaxRegistration = (req, res) => {
  const {
    full_name,
    email,
    mobile,
    aadhaar_number,
    pan_number,
    salary_income,
    house_property_income,
    family_pension_income,
    agricultural_income,
    capital_gain_112a,
    interest_savings,
    interest_deposits,
    interest_refund,
    interest_enhanced_comp,
    other_interest_income
  } = req.body;

  const aadhaar_photo       = req.files["aadhaar_photo"]?.[0]?.path || null;
  const aadhaar_back_photo  = req.files["aadhaar_back_photo"]?.[0]?.path || null; // 🆕 NEW
  const pan_photo           = req.files["pan_photo"]?.[0]?.path || null;

  const sql = `
    INSERT INTO income_tax_registration
    (full_name, email, mobile, aadhaar_number, aadhaar_photo, aadhaar_back_photo,
     pan_number, pan_photo, salary_income, house_property_income,
     family_pension_income, agricultural_income, capital_gain_112a,
     interest_savings, interest_deposits, interest_refund,
     interest_enhanced_comp, other_interest_income)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(sql, [
    full_name, email, mobile,
    aadhaar_number, aadhaar_photo, aadhaar_back_photo,
    pan_number, pan_photo,
    salary_income || 0, house_property_income || 0,
    family_pension_income || 0, agricultural_income || 0, capital_gain_112a || 0,
    interest_savings || 0, interest_deposits || 0, interest_refund || 0,
    interest_enhanced_comp || 0, other_interest_income || 0
  ], (err) => {
    if (err) { console.log("INCOME TAX ERROR:", err); return res.status(500).json(err); }
    res.json({ message: "Income Tax Registration Saved Successfully" });
  });
};


// ===============================
// ✅ GST REGISTRATION
// ===============================
export const saveGSTRegistration = (req, res) => {
  const { full_name, email, mobile, pan_number, aadhaar_number } = req.body;

  const pan_photo               = req.files["pan_photo"]?.[0]?.path || null;
  const aadhaar_photo           = req.files["aadhaar_photo"]?.[0]?.path || null;
  const proprietor_photo        = req.files["proprietor_photo"]?.[0]?.path || null;
  const business_address_proof  = req.files["business_address_proof"]?.[0]?.path || null;
  const shop_act_license        = req.files["shop_act_license"]?.[0]?.path || null;
  const udyam_certificate       = req.files["udyam_certificate"]?.[0]?.path || null;
  const shop_photo              = req.files["shop_photo"]?.[0]?.path || null;
  const bank_proof              = req.files["bank_proof"]?.[0]?.path || null;
  const signature               = req.files["signature"]?.[0]?.path || null; // 🆕 NEW

  const sql = `
    INSERT INTO gst_registration
    (full_name, email, mobile, pan_number, pan_photo,
     aadhaar_number, aadhaar_photo,
     proprietor_photo, business_address_proof,
     shop_act_license, udyam_certificate,
     shop_photo, bank_proof, signature)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(sql, [
    full_name, email, mobile, pan_number, pan_photo,
    aadhaar_number, aadhaar_photo,
    proprietor_photo, business_address_proof,
    shop_act_license, udyam_certificate,
    shop_photo, bank_proof, signature
  ], (err) => {
    if (err) { console.log("GST ERROR:", err); return res.status(500).json(err); }
    res.json({ message: "GST Registration Saved Successfully" });
  });
};


// ===============================
// ✅ UDYAM REGISTRATION
// ===============================
export const saveUdyamRegistration = (req, res) => {
  const { full_name, email, mobile, pan_number, aadhaar_number } = req.body;

  const pan_photo               = req.files["pan_photo"]?.[0]?.path || null;
  const aadhaar_photo           = req.files["aadhaar_photo"]?.[0]?.path || null;
  const proprietor_photo        = req.files["proprietor_photo"]?.[0]?.path || null;
  const business_address_proof  = req.files["business_address_proof"]?.[0]?.path || null;
  const shop_act_license        = req.files["shop_act_license"]?.[0]?.path || null;
  const bank_proof              = req.files["bank_proof"]?.[0]?.path || null;
  const signature               = req.files["signature"]?.[0]?.path || null; // 🆕 NEW

  const sql = `
    INSERT INTO udyam_registration
    (full_name, email, mobile, pan_number, pan_photo,
     aadhaar_number, aadhaar_photo,
     proprietor_photo, business_address_proof,
     shop_act_license, bank_proof, signature)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(sql, [
    full_name, email, mobile, pan_number, pan_photo,
    aadhaar_number, aadhaar_photo,
    proprietor_photo, business_address_proof,
    shop_act_license, bank_proof, signature
  ], (err) => {
    if (err) { console.log("UDYAM ERROR:", err); return res.status(500).json(err); }
    res.json({ message: "Udyam Registration Saved Successfully" });
  });
};