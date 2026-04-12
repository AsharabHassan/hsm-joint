export interface Doctor {
  name: string;
  initials: string;
  title: string;
  credentials: string[];
  experience: string;
  specialties: string[];
}

export const doctors: Doctor[] = [
  {
    name: "Dr. Ahmad",
    initials: "DA",
    title: "Medical Director",
    credentials: ["GMC Registered"],
    experience: "Medical Director at Harley Street Wellness",
    specialties: ["Joint pain assessment", "Regenerative medicine oversight"],
  },
  {
    name: "Dr. Humaira Faisal",
    initials: "HF",
    title: "Wellness Physician",
    credentials: ["GMC Registered"],
    experience: "Wellness Physician",
    specialties: ["Patient assessment", "Non-surgical joint treatments"],
  },
  {
    name: "Dr. Ayda Soltanzadeh",
    initials: "AS",
    title: "Wellness Consultant",
    credentials: ["GMC Registered"],
    experience: "Wellness Consultant",
    specialties: ["Patient consultation", "Treatment planning"],
  },
  {
    name: "Dr. Mazhar Khan",
    initials: "MK",
    title: "Wellness Consultant",
    credentials: ["GMC Registered"],
    experience: "23 years clinical experience",
    specialties: ["Musculoskeletal assessment", "Injection therapy"],
  },
];
