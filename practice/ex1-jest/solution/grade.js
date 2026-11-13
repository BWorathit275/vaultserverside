// Requirement: pass if score is at least 50; score must be 0-100.
function isPassing(score) {
  if (score < 0 || score > 100) {
    throw new RangeError("Score must be between 0 and 100");
  }
  return score >= 50; // fixed: "at least 50" means >=
}

// Return the students whose score is below 50.
function getFailedStudents(students) {
  return students.filter((s) => s.score < 50);
}

// Return just the names of the students who failed.
function getFailedNames(students) {
  return getFailedStudents(students).map((s) => s.name);
}

module.exports = { isPassing, getFailedStudents, getFailedNames };
