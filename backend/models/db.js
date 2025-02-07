const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// User Schema (Organisation, Participant, Provider)
const UserSchema = new mongoose.Schema({
    First_Name: { type: String, required: true },
    Last_Name: { type: String, required: true },
    Username: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    DOB: { type: Date, required: true },
    Role: { type: String, enum: ["organisation", "participant", "serviceprovider"], required: true }
});

// Hash password
UserSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});

const OrganisationSchema = new mongoose.Schema({
    Org_ID: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    Contact: { type: String },
    Org_Description: { type: String },
    Org_Address: {
        Street: { type: String },
        City: { type: String },
        State: { type: String },
    }
});


const ProgramSchema = new mongoose.Schema({
    Program_ID: { type: Number, required: true, unique: true },
    Program_Name: { type: String, required: true },
    Program_Description: { type: String },
    Program_Target: { type: String },
    Org_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Organisation", required: true }
});


const ParticipantSchema = new mongoose.Schema({
    Participant_ID: { type: Number, required: true, unique: true },
    Participant_Name: { type: String, required: true },
    Participant_DOB: { type: Date },
    Participant_Gender: { type: String },
    Participation_Date: { type: Date },
    Exit_Date: { type: Date }
});


const ServiceSchema = new mongoose.Schema({
    Service_ID: { type: Number, required: true, unique: true },
    Service_Name: { type: String, required: true },
    Service_Description: { type: String },
    Service_Start_Date: { type: Date },
    Service_Provided: { type: String }
});


const ProviderSchema = new mongoose.Schema({
    Provider_ID: { type: Number, required: true, unique: true },
    Provider_Name: { type: String, required: true },
    Provider_Address: {
        Street: { type: String },
        City: { type: String },
        State: { type: String },
    }
});


const PaymentSchema = new mongoose.Schema({
    Payment_ID: { type: Number, required: true, unique: true },
    Payment_Type: { type: String, required: true },
    Payment_Date: { type: Date, required: true },
    Paid_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }
});


const EvaluationSchema = new mongoose.Schema({
    Evaluation_ID: { type: Number, required: true, unique: true },
    Evaluation_Method: { type: String, required: true },
    Date: { type: Date, required: true },
    Feedback: { type: String },
    Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }
});


const ParticipantServiceSchema = new mongoose.Schema({
    Participant_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true },
    Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    ServicesReceived: { type: String }
});


const ServiceProviderSchema = new mongoose.Schema({
    Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    Provider_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Provider", required: true },
    ServiceDelivery_Date: { type: Date }
});


const User = mongoose.model("User", UserSchema);
const Organisation = mongoose.model("Organisation", OrganisationSchema);
const Program = mongoose.model("Program", ProgramSchema);
const Participant = mongoose.model("Participant", ParticipantSchema);
const Service = mongoose.model("Service", ServiceSchema);
const Provider = mongoose.model("Provider", ProviderSchema);
const Payment = mongoose.model("Payment", PaymentSchema);
const Evaluation = mongoose.model("Evaluation", EvaluationSchema);
const ParticipantService = mongoose.model("ParticipantService", ParticipantServiceSchema);
const ServiceProvider = mongoose.model("ServiceProvider", ServiceProviderSchema);


module.exports = {
    User,
    Organisation,
    Program,
    Participant,
    Service,
    Provider,
    Payment,
    Evaluation,
    ParticipantService,
    ServiceProvider
};
