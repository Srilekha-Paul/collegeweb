import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const colleges = [
  {
    name: "IIT Bombay",
    slug: "iit-bombay",
    location: "Mumbai, Maharashtra",
    state: "Maharashtra",
    city: "Mumbai",
    fees: 800000,
    rating: 4.8,
    placement: 95,
    courses: ["B.Tech CSE", "B.Tech EE", "M.Tech", "MBA"],
    description: "Premier engineering institute",
    image: "/colleges/iitb.jpg",
    established: 1958,
    type: "Public",
    exams: ["JEE Advanced"]
  },
  {
    name: "IIT Delhi",
    slug: "iit-delhi",
    location: "Delhi",
    state: "Delhi",
    city: "Delhi",
    fees: 850000,
    rating: 4.7,
    placement: 93,
    courses: ["B.Tech CSE", "B.Tech ME", "M.Tech"],
    description: "Top technical institute",
    image: "/colleges/iitd.jpg",
    established: 1961,
    type: "Public",
    exams: ["JEE Advanced"]
  },
  {
    name: "BITS Pilani",
    slug: "bits-pilani",
    location: "Pilani, Rajasthan",
    state: "Rajasthan",
    city: "Pilani",
    fees: 1200000,
    rating: 4.6,
    placement: 92,
    courses: ["B.E. CSE", "B.E. ECE", "M.E."],
    description: "Deemed university with excellent placements",
    image: "/colleges/bits.jpg",
    established: 1964,
    type: "Private",
    exams: ["BITSAT"]
  },
  {
    name: "NIT Trichy",
    slug: "nit-trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Tiruchirappalli",
    fees: 500000,
    rating: 4.5,
    placement: 90,
    courses: ["B.Tech CSE", "B.Tech ECE"],
    description: "Top NIT with great ROI",
    image: "/colleges/nitt.jpg",
    established: 1964,
    type: "Public",
    exams: ["JEE Main"]
  },
  {
    name: "VIT Vellore",
    slug: "vit-vellore",
    location: "Vellore, Tamil Nadu",
    state: "Tamil Nadu",
    city: "Vellore",
    fees: 750000,
    rating: 4.3,
    placement: 88,
    courses: ["B.Tech CSE", "B.Tech IT"],
    description: "Private university with good placements",
    image: "/colleges/vit.jpg",
    established: 1984,
    type: "Private",
    exams: ["VITEEE"]
  }
]

async function main() {
  await prisma.college.deleteMany()
  for (const college of colleges) {
    await prisma.college.create({
      data: college
    })
  }
  console.log(`Seeded ${colleges.length} colleges`)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())