const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "assets/csv/record.csv",
  header: [
    {
      id: "student._id",
      title: "Student ID",
    },
    {
      id: "student.name",
      title: "Student Name",
    },
    {
      id: "student.college",
      title: "Student College",
    },
    {
      id: "student.batch",
      title: "Student Batch",
    },
    {
      id: "student.DSA_score",
      title: "DSA Score",
    },
    {
      id: "student.webD_score",
      title: "Web-Dev Score",
    },
    {
      id: "student.react_score",
      title: "React Score",
    },
    {
      id: "student.status",
      title: "Student Status",
    },
    {
      id: "interview.company",
      title: "Interviewed Company",
    },
    {
      id: "interview.date",
      title: "Interview Date",
    },
    {
      id: "result",
      title: "Result",
    },
  ],
  headerIdDelimiter: ".",
});

module.exports = csvWriter;
