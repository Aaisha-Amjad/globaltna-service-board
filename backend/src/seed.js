// Seed script — populates the database with realistic sample job requests
// Run it manually with: node src/seed.js
// Safe to run multiple times — clears existing jobs before inserting fresh ones

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const JobRequest = require("./models/JobRequest");

dotenv.config();

const sampleJobs = [
  {
    title: "Fix leaking kitchen tap",
    description:
      "Kitchen tap has been dripping for a week. Needs a washer replacement or full fitting.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "James Docherty",
    contactEmail: "james.docherty@email.com",
    status: "Open",
  },
  {
    title: "Rewire garden shed",
    description:
      "Small garden shed needs a consumer unit and 3 double sockets installed safely.",
    category: "Electrical",
    location: "Edinburgh",
    contactName: "Sarah Munro",
    contactEmail: "sarah.munro@email.com",
    status: "Open",
  },
  {
    title: "Paint living room and hallway",
    description:
      "Two-coat paint job on living room walls and hallway. Customer supplying paint.",
    category: "Painting",
    location: "Manchester",
    contactName: "Priya Nair",
    contactEmail: "priya.nair@email.com",
    status: "In Progress",
  },
  {
    title: "Replace rotten fence panels",
    description:
      "Three fence panels along the back garden are rotten and need full replacement.",
    category: "Joinery",
    location: "Leeds",
    contactName: "Tom Brennan",
    contactEmail: "tom.brennan@email.com",
    status: "Open",
  },
  {
    title: "Boiler making loud banging noise",
    description:
      "Boiler starts banging loudly every morning. Needs a full inspection and service.",
    category: "Plumbing",
    location: "Birmingham",
    contactName: "Fatima Hussain",
    contactEmail: "fatima.hussain@email.com",
    status: "Open",
  },
  {
    title: "Install outdoor security lighting",
    description:
      "Need two motion-sensor security lights fitted at the front and back of the house.",
    category: "Electrical",
    location: "Bristol",
    contactName: "Connor Walsh",
    contactEmail: "connor.walsh@email.com",
    status: "Closed",
  },
  {
    title: "Build fitted wardrobe in master bedroom",
    description:
      "Floor-to-ceiling fitted wardrobe needed. Sliding doors preferred. Space is 2.4m wide.",
    category: "Joinery",
    location: "London",
    contactName: "Amelia Carter",
    contactEmail: "amelia.carter@email.com",
    status: "Open",
  },
  {
    title: "Repaint exterior window frames",
    description:
      "Six wooden window frames on the front of the house need sanding and repainting.",
    category: "Painting",
    location: "Cardiff",
    contactName: "Rhys Thomas",
    contactEmail: "rhys.thomas@email.com",
    status: "In Progress",
  },
  {
    title: "Unblock bathroom drain",
    description:
      "Shower and sink draining very slowly. Likely a hair blockage deep in the pipe.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "Nina Patel",
    contactEmail: "nina.patel@email.com",
    status: "Open",
  },
  {
    title: "Install EV charging point in garage",
    description:
      "Need a 7kW home EV charger installed in the garage. Car is a Tesla Model 3.",
    category: "Electrical",
    location: "Edinburgh",
    contactName: "David McAllister",
    contactEmail: "david.mcallister@email.com",
    status: "Open",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Wipe existing jobs so we start fresh every time
    await JobRequest.deleteMany({});
    console.log("Existing jobs cleared");

    // Insert all sample jobs in one operation
    await JobRequest.insertMany(sampleJobs);
    console.log(`${sampleJobs.length} jobs seeded successfully`);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedDB();
