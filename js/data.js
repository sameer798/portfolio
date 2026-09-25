// All portfolio content lives here: about, skills, experience, projects, education, contact
// Edit this file to add/update content - no need to touch HTML or other JS files

const portfolioData = {

   about: {
    name: "Sameer",
    role: "Software Engineer",

    // 👇 Typing animation config
    // "I " prefix fix rahega, sirf ye words type/delete honge
    typingPrefix: "I ",
    typingWords: [
      "build reliable software.",
      "solve complex problems.",
      "write clean code.",
      "ship scalable systems."
    ],
    typingSpeed: 100,         // ms per letter (type karte waqt)
    typingDeleteSpeed: 50,    // ms per letter (delete karte waqt)
    typingHoldTime: 1500,     // ms (complete word kitni der dikhe)

    // 👇 Naam ke color flash ke liye
    nameColors: [
      "#5dcaa5",   // green
      "#ed93b1",   // pink
      "#378ADD",   // blue
      "#FAC775"    // yellow
    ],

    bio: [
      "Hey there, I'm Sameer! I'm a Software Engineer passionate about building scalable systems and writing clean, maintainable code.",
      "I love diving deep into problems, learning new tools, and shipping things that actually work in production."
    ],
    photo: "assets/images/my-photo.png",
    socials: {
      linkedin: "#",
      github: "#",
      resume: "assets/resume/resume.pdf"
    }
  },

  skills: {
    bars: [
      { name: "React", percent: 88, color: "#378ADD" },
      { name: "Node.js", percent: 85, color: "#639922" },
      { name: "JavaScript", percent: 90, color: "#EF9F27" },
      { name: "Python", percent: 80, color: "#D4537E" },
      { name: "MySQL", percent: 82, color: "#1D9E75" },
      { name: "AWS", percent: 75, color: "#7F77DD" }
    ],
    tools: ["Git", "Docker", "AWS", "MySQL", "Postman", "Linux"]
  },

  experience: [
    {
      company: "Company Name One",
      logo: "assets/images/companies/company-1.png",
      role: "Software Engineer",
      duration: "Jan 2023 - Present",
      tools: ["React", "Node.js", "MySQL"],
      description: "Add 2-3 lines about your role, what you worked on, and the impact you had (numbers/metrics if possible).",
      photos: [
        "assets/images/companies/company-1-photo1.jpg",
        "assets/images/companies/company-1-photo2.jpg"
      ]
    },
    {
      company: "Company Name Two",
      logo: "assets/images/companies/company-2.png",
      role: "Software Engineer Intern",
      duration: "Jun 2022 - Dec 2022",
      tools: ["Python", "AWS"],
      description: "Add 2-3 lines about your role, what you worked on, and the impact you had (numbers/metrics if possible).",
      photos: [
        "assets/images/companies/company-2-photo1.jpg"
      ]
    }
  ],

  projects: [
    {
      name: "Project One",
      tools: ["React", "Node.js", "MySQL"],
      description: "Add 2-3 lines describing what this project does and the impact/result it had.",
      photos: [
        "assets/images/projects/project-1/photo1.jpg",
        "assets/images/projects/project-1/photo2.jpg"
      ]
    },
    {
      name: "Project Two",
      tools: ["Python", "TensorFlow"],
      description: "Add 2-3 lines describing what this project does and the impact/result it had.",
      photos: [
        "assets/images/projects/project-2/photo1.jpg"
      ]
    }
  ],

  education: [
    {
      years: "2017 - 2021",
      degree: "BACHELORS DEGREE",
      college: "Lovely Professional University",
      branch: "Computer Science and Engineering",
      grade: "Grade: -- CGPA",
      logo: "assets/images/education/lpu.png"
    }
  ],

  contact: {
    email: "sameer@gmail.com",
    location: "City, Country",
    socials: {
      github: "#",
      linkedin: "#"
    }
  }

};