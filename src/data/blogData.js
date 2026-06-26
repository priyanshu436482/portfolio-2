export const blogData = [
  {
    id: 0,
    title: 'Building an AI-Powered Invoice Engine That Cut Processing Time by 80%',
    date: 'Mar 2024',
    readTime: '5 min read',
    category: 'AI / SaaS',
    emoji: '🤖',
    accent: '#3B82F6',
    summary: 'How we built a smart document processing pipeline that extracts, matches, and reports on supplier invoices — reducing manual effort by 80% for a growing fintech.',
    tags: ['Next.js', '.NET Core', 'PostgreSQL', 'AI/LLM', 'Flutter'],
    sections: [
      {
        heading: 'The Problem',
        text: 'A fast-growing fintech was processing thousands of supplier invoices manually. Their finance team spent 20+ hours a week reading PDFs, matching line items to contracts, and flagging discrepancies. As their volume grew 3x in six months, manual processing became a bottleneck.'
      },
      {
        heading: 'The Goal',
        text: 'Build an intelligent invoice management platform that automatically extracts invoice data, matches it against active contracts, flags anomalies, and generates project-level reports — accessible via both web dashboard and a companion mobile app.'
      },
      {
        heading: 'The Approach',
        text: 'We used a multi-engine document parsing pipeline. Invoices uploaded via the web portal or mobile app are processed through OCR + an LLM-based extraction layer that pulls vendor name, date, line items, amounts, and PO numbers. Extracted data is cross-referenced against contract terms stored in PostgreSQL. Any mismatch (price variance >5%, missing PO, duplicate invoice) is flagged in real-time with a confidence score.'
      },
      {
        heading: 'Tech Stack & Architecture',
        text: 'The frontend is built with Next.js and React for the admin dashboard, with a Flutter companion app for on-the-go approvals. The API layer runs on .NET Core with PostgreSQL for structured data and EF Core for ORM. The AI extraction layer uses OpenAI embeddings combined with a custom-trained classifier for document type detection. The entire pipeline runs asynchronously — users get a notification the moment processing completes.'
      },
      {
        heading: 'Key Results',
        text: 'Invoice processing time dropped from 20 minutes per invoice to under 3 minutes. The anomaly detection flagged 94% of discrepancies before they reached accounting. The platform now handles 10,000+ invoices monthly with 95% extraction accuracy, and the client\'s finance team shifted from data entry to strategic analysis.'
      }
    ]
  },
  {
    id: 1,
    title: 'Architecting a Real-Time Booking System Across 3 Platforms with a Single API',
    date: 'Jun 2024',
    readTime: '4 min read',
    category: 'Booking',
    emoji: '💇',
    accent: '#FB923C',
    summary: 'Designing a unified booking engine that powers a salon\'s web, mobile app, and POS kiosk — with real-time queue management, staff scheduling, and Twilio alerts.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Socket.IO', 'Flutter'],
    sections: [
      {
        heading: 'The Problem',
        text: 'A salon chain with 12 locations was running three separate systems — a website for booking, a mobile app for customers, and a POS for walk-in checkouts. None of them talked to each other. Double-bookings were common, staff schedules were managed on paper, and customers often arrived only to find their booked slot was already taken.'
      },
      {
        heading: 'The Architecture Decision',
        text: 'We built a single unified API (Node.js + PostgreSQL) that served as the source of truth for all three platforms. Real-time updates were handled via Socket.IO so that when a customer booked via the mobile app, the POS kiosk and web dashboard reflected it instantly. The frontends — React web, Flutter mobile, and a lightweight POS client — each consumed the same API with role-specific views.'
      },
      {
        heading: 'Handling Concurrency & Conflicts',
        text: 'The biggest challenge was preventing double-bookings during high-traffic windows (Friday evenings, weekends). We implemented optimistic locking with database-level unique constraints on (staff_id, start_time). The booking flow uses a two-phase reservation pattern: hold the slot for 5 minutes while payment completes, then confirm. If payment fails, the slot auto-releases.'
      },
      {
        heading: 'Results & Impact',
        text: 'The salon chain eliminated double-bookings entirely. Customer no-show rate dropped by 35% thanks to automated Twilio SMS reminders 2 hours before each appointment. Staff scheduling became fully automated — the system optimizes shift assignments based on booking density patterns. Monthly bookings grew to 5,000+ across all locations.'
      }
    ]
  },
  {
    id: 2,
    title: 'Designing an Offline-First Event Check-In Ecosystem for 10,000+ Attendees',
    date: 'Oct 2023',
    readTime: '4 min read',
    category: 'Events',
    emoji: '📋',
    accent: '#3B82F6',
    summary: 'How we built a suite of 3 apps — RFID scanning, self check-in, and paperless agenda management — that work reliably even without internet connectivity.',
    tags: ['Flutter', 'RFID', 'BLE', 'QR Code'],
    sections: [
      {
        heading: 'The Problem',
        text: 'Large conferences and corporate events often have unreliable on-site WiFi. Existing check-in solutions fail when the network goes down, creating long queues and frustrated attendees. The event organizers needed a system that worked flawlessly offline and synced data automatically when connectivity returned.'
      },
      {
        heading: 'The Ecosystem — 3 Apps, One Mission',
        text: 'We built the i-Attend Suite: Capture (for staff with RFID/QR scanners), Self Check-in (for attendees using QR + PIN), and TAP (for paperless agendas and session evaluations). Each app was built with Flutter for cross-platform deployment on both iOS and Android devices — including cheap handheld RFID readers.'
      },
      {
        heading: 'Offline-First Architecture',
        text: 'Every action — check-in, session attendance, feedback submission — is stored locally using SQLite and queued for sync. When the device detects a stable internet connection, it syncs to the cloud API using a conflict-resolution strategy: server wins for check-ins (preventing duplicates), client wins for feedback (since it\'s append-only). The sync engine uses a last-write-wins model with UUID-based conflict detection.'
      },
      {
        heading: 'Real-World Impact',
        text: 'The suite has been deployed at events with 10,000+ attendees. During one major conference, the venue WiFi went down for 45 minutes — check-ins continued without interruption, and all data synced automatically once connectivity returned. The organizers reported 40% faster entry throughput compared to their previous cloud-dependent system.'
      }
    ]
  }
];
