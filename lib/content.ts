// Copy distilled from innov8search.com. Short by design: say less, mean more.

export const nav = [
  { label: "Approach", href: "#approach" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  lead: "Hire the Top",
  rotating: ["Commercial", "Operational", "Financial", "Executive"],
  tail: "Talent in Life Sciences.",
  full: "Hire the Top Commercial, Operational, Financial and Executive Talent in Life Sciences.",
};

// Hero city reel, one clip per capital Innov8Search covers
export const cities = [
  {
    name: "Sydney",
    country: "Australia",
    coords: "33.87° S, 151.21° E",
    video: "/video/sydney",
    poster: "/images/sydney-poster.jpg",
    pan: [-2.5, -1] as [number, number],
  },
  {
    name: "Wellington",
    country: "New Zealand",
    coords: "41.29° S, 174.78° E",
    video: "/video/wellington",
    poster: "/images/wellington-poster.jpg",
    pan: [2.5, -1.5] as [number, number],
  },
  {
    name: "London",
    country: "United Kingdom",
    coords: "51.50° N, 0.13° W",
    video: "/video/london",
    poster: "/images/london-poster.jpg",
    pan: [0, -2.5] as [number, number],
  },
];

export const manifesto =
  "Some leadership changes have to be made quietly. We find the people who move Life Sciences forward, and we do it in full confidence.";

export const stats = [
  { value: 20, suffix: "+", label: "Years in the industry" },
  { value: 100, suffix: "%", label: "Executive search success" },
  { value: 4, suffix: "", label: "Markets: ANZ, APAC & UK" },
];

export const services = [
  { title: "Executive Search", line: "Confidential leadership search, under NDA.", image: "/images/harbour-bridge.jpg" },
  { title: "Niche Skill Set Search", line: "Business-critical roles from the tightest talent pools.", image: "/images/innovation.jpg" },
  { title: "Recruitment Outsourcing", line: "Your permanent hiring, run as part of your team.", image: "/images/working.jpg" },
  { title: "Opportunistic Hiring", line: "First look at recently vetted, high-calibre talent.", image: "/images/sydney-harbour.jpg" },
  { title: "Talent Partnerships", line: "Fresh talent from outside the industry, trained for yours.", image: "/images/team.jpg" },
  { title: "Advisory & Consultancy", line: "Market intel, coaching and commercial expertise.", image: "/images/brand-desk.jpg" },
  { title: "Interim & Fractional", line: "Senior MedTech leaders, on your timeline.", image: "/images/dusk-water.jpg" },
];

export const leader = {
  intro: "Built by MedTech and Life Sciences insiders who have done the roles we recruit for.",
  quote: "We help companies unlock the talent they need to improve healthcare.",
  name: "Tara Sharma",
  role: "Managing Director",
};

export const clients = [
  { name: "Stryker", src: "/clients/stryker.png", w: 600, h: 345 },
  { name: "Medtronic", src: "/clients/medtronic.png", w: 600, h: 336 },
  { name: "BD", src: "/clients/bd.png", w: 600, h: 318 },
  { name: "Brainlab", src: "/clients/brainlab.png", w: 600, h: 214 },
  { name: "EBOS MedTech", src: "/clients/ebosmedtech.png", w: 600, h: 266 },
  { name: "Gedeon Richter", src: "/clients/gedeon-richter.png", w: 600, h: 168 },
  { name: "Getz Healthcare", src: "/clients/getz.png", w: 600, h: 330 },
  { name: "Endotherapeutics", src: "/clients/endotx.png", w: 600, h: 111 },
  { name: "Orthocell", src: "/clients/orthocell.png", w: 600, h: 227 },
  { name: "Medacta", src: "/clients/medacta.png", w: 600, h: 329 },
  { name: "Life Healthcare", src: "/clients/lhc.png", w: 600, h: 596 },
];

export const testimonials = [
  { quote: "Your system showed us every possible candidate in the market. We knew we weren't missing anyone.", by: "Medical Device Executive" },
  { quote: "We trusted the process because it was thorough and transparent. There was no second-guessing.", by: "Biotech Hiring Team" },
  { quote: "We felt assured that no stone was left unturned. We could see exactly where every candidate stood.", by: "Pharma Hiring Manager" },
  { quote: "Our schedules were demanding, but the process adapted. We never lost momentum.", by: "Life Sciences VP" },
];

export const contact = {
  phones: ["+61 451 340 321", "+44 787 664 8494"],
  email: "tara@innov8search.com",
  enquiryTypes: ["Confidential / Executive Search", "Senior Leadership Search", "Commercial Search", "Candidate Enquiry"],
};
