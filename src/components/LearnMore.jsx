// src/components/LearnMore.jsx

import React from "react";
import { BookOpen } from "lucide-react";

// A map of search queries for each algorithm
const learnMoreLinks = {
  FCFS: "https://www.geeksforgeeks.org/dsa/first-come-first-serve-cpu-scheduling-non-preemptive/",
  SJF: "https://www.geeksforgeeks.org/operating-systems/shortest-job-first-or-sjf-cpu-scheduling/",
  LJF: "https://www.geeksforgeeks.org/operating-systems/longest-job-first-ljf-cpu-scheduling-algorithm/",
  SRTF: "https://www.geeksforgeeks.org/dsa/shortest-remaining-time-first-preemptive-sjf-scheduling-algorithm/",
  LRTF: "https://www.geeksforgeeks.org/operating-systems/longest-remaining-time-first-lrtf-cpu-scheduling-algorithm/",
  RRS: "https://www.geeksforgeeks.org/operating-systems/round-robin-scheduling-in-operating-system/",
  PRIORITY:
    "https://www.geeksforgeeks.org/operating-systems/priority-scheduling-in-operating-system/",
  MLQ: "https://www.geeksforgeeks.org/operating-systems/multilevel-queue-mlq-cpu-scheduling/",
  MLFQ: "https://www.geeksforgeeks.org/operating-systems/multilevel-feedback-queue-scheduling-mlfq-cpu-scheduling/",
};

function LearnMore({ algorithm }) {
  const link = learnMoreLinks[algorithm] || "#";

  return (
    <div className="card learn-more-card">
      <h2 className="card-title">Explore More</h2>
      <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
        Want to learn more about the <strong>{algorithm}</strong> algorithm?
        Click the button below to find a helpful article.
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-secondary"
        style={{ width: "100%" }}
      >
        <BookOpen size={18} />
        Learn about {algorithm}
      </a>
    </div>
  );
}

export default LearnMore;
