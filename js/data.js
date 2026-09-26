// All portfolio content lives here: about, skills, experience, projects, education, contact
// Edit this file to add/update content - no need to touch HTML or other JS files

const portfolioData = {

  about: {
    name: "Sameer Ansari",
    role: "Software Engineer",

    // 👇 Typing animation config
    typingPrefix: "I ",
    typingWords: [
      "am software developer",
      "build scalable systems.",
      "solve complex problems.",
      "optimize performance",
      "write clean code.",
    
    ],
    typingSpeed: 100,
    typingDeleteSpeed: 50,
    typingHoldTime: 1500,

    // 👇 Naam ke color flash ke liye
    nameColors: [
      "#5dcaa5",
      "#ed93b1",
      "#378ADD",
      "#FAC775"
    ],


     // 👇 "Who am I?" section ki heading config
    sectionHeading: {
      text: "Who am I?",
      colors: [
        "#D4537E",   // pink (reference jaisa)
        "#378ADD",   // blue
        "#5dcaa5",   // green
        "#EF9F27"    // amber
      ]
    },

    // 👇 Code card ka pura data (100% data-driven)
    // type: "string" | "array" | "bool" | "function"
    codeCard: {
      varName: "coder",
      fields: [
        {
          key: "name",
          type: "string",
          value: "Sameer"
        },
        {
          key: "skills",
          type: "array",
          value: ["React", "Node.js", "JavaScript", "Python", "MySQL", "AWS"]
        },
        {
          key: "hardWorker",
          type: "bool",
          value: true
        },
        {
          key: "quickLearner",
          type: "bool",
          value: true
        },
        {
          key: "problemSolver",
          type: "bool",
          value: true
        },
        {
          key: "hireable",
          type: "function",
          conditions: [
            { prefix: "this.hardWorker", op: "&&" },
            { prefix: "this.problemSolver", op: "&&" },
            { prefix: "this.skills.length", op: ">=", value: 5 }
          ]
        }
      ]
    },

    bio: [
      "Hey there, I'm Sameer! I'm a Software Engineer passionate about building scalable systems and writing clean, maintainable code.",
      "I love diving deep into problems, learning new tools, and shipping things that actually work in production.",
      "Backend wizard here! 🚀 I'm all about making systems faster, smarter, and more scalable. Think database optimization, microservices that actually work, and code that doesn't make you want to pull your hair out. I've squeezed out 40% faster retrieval times and 35% speedier searches—because who likes waiting, right? When I'm not geeking out over clean code and new tech, you'll catch me crushing LeetCode problems (1730+ rating, no big deal 😎) or competing in programming contests. Always down to build something cool together!"
    ],
    photo: "assets/images/my-photo.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/sameer-ansari-45a4a71a0/",
      github: "https://github.com/sameer798",
      resume: "assets/resume/sameer-ahmed.pdf"
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
    // tools: ["TypeScript", "Next JS","Node JS","Express JS", "React","Git", "JavaScript", "MySQL", "Linux", "MongoDB",  "HTML", "CSS", "Tailwind","Docker", "Postman"]
        tools: [
      { name: "TypeScript",     logo: "assets/logos/typescript-color.svg" },
      { name: "Next JS",  logo: "assets/logos/nextdotjs-color.svg" },
      { name: "Node JS",     logo: "assets/logos/nodedotjs-color.svg" },
      { name: "Express JS",   logo: "assets/logos/express-color.svg" },
      { name: "React", logo: "assets/logos/react-color.svg" },
      { name: "Git",   logo: "assets/logos/git-color.svg" },
      { name: "JavaScript",   logo: "assets/logos/javascript-color.svg" },
      { name: "MySQL",   logo: "assets/logos/mysql-color.svg" },
      { name: "Linux",   logo: "assets/logos/linux-color.svg" },
      { name: "MongoDB",   logo: "assets/logos/mongodb-color.svg" },
      { name: "HTML",   logo: "assets/logos/html5-color.svg" },
      { name: "CSS",   logo: "assets/logos/css-color.svg" },
      { name: "Tailwind",   logo: "assets/logos/tailwindcss-color.svg" },
      { name: "Docker",   logo: "assets/logos/docker-color.svg" },
      { name: "Postman",   logo: "assets/logos/postman-color.svg" },

    ]
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
    heading: "Let's talk",
    // subtitle: "Have a project in mind? Send a message and I'll get back soon.",
    email: "sameershams.adi@gmail.com",
    location: "Ahmedabad, India",
    whatsapp: "917737308028",
    socials: {
      github: "https://github.com/sameer798",
      linkedin: "https://www.linkedin.com/in/sameer-ansari-45a4a71a0/"
    }
  }

};