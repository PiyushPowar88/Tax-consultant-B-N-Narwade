import db from "./config/db.js";
import fs from "fs";

fs.mkdirSync("uploads/services", { recursive: true });

db.query("SELECT id, image FROM services WHERE image IS NOT NULL", (err, rows) => {
  if (err) { console.log("❌ Query error:", err); process.exit(1); }
  if (rows.length === 0) { console.log("No images to migrate"); process.exit(0); }

  console.log(`Found ${rows.length} images to migrate...`);

  rows.forEach((row) => {
    const filename = `service_${row.id}.png`;
    const filepath = `uploads/services/${filename}`;
    fs.writeFileSync(filepath, row.image);

    db.query(
      "UPDATE services SET image_url=? WHERE id=?",
      [`/uploads/services/${filename}`, row.id],
      (err) => {
        if (err) console.log(`❌ Failed service ${row.id}:`, err);
        else console.log(`✅ Migrated service ${row.id}`);
      }
    );
  });
});