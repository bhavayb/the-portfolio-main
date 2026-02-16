"use client";

import { Transition } from "./ui/Transitions";

interface WorkExperience {
  company_name: string;
  summary: string;
  sequence: number;
  startDate: string;
  endDate: string;
  jobTitle: string;
  jobLocation: string;
  bulletPoints: string[];
  _id: string;
}

// Hardcoded work experience data
const experienceData: WorkExperience[] = [
  {
    company_name: "Quratr - AI-powered place discovery platform",
    summary: "Contributed to the development of a cloud-based SaaS platform focused on AI-driven place discovery and user engagement.",
    sequence: 1,
    startDate: "2024-01-03T00:00:00.000Z",
    endDate: "2024-03-08T00:00:00.000Z",
    jobTitle: "Software Developer Intern",
    jobLocation: "New Delhi, India",
    bulletPoints: [
      "Built a full-stack web application using React with a Node.js and Express backend, following a clean client–server architecture.",

"Designed RESTful APIs for end-to-end CRUD operations and modeled data using MongoDB for efficient storage and querying",
"Integrated frontend and backend with async data handling, and tested and debugged APIs using Postman to ensure reliability."
    ],
    _id: "65f1fd9e0556c3f887e9d9d8"
  },
  {
    company_name: "RNY Clothing - E-commerce platform for trendy apparel",
    summary: "Contributed to the development of a full-stack web application supporting product listings, user interactions, and business workflows.",
    sequence: 2,
    startDate: "2023-10-11T00:00:00.000Z",
    endDate: "2024-03-28T00:00:00.000Z",
    jobTitle: "Software Developer Intern",
    jobLocation: "Jaipur, India",
    bulletPoints: [
      "Developed a full-stack web application with dynamic, responsive React interfaces for web and mobile.",
      "Built user and admin dashboards, implemented Node.js and Express REST APIs, and handled authentication and state management.",
      "Designed and managed scalable database schemas and integrated frontend components with backend services."
    ],
    _id: "65f1fe1e0556c3f887e9dab2"
  }
];

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    month: months[date.getMonth()],
    year: date.getFullYear()
  };
};

const WorkExperience = () => {
  const experience = experienceData.sort((a, b) => a.sequence - b.sequence);

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" id="experience">
      <span className="blob hidden sm:absolute sm:top-[20%] sm:right-0 sm:w-1/3 sm:h-5/6 sm:blur-[100px] sm:rotate-180 sm:-z-10 sm:opacity-30" />
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent mb-4 drop-shadow-[0_0_18px_rgba(6,182,212,0.25)]">
          Work <span className="text-cyan-400">Experience</span>
        </h2>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-cyan-500 to-cyan-400 mx-auto rounded-full mb-3 sm:mb-4" />
        <p className="text-gray-400 text-base sm:text-lg">Professional journey and contributions</p>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Vertical Timeline Line - static on mobile */}
        <div className="hidden sm:block absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-cyan-500 to-transparent" />

        {experience.map((exp, index) => (
          <Transition key={exp._id} className="relative mb-16 last:mb-0">
            <div className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Timeline Dot */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 ring-4 ring-[#07101a] shadow-lg shadow-cyan-600/40" />
              </div>

              {/* Empty space for alternating layout on desktop */}
              <div className="hidden md:block md:w-1/2" />

              {/* Content Card */}
              <div className="ml-16 md:ml-0 md:w-1/2">
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-md hover:bg-white/8 hover:border-cyan-600/30 transition-all duration-300 hover:scale-[1.01] shadow-md hover:shadow-lg hover:shadow-cyan-600/20">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-cyan-400 font-semibold mb-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="italic">
                      {formatDate(exp.startDate).month} {formatDate(exp.startDate).year} - {formatDate(exp.endDate).month} {formatDate(exp.endDate).year}
                    </span>
                  </div>

                  {/* Job Title */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-all">
                    {exp.jobTitle}
                  </h3>

                  {/* Company & Location */}
                  <div className="flex flex-col md:flex-row md:items-center md:gap-4 text-white/75 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">{exp.company_name}</span>
                    </div>
                    {exp.jobLocation && (
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span>{exp.jobLocation}</span>
                      </div>
                    )}
                  </div>

                  {/* Summary */}
                  {/* <p className="text-white/70 mb-4 leading-relaxed">{exp.summary}</p> */}

                  {/* Bullet Points */}
                  <ul className="space-y-2">
                    {exp.bulletPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/75">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Transition>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;