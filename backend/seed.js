require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const { Organisation, Program } = require("./models/db"); // Import models

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing! Check your .env file.");
    process.exit(1);
}

// ✅ **Organisation Data**
const organisations = [
  { Name: "All Stars Project of New Jersey", Org_Description: "Expanding youth program.", Contact: "123-456-7890", Org_Address: { Street: "123 Main St", City: "Newark", State: "NJ" } },
  { Name: "Be The Changemakers, Inc.", Org_Description: "Youth mentorship and social justice.", Contact: "987-654-3210", Org_Address: { Street: "456 Elm St", City: "Newark", State: "NJ" } },
  { Name: "Butterfly Dreamz, Inc.", Org_Description: "Expanding Cocoon Club for youth.", Contact: "555-123-4567", Org_Address: { Street: "789 Oak St", City: "Newark", State: "NJ" } },
  { Name: "Complex Vision Newark, LLC.", Org_Description: "Youth violence prevention engagement and support in the South Ward.", Contact: "333-222-1111", Org_Address: { Street: "111 Cedar St", City: "Newark", State: "NJ" } },
  { Name: "Gateway U | Trion New College Network", Org_Description: "Providing personalized student support services.", Contact: "777-888-9999", Org_Address: { Street: "222 Pine St", City: "Newark", State: "NJ" } },
  { Name: "Hear My Cries", Org_Description: "Youth development and mental health services.", Contact: "444-555-6666", Org_Address: { Street: "333 Oak St", City: "Newark", State: "NJ" } }
];

// ✅ **Program Data** (Will reference `Org_ID` after organisations are inserted)
const programs = [
  { Program_Name: "Youth Program Expansion", Program_Description: "Community outreach program expansion.", Org_Name: "All Stars Project of New Jersey" },
  { Program_Name: "Mentorship Program", Program_Description: "Year-round mentorship for high-risk teens.", Org_Name: "Be The Changemakers, Inc." },
  { Program_Name: "Social Justice Media", Program_Description: "Platform for storytelling through a social justice lens.", Org_Name: "Be The Changemakers, Inc." },
  { Program_Name: "Cocoon Club Expansion", Program_Description: "Academic and career support for students.", Org_Name: "Butterfly Dreamz, Inc." },
  { Program_Name: "Youth Violence Prevention", Program_Description: "Engagement and support services for youth.", Org_Name: "Complex Vision Newark, LLC." },
  { Program_Name: "Student Support Services", Program_Description: "Academic and career counseling, FAFSA support.", Org_Name: "Gateway U | Trion New College Network" },
  { Program_Name: "Summer Youth Development", Program_Description: "After-school wrap-around programs.", Org_Name: "Hear My Cries" },
  { Program_Name: "Grief Counseling", Program_Description: "Mental health services for at-risk youth.", Org_Name: "Hear My Cries" },
  { Program_Name: "Violence Interrupters", Program_Description: "Community-based outreach to reduce violence.", Org_Name: "Hear My Cries" }
];

async function seedDatabase() {
  try {
    console.log("🚀 Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Connected to MongoDB");

    // ✅ Clear Previous Data
    console.log("🗑️ Clearing previous data...");
    await Organisation.deleteMany();
    await Program.deleteMany();

    // ✅ Insert Organisations
    console.log("📦 Inserting organisations...");
    const insertedOrganisations = await Organisation.insertMany(organisations);
    console.log("🎉 Organisations inserted successfully!");

    // ✅ Map Organisation Names to Their MongoDB ObjectIds
    const orgMap = {};
    insertedOrganisations.forEach(org => {
        orgMap[org.Name] = org._id;
    });

    // ✅ Insert Programs with the Correct `Org_ID`
    console.log("📦 Inserting programs...");
    const formattedPrograms = programs.map(program => ({
        Program_Name: program.Program_Name,
        Program_Description: program.Program_Description,
        Org_ID: orgMap[program.Org_Name] // Assign the correct Organisation ID
    }));
    await Program.insertMany(formattedPrograms);
    console.log("🎉 Programs inserted successfully!");

    // ✅ Disconnect from Database
    mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

// Run the Seeding Script
seedDatabase();
