export interface Doctor {
  name: string;
  initials: string;
  image: string;
  title: string;
  credentials: string[];
  experience: string;
  specialties: string[];
  bio: string;
}

export const doctors: Doctor[] = [
  {
    name: "Dr. Ahmad",
    initials: "DA",
    image: "/images/doctors/dr-ahmad.webp",
    title: "Medical Director",
    credentials: ["GMC Registered", "MBBS"],
    experience: "Medical Director at Harley Street Wellness",
    specialties: ["Joint pain assessment", "Regenerative medicine oversight", "Injection therapy procedures"],
    bio: "As Medical Director of Harley Street Wellness, Dr. Ahmad oversees all clinical operations and treatment protocols. With extensive experience in musculoskeletal medicine, he leads the team in delivering evidence-based, non-surgical joint treatments. He is passionate about helping patients explore alternatives to surgery and ensuring every treatment plan is grounded in the latest published research.",
  },
  {
    name: "Dr. Humaira Faisal",
    initials: "HF",
    image: "/images/doctors/dr-humaira.webp",
    title: "Wellness Physician",
    credentials: ["GMC Registered", "MBBS"],
    experience: "Specialist in patient-centred joint care",
    specialties: ["Patient assessment", "Non-surgical joint treatments", "Chronic pain management"],
    bio: "Dr. Humaira Faisal brings a patient-centred approach to joint health, combining thorough clinical assessment with compassionate care. She specialises in evaluating complex joint conditions and developing personalised treatment plans that prioritise quality of life. Her patients value her ability to explain medical options clearly and help them make confident, informed decisions.",
  },
  {
    name: "Dr. Ayda Soltanzadeh",
    initials: "AS",
    image: "/images/doctors/dr-ayda.webp",
    title: "Wellness Consultant",
    credentials: ["GMC Registered", "MD"],
    experience: "Specialist in musculoskeletal wellness",
    specialties: ["Patient consultation", "Treatment planning", "Injection therapy"],
    bio: "Dr. Ayda Soltanzadeh specialises in musculoskeletal wellness and non-surgical intervention planning. With a meticulous approach to diagnostics and treatment design, she ensures every patient receives a tailored care pathway. She is known for her thorough consultations and her commitment to staying at the forefront of evidence-based joint treatments.",
  },
  {
    name: "Dr. Mazhar Khan",
    initials: "MK",
    image: "/images/doctors/dr-mazhar.jpg",
    title: "Senior Wellness Consultant",
    credentials: ["GMC Registered", "MBBS", "FRCS"],
    experience: "23 years of clinical experience",
    specialties: ["Musculoskeletal assessment", "Injection therapy", "Sports injuries"],
    bio: "With over 23 years of clinical experience, Dr. Mazhar Khan is one of the most experienced practitioners at Harley Street Wellness. His extensive background in musculoskeletal medicine and injection therapy means patients benefit from a wealth of knowledge across a wide range of joint conditions. He has a particular interest in sports-related injuries and age-related joint degeneration.",
  },
];
