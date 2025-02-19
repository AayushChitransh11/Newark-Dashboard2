const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const UserSchema = new mongoose.Schema({
    First_Name: { type: String, required: true },
    Last_Name: { type: String, required: true },
    Username: { type: String, required: true, unique: true },
    Email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    Password: { type: String, required: true },
    DOB: { type: Date, required: true },
    Role: { type: String, enum: ["organisation", "participant", "serviceprovider"], required: true }
}, { timestamps: true });


UserSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next();
    this.Password = await bcrypt.hash(this.Password, 10);
    next();
});
UserSchema.index({ Email: 1, Username: 1 });


const OrganisationSchema = new mongoose.Schema({
    Name: { type: String, required: true, unique: true },
    Contact: { type: String },
    Org_Description: { type: String },
    Org_Address: {
        Street: { type: String },
        City: { type: String },
        State: { type: String },
    }
}, { timestamps: true });
OrganisationSchema.index({ Name: "text", "Org_Address.City": 1 });


const ProgramSchema = new mongoose.Schema({
    Program_Name: { type: String, required: true },
    Program_Description: { type: String },
    Program_Target: { type: String },
    Org_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Organisation", required: true }
}, { timestamps: true });
ProgramSchema.index({ Program_Name: "text", Org_ID: 1 });


const ParticipantSchema = new mongoose.Schema({
    Participant_Name: { type: String, required: true },
    Participant_DOB: { type: Date },
    Participant_Gender: { type: String },
    Participation_Date: { type: Date },
    Exit_Date: { type: Date }
}, { timestamps: true });
ParticipantSchema.index({ Participant_Name: 1, Participant_DOB: 1 });

// ✅ **Service Schema**
const ServiceSchema = new mongoose.Schema({
    Service_Name: { type: String, required: true },
    Service_Description: { type: String },
    Service_Start_Date: { type: Date },
    Service_Provided: { type: Boolean, default: false }
}, { timestamps: true });
ServiceSchema.index({ Service_Name: 1 });


const ProviderSchema = new mongoose.Schema({
    Provider_Name: { type: String, required: true },
    Provider_Address: {
        Street: { type: String },
        City: { type: String },
        State: { type: String },
    }
}, { timestamps: true });
ProviderSchema.index({ Provider_Name: 1 });


const PaymentSchema = new mongoose.Schema({
    Payment_Type: { type: String, required: true },
    Payment_Date: { type: Date, required: true },
    Paid_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }
}, { timestamps: true });


const EvaluationSchema = new mongoose.Schema({
    Evaluation_Method: { type: String, required: true },
    Date: { type: Date, required: true },
    Feedback: { type: String },
    Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }
}, { timestamps: true });

// ✅ **Participant Service Schema**
const ParticipantServiceSchema = new mongoose.Schema({
    Participant_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Participant", required: true, index: true },
    Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true, index: true },
    ServicesReceived: { type: String }
}, { timestamps: true });


const ServiceProviderSchema = new mongoose.Schema({
    Service_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true, index: true },
    Provider_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Provider", required: true, index: true },
    ServiceDelivery_Date: { type: Date }
}, { timestamps: true });


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
