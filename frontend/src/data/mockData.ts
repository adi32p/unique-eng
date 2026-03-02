// Mock data for development - easy to replace with real API calls

// Services data
export const services = [
  {
    id: "environmental-clearance",
    title: "Environmental Clearance",
    shortDescription: "Comprehensive support for obtaining EC from MoEF&CC",
    description: "Navigate the complex process of obtaining Environmental Clearance from the Ministry of Environment, Forest & Climate Change. Our expert team ensures smooth documentation and compliance.",
    icon: "FileCheck",
    features: [
      "EIA Report Preparation",
      "Public Hearing Support",
      "EC Application Filing",
      "Compliance Monitoring",
    ],
  },
  {
    id: "pcb-licenses",
    title: "PCB Licenses",
    shortDescription: "Consent to Establish & Consent to Operate",
    description: "Seamless processing of Pollution Control Board licenses including CTE, CTO, and HWM authorizations across all states of India.",
    icon: "Shield",
    features: [
      "Consent to Establish (CTE)",
      "Consent to Operate (CTO)",
      "HWM Authorization",
      "Renewal Services",
    ],
  },
  {
    id: "epc",
    title: "EPC Services",
    shortDescription: "End-to-end Engineering, Procurement & Construction",
    description: "Complete turnkey solutions for environmental infrastructure projects including ETPs, STPs, and waste management facilities.",
    icon: "Building2",
    features: [
      "ETP Design & Construction",
      "STP Implementation",
      "Air Pollution Control",
      "Waste Management Systems",
    ],
  },
  {
    id: "pmc",
    title: "PMC Services",
    shortDescription: "Project Management Consultancy",
    description: "Expert project management for environmental infrastructure ensuring timely delivery, quality control, and cost optimization.",
    icon: "ClipboardList",
    features: [
      "Project Planning",
      "Vendor Management",
      "Quality Assurance",
      "Timeline Monitoring",
    ],
  },
  {
    id: "compliance",
    title: "Compliance Management",
    shortDescription: "Ongoing regulatory compliance support",
    description: "Stay compliant with evolving environmental regulations through our comprehensive monitoring and reporting services.",
    icon: "CheckCircle",
    features: [
      "Environmental Audits",
      "Compliance Reporting",
      "Regulatory Updates",
      "Risk Assessment",
    ],
  },
  {
    id: "design-engineering",
    title: "Design Engineering",
    shortDescription: "Custom environmental engineering solutions",
    description: "Innovative design solutions for environmental systems tailored to your specific requirements and site conditions.",
    icon: "Pencil",
    features: [
      "Process Design",
      "Detailed Engineering",
      "P&ID Development",
      "Equipment Selection",
    ],
  },
];

// Sectors data
export const sectors = [
  {
    id: "industrial",
    title: "Industrial",
    projectCount: 35,
    description: "Manufacturing, chemical, pharmaceutical, and heavy industries",
    highlights: ["Large Scale ETPs", "Air Pollution Control", "Hazardous Waste Management"],
    image: "/industrial.jpeg",
  },
  {
    id: "commercial",
    title: "Commercial",
    projectCount: 10,
    description: "Office complexes, shopping malls, and hospitality sector",
    highlights: ["STP Solutions", "Rainwater Harvesting", "Solid Waste Management"],
    image: "/placeholder.svg",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    projectCount: 15,
    description: "Highways, airports, ports, and urban development",
    highlights: ["Environmental Impact Assessment", "Green Building Compliance", "NHAI Projects"],
    image: "/placeholder.svg",
  },
  {
    id: "government",
    title: "Government Projects",
    projectCount: 45,
    description: "Municipal corporations and government undertakings",
    highlights: ["AMRUT Projects", "Smart City Solutions", "Industrial Park Development"],
    image: "/placeholder.svg",
  },
];

// Team data
export const teamMembers = [
  {
    id: 1,
    name: "Dr. Shreyash Shelke",
    role: "Founder & CEO",
    bio: "2+ years in environmental engineering with expertise in regulatory compliance.",
    image: "/ShreyashShelke.jpeg",
  },
  {
    id: 2,
    name: "Aditya Pawar",
    role: "Technical Expert",
    bio: "Expert in EIA studies and environmental management systems.",
    image: "/MyPhoto1.jpg",
  },
];

// Statistics
export const statistics = [
  { label: "Projects Completed", value: 100, suffix: "+" },
  { label: "States Covered", value: 28, suffix: "" },
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Happy Clients", value: 100, suffix: "+" },
];

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: "Vikram Singh",
    company: "Greentech Industries",
    sector: "Industrial",
    rating: 5,
    text: "Unique.EP helped us obtain environmental clearance in record time. Their expertise and dedication are unmatched.",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Anita Desai",
    company: "Metro City Mall",
    sector: "Commercial",
    rating: 5,
    text: "Professional team with excellent knowledge of compliance requirements. Highly recommended for any project.",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    company: "National Highways Authority",
    sector: "Infrastructure",
    rating: 5,
    text: "Their EIA reports are thorough and always meet regulatory standards. A trusted partner for our projects.",
    image: "/placeholder.svg",
  },
];

// News articles
export const newsArticles = [
  {
    id: 1,
    title: "New Environmental Clearance Guidelines 2024",
    excerpt: "MoEF&CC releases updated guidelines for faster EC processing with enhanced digital integration.",
    category: "Compliance",
    date: "2024-01-15",
    image: "/placeholder.svg",
    featured: true,
  },
  {
    id: 2,
    title: "Unique.EP Expands Operations to North-East",
    excerpt: "Opening new regional offices in Guwahati and Shillong to better serve clients in the North-Eastern states.",
    category: "Company",
    date: "2024-01-10",
    image: "/placeholder.svg",
    featured: false,
  },
  {
    id: 3,
    title: "Zero Liquid Discharge: The Future of Industrial Wastewater",
    excerpt: "How ZLD systems are becoming mandatory for industries and what businesses need to know.",
    category: "Industry",
    date: "2024-01-05",
    image: "/placeholder.svg",
    featured: false,
  },
];

// Gallery projects
export const galleryProjects = [
  {
    id: 1,
    title: "Compliance Project",
    sector: "Industrial",
    service: "Compliance Services",
    location: "Pune",
    image: "/bhuruka-gases.jpg",
    description: "Comprehensive compliance management for chemical manufacturing unit including audits and reporting",
  },
  {
    id: 2,
    title: "IT Park",
    sector: "Commercial",
    service: "Design Engineering",
    location: "Pune",
    image: "/abc-properties.jpg",
    description: "Design and engineering of STP and rainwater harvesting system for a large IT park",
  },
  {
    id: 3,
    title: "Hospital",
    sector: "Infrastructure",
    service: "Compliance Services",
    location: "Maharashtra",
    image: "/MargarHospital.jpg",
    description: "Biomedical waste management and compliance support for a multi-specialty hospital",
  },
  {
    id: 4,
    title: "Chemart Technologies",
    sector: "Industrial",
    service: "PEB Services",
    location: "Ahilyanagar",
    image: "/PEB.jpg",
    description: "PEB design and construction for a manufacturing facility with focus on sustainability and efficiency",
  },
  {
    id: 5,
    title: "VS Lad",
    sector: "Industrial",
    service: "EPC Services",
    location: "Hospet,Karnataka",
    image: "/VS Lad.jpg",
    description: "EPC services for a large-scale industrial project including ETP design and construction, air pollution control, and waste management systems",
  },
  {
    id: 6,
    title: "MARS India",
    sector: "Commercial",
    service: "PEB Services",
    location: "Khed city",
    image: "/PEB2.jpg",
    description: "PEB design and construction for a manufacturing facility with focus on sustainability and efficiency, including compliance management for environmental regulations",
  },
];
