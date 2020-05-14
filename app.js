const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


function promptUser() {
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message:
              "What is the role of the employee you are adding?",
            choices: ["Manager", "Engineer", "Intern"],
          },
    ]);
}

async function teamMemberInfo() {
    try {

        const teamRole = await promptUser();
    
        if (teamRole.role === "Manager") {
            
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is the name of the manager you are adding to your team?",
                },
                {
                    type: "input",
                    name: "id",
                    message: "What is their ID number?",
                },
                {
                    type: "input",
                    name: "email",
                    message: "What is his/her email address?",
                },
                {
                    type: "input",
                    name: "officeNumber",
                    message: "What is his/her office number?",
                    default: "Office number not available"
                },
                {
                    type: "confirm",
                    name: "addAnother",
                    message: "Do you have another team member to add?",
                },
            ]);
        }
        else if (teamRole.role === "Engineer") {
            
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is the name of the engineer you are adding to your team?",
                },
                {
                    type: "input",
                    name: "id",
                    message: "What is their ID number?",
                },
                {
                    type: "input",
                    name: "email",
                    message: "What is his/her email address?",
                },
                {
                    type: "input",
                    name: "github",
                    message: "What is his/her GitHub username?",
                    default: "GitHub username not available"
                },
                {
                    type: "confirm",
                    name: "addAnother",
                    message: "Do you have another team member to add?",
                },
            ]);
        }
        else {
            
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is the name of the intern you are adding to your team?",
                },
                {
                    type: "input",
                    name: "id",
                    message: "What is their ID number?",
                },
                {
                    type: "input",
                    name: "email",
                    message: "What is his/her email address?",
                },
                {
                    type: "input",
                    name: "school",
                    message: "What school are they enrolled in?",
                    default: "School name not available"
                },
                {
                    type: "confirm",
                    name: "addAnother",
                    message: "Do you have another team member to add?",
                },
            ]);
        }
       
    } 
    catch (err) {
        console.log(err);
    }  
}

async function newMemberClass() {

    

    const answers = await teamMemberInfo()

    if (answers.officeNumber) {
        const newMember = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(newMember)
    }
    else if (answers.github) {
        const newMember = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employees.push(newMember)
    }
    else {
        const newMember = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(newMember)
    }

    console.log(employees)

    if (answers.addAnother === true) {
        newMemberClass()
    }
    else {
        render(employees)
        console.log("done")
    }

}


newMemberClass()

// promptUser()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
