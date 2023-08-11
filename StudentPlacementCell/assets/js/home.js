$("#tabs>*").click(function (e) {
  if (e.target.innerText == "Students") {
    $("#interview-tab").removeClass("active");
    $("#student-tab").addClass("active");
    $("#interview-display").addClass("hidden");
    $("#student-display").removeClass("hidden");
  } else {
    $("#student-tab").removeClass("active");
    $("#interview-tab").addClass("active");
    $("#student-display").addClass("hidden");
    $("#interview-display").removeClass("hidden");
  }
});

let hideParent = function (el) {
  el.click(function (e) {
    let target = $(e.target);
    let parent = target.parent();
    parent.addClass("hidden");
  });
};

let showAllocatedStudents = function (e) {
  let target = $(e.target);
  if (!target.hasClass("interview-list-item")) {
    target = target.parent();
    if (!target.hasClass("interview-list-item")) {
      target = target.parent();
    }
  }
  let interviewStudents = target.siblings(".students-allocation");
  let hideButton = $(" .hide-display", interviewStudents);
  interviewStudents.removeClass("hidden");
  hideParent(hideButton);
};

let addStudent = function () {
  let studentForm = $("#student-form");
  studentForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/students/add",
      data: studentForm.serialize(),
      success: function (data) {
        let studentsList = $("#students-list");
        let newStudent = newStudentDom(data.data.student);
        studentsList.prepend(newStudent);
      },
      error: function (err) {
        console.log(err.responseText);
        // notification("error", "Student couldnt be added");
      },
    });
    e.target.reset();
  });
};

let addInterview = function () {
  let interviewForm = $("#interview-form");
  interviewForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/interviews/add",
      data: interviewForm.serialize(),
      success: function (data) {
        console.log(data);
        let interviewList = $("#interviews-list");
        let newInterview = newInterviewDom(
          data.data.interview,
          data.data.students
        );
        interviewList.prepend(newInterview);
        newInterview.click(showAllocatedStudents);
        allocateStudent($(" .student-allocation-form", newInterview));
      },
      error: function (err) {
        console.log(err.responseText);
        // notification("error", "Interview couldnt be added");
      },
    });
    e.target.reset();
  });
};

let allocateStudent = function (allocateStudentForm) {
  allocateStudentForm.submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/interviews/allocate-student",
      data: allocateStudentForm.serialize(),
      success: function (data) {
        console.log(data);
        let studentsList = allocateStudentForm.siblings("#students-list");
        let newStudent = newAllocatedStudentDom(data.data.student);
        studentsList.prepend(newStudent);
      },
      error: function (err) {
        console.log(err.responseText);
        // notification("error", "Student couldnt be allocated to the interview");
      },
    });
  });
};

let newStudentDom = function (student) {
  return $(`<li>
    <div id="${student._id}" class="student-list-item">
        <div class="student-info">
          <h3>Student Information</h3>
            <div class="student-name">Name : <span>${student.name}</span></div>
            <div class="student-name">Email : <span>${
              student.email
            }</span></div>
            <div class="student-college">College : <span>${
              student.college
            }</span></div>
        </div>
        <div class="student-batch"><h3>Student Batch</h3> <div>${
          student.batch
        }</div></div>
        <div class="student-course-info">
          <h3>Student Course Marks</h3>
            <div class="score-dsa">DSA Module Score : <span>${
              student.DSA_score
            }</span></div>
            <div class="score-webd">WebDev Module Score : <span>${
              student.webD_score
            }</span></div>
            <div class="score-react">React Module Score : <span>${
              student.react_score
            }</span></div>
        </div>
        <div>
          <h3>Student Status</h3>
          <form class="student-status">
            <span><label for="not_placed_${
              student._id
            }">Not Placed</label><input type="radio" id="not_placed_${
    student._id
  }" ${
    student.status == "not_placed" ? "checked" : ""
  } value="not_placed" name="status"></span>
            <span><label for="placed_${
              student._id
            }">Placed</label><input id="placed_${student._id}" type="radio" ${
    student.status == "placed" ? "checked" : ""
  } value="placed" name="status"></span>
            <button type="submit">Update</button>
          </form>
        </div>
    </div>
    </li>`);
};

let newAllocatedStudentDom = function (student) {
  return $(`<li>
    <div id="${student._id}" class="student-list-item">
        <div class="student-info">
          <h3>Student Information</h3>
            <div class="student-name">Name : <span>${student.name}</span></div>
            <div class="student-name">Email : <span>${student.email}</span></div>
            <div class="student-college">College : <span>${student.college}</span></div>
        </div>
        <div class="student-batch"><h3>Student Batch</h3> <div>${student.batch}</div></div>
        <div class="student-course-info">
          <h3>Student Course Marks</h3>
            <div class="score-dsa">DSA Module Score : <span>${student.DSA_score}</span></div>
            <div class="score-webd">WebDev Module Score : <span>${student.webD_score}</span></div>
            <div class="score-react">React Module Score : <span>${student.react_score}</span></div>
        </div>
        <div>
          <h3>Interview Result</h3>
          <form  class="interview-result">
            <select name="result">
              <option value="On-hold">On-hold</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
              <option value="Did not Attempt">Did not Attempt</option>
            </select>
            <button type="submit">Update</button>
          </form>
        </div>
    </div>
    </li>`);
};

let studentOptionDom = function (student) {
  return `
    <option value="${student._id}">${student.name}</option>
  `;
};

let newInterviewDom = function (interview, students) {
  return $(`<li>
        <div id="${interview._id}" class="interview-list-item">
            <div class="student-batch"><h3>Company Name</h3> <div>${
              interview.company
            }</div></div>
            <div class="student-batch"><h3>Interview Date</h3> <div>${
              interview.date
            }</div></div>
        </div>
        <div class="hidden students-allocation">
          <form class="student-allocation-form">
            Student's name : 
            <select name="student_id">
              ${students.map(studentOptionDom)}
            </select>
            <input type="hidden" name="interview_id" value="${interview._id}" />
            <button type="submit">Allocate student</button>
          </form>
          <ol id="students-list">
          </ol>
          <br/>
          <button class="hide-display">Hide</button>
        </div>
    </li>`);
};

addStudent();
addInterview();

for (let allocationForm of $(".student-allocation-form")) {
  allocateStudent($(allocationForm));
}

$(".interview-list-item").click(showAllocatedStudents);
