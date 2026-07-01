import { REGION } from './config';
import aws_logo from '../assets/logo/amazonaws.svg';
import angular_original_logo from '../assets/logo/angular-original.svg';
import azure_original_logo from '../assets/logo/azure-original.svg';
import azuresqldatabase_original_logo from '../assets/logo/azuresqldatabase-original.svg';
import docker_original_logo from '../assets/logo/docker-original.svg';
import dotnetcore_original_logo from '../assets/logo/dotnetcore-original.svg';
import figma_original_logo from '../assets/logo/figma-original.svg';
import flutter_original_logo from '../assets/logo/flutter-original.svg';
import html5_original_logo from '../assets/logo/html5-original.svg';
import javascript_original_logo from '../assets/logo/javascript-original.svg';
import laravel_original_logo from '../assets/logo/laravel-original.svg';
import mongodb_original_logo from '../assets/logo/mongodb-original.svg';
import nodejs_original_logo from '../assets/logo/nodejs-original.svg';
import php_original_logo from '../assets/logo/php-original.svg';
import postgresql_original_logo from '../assets/logo/postgresql-original.svg';
import python_original_logo from '../assets/logo/python-original.svg';
import react_original_logo from '../assets/logo/react-original.svg';
import vuejs_original_logo from '../assets/logo/vuejs-original.svg';
import wordpress_plain_logo from '../assets/logo/wordpress-plain.svg';

export const projectsData = [
  {
    id: 0, title: 'Shuh Appliance', year: '2024', category: 'Web App', type: 'web',
    description: 'An innovative web application for Shuh Appliance.',
    summary: 'A comprehensive ecommerce and appliance management platform built with modern technologies. Shuh Appliance provides a complete solution for discovering, managing, and purchasing home appliances, featuring real-time inventory tracking and a seamless customer checkout experience.',
    emoji: '🔌', visualTitle: 'Shuh Appliance', visualSub: 'Appliance Management', image: '/projects/shuh_1.png', images: ['/projects/shuh_1.png', '/projects/shuh_2.png', '/projects/shuh_3.png', '/projects/shuh_4.png'],
    tech: ['React', 'Node.js', 'Tailwind CSS'],
    metrics: { 'Users': '1K+' },
    links: [{ url: 'https://shuhappliance.com/', label: 'Live Site' }],
    accent: '#2563EB'
  },
  {
    id: 1, title: 'Rx Incidence', year: '2024', category: 'Health Tech', type: 'web',
    description: 'Healthcare tracking and incidence reporting system.',
    summary: 'An advanced healthcare tracking and incidence reporting platform that streamlines medical compliance and patient safety assessments. Rx Incidence provides medical professionals with secure, HIPAAcompliant tools to report, analyze, and manage clinical incidents through intelligent automation.',
    emoji: '⚕️', visualTitle: 'Rx Incidence', visualSub: 'Incidence Tracking', image: '/projects/rx_incident.png', images: ['/projects/rx_incident_1.png', '/projects/rx_incident_2.png', '/projects/rx_incident_3.png'],
    tech: ['Next.js', 'PostgreSQL'],
    metrics: { 'Incidents': '10K+' },
    links: [{ url: 'https://incident.myonerx.ca/', label: 'Live Site' }],
    accent: '#7C3AED'
  },
  {
    id: 2, title: 'State Technologies', year: '2024', category: 'Enterprise', type: 'web',
    description: 'Enterprise resource planning and management platform.',
    summary: 'An enterprise grade digital transformation and resource planning platform engineered for scalable business growth. State Technologies delivers a unified dashboard for managing operations, boosting efficiency, and driving innovation across modern enterprise workflows.',
    emoji: '🏢', visualTitle: 'State Technologies', visualSub: 'Enterprise Software', image: '/projects/state_1.png', images: ['/projects/state_1.png', '/projects/state_2.png', '/projects/state_3.png', '/projects/state_4.png', '/projects/state_5.png'],
    tech: ['Angular', '.NET Core'],
    metrics: { 'Clients': '500+' },
    links: [{ url: 'https://statetechnologies.ai/', label: 'AI Site' }, { url: 'https://stat-technologies.com/', label: 'Corporate Site' }],
    accent: '#0284C7'
  },
  {
    id: 3, title: 'Beg Event Group', year: '2024', category: 'Events', type: 'both',
    description: 'Comprehensive event management and planning platform.',
    summary: 'A premier event management and production platform designed for highenergy entertainment and seamless event execution. Beg Event Group streamlines vendor coordination, attendee management, and entertainment booking for large-scale events and weddings across the region.',
    emoji: '🎉', visualTitle: 'Beg Event Group', visualSub: 'Event Management', image: '/projects/beg_1.png', images: ['/projects/beg_1.png', '/projects/beg_2.png', '/projects/beg_3.png', '/projects/beg_4.png', '/projects/beg_5.png', '/projects/beg_6.png'],
    tech: ['React', 'Firebase'],
    metrics: { 'Events': '1K+' },
    links: [{ url: 'https://begeventgroup.com/', label: 'Live Site' }],
    accent: '#4F46E5'
  },
  {
    id: 4, title: 'Robert Andrew Salone', year: '2024', category: 'Booking', type: 'web',
    description: 'Streamlined salon booking and management system.',
    summary: 'A highly optimized, enterprise level salon booking and customer relationship management system. The platform provides a complete solution for scheduling appointments, managing staff calendars, and maintaining detailed client histories for a premium salon experience.',
    emoji: '💇', visualTitle: 'Robert Andrew Salone', visualSub: 'Salon Booking', image: '/projects/robert_1.png', images: ['/projects/robert_1.png', '/projects/robert_2.png', '/projects/robert_3.png', '/projects/robert_4.png', '/projects/robert_5.png'],
    tech: ['React', 'Node.js'],
    metrics: { 'Bookings': '5K+' },
    links: [{ url: 'https://www.robertandrew.com/', label: 'Live Site' }],
    accent: '#059669'
  },
  {
    id: 5, title: 'Rx Intelligence', year: '2024', category: 'Health Tech', type: 'web',
    description: 'Intelligent healthcare analytics platform.',
    summary: 'A data driven healthcare analytics platform providing specialized research services for pharmaceutical product managers. Rx Intelligence leverages advanced data modeling to help institutions make informed, data driven decisions and improve overall care quality.',
    emoji: '🧠', visualTitle: 'Rx Intelligence', visualSub: 'Healthcare Analytics', image: '/projects/rx_intel_1.png', images: ['/projects/rx_intel_1.png', '/projects/rx_intel_2.png', '/projects/rx_intel_3.png'],
    tech: ['React', 'Python'],
    metrics: { 'Data': '1M+' },
    links: [{ url: 'https://rxintelligence.at/', label: 'Live Site' }],
    accent: '#475569'
  },
  {
    id: 6, title: 'Nuvol Animal', year: '2024', category: 'Veterinary', type: 'web',
    description: 'Veterinary clinic management and tracking system.',
    summary: 'A dedicated veterinary clinic management platform built to modernize pet healthcare operations. Nuvol Animal streamlines appointment scheduling, medical record tracking, and comprehensive treatment histories to ensure optimal care for animal patients.',
    emoji: '🐾', visualTitle: 'Nuvol Animal', visualSub: 'Veterinary Management', image: '/projects/nuvol_1.png', images: ['/projects/nuvol_1.png', '/projects/nuvol_2.png', '/projects/nuvol_3.png', '/projects/nuvol_4.png'],
    tech: ['React', 'MongoDB'],
    metrics: { 'Pets': '10K+' },
    links: [{ url: 'https://www.nuvolanimalhealth.co.in/', label: 'Live Site' }],
    accent: '#E11D48'
  },
  {
    id: 7, title: 'Tsg Weddings', year: '2024', category: 'Events', type: 'web',
    description: 'Complete wedding planning and vendor management platform.',
    summary: 'An all-in-one digital wedding planning and production platform that connects couples with premium vendors. TSG Weddings provides a complete solution for managing event timelines, entertainment coordination, and seamless wedding day execution.',
    emoji: '💍', visualTitle: 'Tsg Weddings', visualSub: 'Wedding Planning', image: '/projects/tsg_weddings.png', images: ['/projects/tsg_weddings.png', '/projects/tsg_2.png', '/projects/tsg_3.png', '/projects/tsg_4.png'],
    tech: ['Next.js', 'Stripe'],
    metrics: { 'Weddings': '500+' },
    links: [{ url: 'https://tsgweddings.com/', label: 'Live Site' }],
    accent: '#0284C7'
  },
  {
    id: 8, title: 'Varical Space Magezine', year: '2024', category: 'Publishing', type: 'web',
    description: 'Digital publishing platform for space enthusiasts.',
    summary: 'A modern digital publishing and content management platform dedicated to space exploration and technology. Vertical Space Magazine features rich multimedia articles, subscription services, and an optimized editorial workflow for high-quality journalism.',
    emoji: '🚀', visualTitle: 'Varical Space Magezine', visualSub: 'Digital Magazine', image: '/projects/vertical_space.png', images: ['/projects/vertical_5.png', '/projects/vertical_6.png', '/projects/vertical_7.png', '/projects/vertical_8.png'],
    tech: ['React', 'CMS'],
    metrics: { 'Readers': '50K+' },
    links: [{ url: 'https://verticalspace.ai/', label: 'Live Site' }],
    accent: '#059669'
  }
];

export const skillsData = [
  {
    icon: 'fa-brands fa-react', iconBg: 'bg-blue-500/10', iconColor: 'text-blue-400',
    title: 'Frontend',
    desc: 'React, Next.js, Vue.js, Angular, TypeScript, Tailwind CSS, Framer Motion. Crafting pixel-perfect UIs with 60fps performance.'
  },
  {
    icon: 'fa-solid fa-server', iconBg: 'bg-indigo-500/10', iconColor: 'text-indigo-400',
    title: 'Backend',
    desc: 'Node.js, Express, .NET Core, Python, PHP, Laravel, WordPress, RESTful APIs, GraphQL. Building robust, scalable server architectures.'
  },
  {
    icon: 'fa-solid fa-mobile-screen-button', iconBg: 'bg-sky-500/10', iconColor: 'text-sky-400',
    title: 'Mobile',
    desc: 'Flutter, React Native. Cross-platform apps with native performance from a single codebase.'
  },
  {
    icon: 'fa-solid fa-cloud', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-400',
    title: 'Cloud & DevOps',
    desc: 'Azure, AWS, Docker, CI/CD pipelines. Production-grade infrastructure with 99.9% uptime.'
  },
  {
    icon: 'fa-solid fa-database', iconBg: 'bg-slate-500/10', iconColor: 'text-slate-400',
    title: 'Databases',
    desc: 'PostgreSQL, SQL Server, MongoDB, MySQL, Redis. Data modeling and optimization at scale.'
  },
  {
    icon: 'fa-solid fa-brain', iconBg: 'bg-emerald-500/10', iconColor: 'text-emerald-400',
    title: 'AI & Integrations',
    desc: 'OpenAI, LLMs, Stripe, Twilio, Socket.IO, Map APIs. Connecting intelligent services into cohesive products.'
  }
];

export const techMarqueeItems = [
  { imgUrl: react_original_logo, label: 'React' },
  { imgUrl: angular_original_logo, label: 'Angular' },
  { imgUrl: vuejs_original_logo, label: 'Vue.js' },
  { imgUrl: dotnetcore_original_logo, label: '.NET Core' },
  { imgUrl: nodejs_original_logo, label: 'Node.js' },
  { imgUrl: postgresql_original_logo, label: 'PostgreSQL' },
  { imgUrl: azuresqldatabase_original_logo, label: 'SQL Server' },
  { imgUrl: mongodb_original_logo, label: 'MongoDB' },
  { imgUrl: flutter_original_logo, label: 'Flutter' },
  { imgUrl: azure_original_logo, label: 'Azure' },
  { imgUrl: aws_logo, label: 'AWS' },
  { imgUrl: docker_original_logo, label: 'Docker' },
  { icon: 'fa-solid fa-brain', color: 'text-purple-500', label: 'AI / LLM' },
  { imgUrl: python_original_logo, label: 'Python' },
  { imgUrl: php_original_logo, label: 'PHP' },
  { imgUrl: laravel_original_logo, label: 'Laravel' },
  { imgUrl: wordpress_plain_logo, label: 'WordPress' },
  { imgUrl: javascript_original_logo, label: 'JavaScript' },
  { imgUrl: html5_original_logo, label: 'HTML/CSS' },
  { imgUrl: figma_original_logo, label: 'Figma' },
];

const commonExperienceData = [
  {
    period: 'May 2022 – Sep 2022',
    title: 'Solution Technology Architect',
    company: 'IT Path Solutions Pvt. Ltd.',
    type: 'Full-time',
    duration: '5 mos',
    location: 'Ahmedabad, Gujarat, India',
    desc: 'Led architecture for 8+ enterprise projects, managing end to end delivery for teams of 5 to 12 developers. Optimized 100+ database queries, achieving 20 to 60% reduction in execution time.',
    skills: ['Team Management', 'Project Management', 'Database Optimization', 'and 9 additional skills.'],
    align: 'left'
  },
  {
    period: 'Dec 2017 – Apr 2022',
    title: 'Lead Technology Architect',
    company: 'IT Path Solutions Pvt. Ltd.',
    type: 'Full-time',
    duration: '4 yrs 5 mos',
    location: 'Greater Ahmedabad Area',
    desc: 'Architected 15+ scalable backend solutions for SaaS and ecommerce clients, handling 100K+ daily transactions.',
    skills: ['Laravel', 'WordPress', 'Backend Architecture', 'and 10 additional skills.'],
    align: 'right'
  },
  {
    period: 'Sep 2016 – Dec 2017',
    title: 'Sr. PHP Developer',
    company: 'Kaira Software Pvt. Ltd.',
    type: 'Full-time',
    duration: '1 yr 4 mos',
    location: 'Greater Ahmedabad Area',
    desc: 'Developed applications integrating third party APIs such as MLS, Mailchimp, HubSpot, and Google Maps. Refactored existing applications to enhance performance, scalability, and maintainability.',
    skills: ['Laravel', 'CodeIgniter', 'API Integration', 'and 6 additional skills.'],
    align: 'left'
  },
  {
    period: 'Jul 2014 – Aug 2016',
    title: 'PHP Developer',
    company: 'TriState Technology',
    type: 'Full-time',
    duration: '2 yrs 2 mos',
    location: 'Greater Ahmedabad Area',
    desc: 'Developed custom web applications using PHP and WordPress, ensuring responsive design and optimal database performance.',
    skills: ['PHP', 'WordPress', 'Web Development', 'and 6 additional skills.'],
    align: 'right'
  }
];

const experienceDataIndia = [
  {
    period: 'Dec 2022 – Present',
    title: 'Senior Full Stack Developer',
    company: 'Nexuron Technologies',
    type: 'Full-time',
    duration: '3 yrs 7 mos',
    location: 'Kadi, Gujarat, India · Remote',
    desc: 'Contributed to the design, development, and deployment of robust web and mobile applications. Took ownership of end to end project lifecycles, from requirement gathering to delivery, ensuring high quality software solutions.',
    skills: ['React', 'Node.js', 'and additional skills'],
    align: 'right'
  },
  ...commonExperienceData
];

const experienceDataCanada = [
  {
    period: 'Dec 2022 – Present',
    title: 'Full Stack Engineer',
    company: 'Creative Guild',
    type: 'Permanent Full-time',
    duration: '3 yrs 7 mos',
    location: 'Hamilton, Ontario, Canada · Remote',
    desc: 'Architected and deployed 5+ full-stack SaaS applications using Laravel and Vue.js, serving 20,000+ active users across North America.',
    skills: ['Laravel', 'Vue.js', 'Full-Stack Development', 'SaaS Architecture', 'and additional skills'],
    align: 'right'
  },
  ...commonExperienceData.map(exp => ({
    ...exp,
    location: exp.location
      .replace('Ahmedabad, Gujarat, India', 'Toronto, Ontario, Canada')
      .replace('Greater Ahmedabad Area', 'Greater Toronto Area, Canada')
  }))
];

export const experienceData = REGION === 'canada' ? experienceDataCanada : experienceDataIndia;

export const testimonialsData = [
  {
    text: '"Umesh is a standout full stack developer who consistently delivered high quality work throughout our project. He brings strong expertise in Node.js, React, and PostgreSQL, and handled both frontend and backend responsibilities seamlessly. Beyond execution, Umesh was proactive and thoughtful, regularly suggesting smart improvements that elevated the final product. Communication was clear and consistent, deadlines were always met, and the overall collaboration was smooth from start to finish. We would absolutely work with him again and highly recommend him to anyone looking for a reliable, skilled developer who takes real ownership of his work."',
    author: 'Andrew',
    role: 'Client'
  },
  {
    text: '"Working with Umesh Patel has been an excellent experience. He is a highly skilled Full Stack Developer with strong expertise in both Laravel and React. Umesh successfully enhanced our custom CRM system, including developing the Sales Pipeline Tracking feature and resolving existing bugs with precision. What impressed me most was his technical depth, problem solving mindset, and clear communication. He quickly understood our requirements, delivered clean and scalable solutions, and also suggested improvements where needed. His ability to handle both backend and frontend seamlessly made the project run smoothly. Umesh is professional, reliable, and proactive, qualities that make him a valuable asset to any team. I look forward to working with him again and would strongly recommend him to anyone seeking a top-tier developer for complex web applications."',
    author: 'Kate Smith',
    role: 'Client'
  },
  {
    text: '"Umesh is a skilled Full Stack Developer who did an excellent job on our DJ Client CRM Portal updates. He quickly understood the requirements and delivered clean, responsive, and well-structured styling that improved the overall user experience. Beyond execution, Umesh was proactive and suggested useful UI improvements. Communication was clear and consistent, and all work was delivered on time. The collaboration was smooth from start to finish. We would definitely work with Umesh again and highly recommend him to anyone looking for a reliable Full Stack Developer who takes ownership and delivers high-quality results."',
    author: 'Andy',
    role: 'Client'
  }
];
