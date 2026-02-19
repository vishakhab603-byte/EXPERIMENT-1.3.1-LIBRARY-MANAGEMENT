<!DOCTYPE html>
<html>
<head>
  <title>OOP Person Hierarchy</title>
  <style>
    body {
      font-family: Arial;
      background: linear-gradient(135deg,#0f172a,#1e293b);
      color: white;
      padding: 40px;
    }
    .card {
      background: rgba(255,255,255,0.1);
      padding: 20px;
      border-radius: 15px;
      margin: 10px;
      display: inline-block;
      min-width: 220px;
    }
    .student { border-left: 5px solid #3b82f6; }
    .teacher { border-left: 5px solid #ef4444; }
    .person { border-left: 5px solid #22c55e; }
  </style>
</head>
<body>

<h1>Experiment 3.3 – Person Class Hierarchy</h1>

<div id="output"></div>

<script>

/* Base Class */
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getRole() {
    return "Person";
  }

  getDetails() {
    return `${this.name}, Age: ${this.age}`;
  }
}

/* Student Subclass */
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  getRole() {
    return "Student";
  }

  getDetails() {
    return `${super.getDetails()}, Grade: ${this.grade}`;
  }
}

/* Teacher Subclass */
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  getRole() {
    return "Teacher";
  }

  getDetails() {
    return `${super.getDetails()}, Subject: ${this.subject}`;
  }
}

/* Polymorphism Demo */
const people = [
  new Person("Rahul", 40),
  new Student("Ananya", 20, "A"),
  new Teacher("Mr. Sharma", 45, "Math"),
  new Student("Vishakha", 21, "A+"),
  new Teacher("Dr. Rao", 50, "Computer Science")
];

const container = document.getElementById("output");

people.forEach(person => {
  const div = document.createElement("div");
  div.className = "card " + person.getRole().toLowerCase();
  div.innerHTML = `
    <h3>${person.getRole()}</h3>
    <p>${person.getDetails()}</p>
  `;
  container.appendChild(div);
});

</script>

</body>
</html>
