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
              "What is the role of the employee you are adding to your team?",
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
                    message: "What is the name of the manager you are adding?",
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
                    validate:  function validateEmail (input)  {
                        return input.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/) ? true : 'Please enter a valid email'                        
                    }  
                },
                {
                    type: "input",
                    name: "officeNumber",
                    message: "What is his/her office number?",
                    default: "Default: N/A",
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
                    message: "What is the name of the engineer you are adding?",
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
                    validate:  function validateEmail (input)  {
                        return input.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/) ? true : 'Please enter a valid email'                        
                    }
                },
                {
                    type: "input",
                    name: "github",
                    message: "What is his/her GitHub username?",
                    default: "Default: N/A",
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
                    message: "What is the name of the intern you are adding?",
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
                    validate:  function validateEmail (input)  {
                        return input.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/) ? true : 'Please enter a valid email'                        
                    }
                },
                {
                    type: "input",
                    name: "school",
                    message: "What school are they enrolled in?",
                    default: "Default: N/A",
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
        employees.push(newMember);
    }
    else if (answers.github) {
        const newMember = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employees.push(newMember);
    }
    else {
        const newMember = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(newMember);
    }

    if (answers.addAnother === true) {
        newMemberClass()
    }
    else {
        const teamHTML = render(employees)
        fs.writeFileSync(outputPath, teamHTML)
    }

}

newMemberClass()

