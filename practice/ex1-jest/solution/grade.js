// Requirement: pass if score is at least 50; score must be 0-100.
function isPassing(score) {
  if (score < 0 || score > 100) {
    throw new RangeError("Score must be between 0 and 100");
  }
  return score >= 50; // fixed: "at least 50" means >=
}

function getFailedStudents(students) {
  return students.filter((s) => s.score < 50);
}

function getFailedNames(students) {
  return getFailedStudents(students).map((s) => s.name);
}

module.exports = { isPassing, getFailedStudents, getFailedNames };
