export interface DoctorType {
  _id: string;
  fullName: string;
  bmdcRegistrationNumber: string;
  medicalQualification: string;
  specialization: string;
  yearsOfExperience: string;
  professionalPhoneNumber: string;
  currentHospitalAffiliation: string;
  userId: string;
  credentialDocuments: string[];
  createAt: string;
  status: "pending" | "approved" | "rejected";
}
