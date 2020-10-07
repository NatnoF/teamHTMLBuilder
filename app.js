const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { parse } = require("path");

const teamMembers = [];
const idArray = [];

function mainMenu()
{
    function createManager()
    {
        console.log("Please Build your team");
        inquirer.prompt
        ([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                validate: answer =>
                {
                    if (answer !== "" && typeof(answer) == "string" && !(answer <= 0) && !(answer >= 0))
                    {
                        return true;
                    }
                    return "Please enter a name";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's ID number?",
                validate: answer =>
                {
                    if (answer !== "" && parseFloat(answer) > 0)
                    {
                        return true;
                    }
                    return "Please enter an ID number";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email address?",
                validate: answer =>
                {
                    if (answer !== "" && answer.includes("@") && answer.includes(".com"))
                    {
                        return true;
                    }
                    return "Please enter an email address";
                }
            },
            {
                type: "input",
                name: "managerOffice",
                message: "What is your manager's office number?",
                validate: answer =>
                {
                    if (answer !== "" && parseFloat(answer) > 0)
                    {
                        return true;
                    }
                    return "Please enter an office number";
                }
            }
        ]).then(answer =>
        {
            // Creating Manager
            const manager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.managerOffice);
            teamMembers.push(manager);
            idArray.push(answer.managerId);

            createTeamMember();
        });
    }
    createManager();

    function createTeamMember()
    {
        inquirer.prompt
        ([
            {
                type: "list",
                name: "teamChoice",
                message: "Do you want to add another team member?",
                choices:
                [
                    "Engineer",
                    "Intern",
                    "Nope, my team's all done!"
                ]
            }
        ]).then(answer =>
        {
            // Creating Manager
            switch (answer.teamChoice)
            {
                case "Engineer":
                    return createEngineer();

                case "Intern":
                    return createIntern();

                default:
                    return renderHTML();
            }
        });
    }

    function createEngineer()
    {
        inquirer.prompt
        ([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                validate: answer =>
                {
                    if (answer !== "" && typeof(answer) == "string" && !(answer <= 0) && !(answer >= 0))
                    {
                        return true;
                    }
                    return "Please enter a name";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's ID number?",
                validate: answer =>
                {
                    if (answer !== "" && parseFloat(answer) > 0 && !(idArray.includes(answer)))
                    {
                        return true;
                    }
                    else if (idArray.includes(answer))
                    {
                        return "This ID is taken, please give another";
                    }
                    return "Please enter an ID number";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email address?",
                validate: answer =>
                {
                    if (answer !== "" && answer.includes("@") && answer.includes(".com"))
                    {
                        return true;
                    }
                    return "Please enter an email address";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's github username?",
                validate: answer =>
                {
                    if (answer !== "" && typeof(answer) == "string" && !(answer <= 0) && !(answer >= 0))
                    {
                        return true;
                    }
                    return "Please enter a github username";
                }
            }
        ]).then(answer =>
        {
            // Creating Manager
            const engineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answer.engineerId);

            createTeamMember();
        });
    }

    function createIntern()
    {
        inquirer.prompt
        ([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                validate: answer =>
                {
                    if (answer !== "" && typeof(answer) == "string" && !(answer <= 0) && !(answer >= 0))
                    {
                        return true;
                    }
                    return "Please enter a name";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's ID number?",
                validate: answer =>
                {
                    if (answer !== "" && parseFloat(answer) > 0 && !(idArray.includes(answer)))
                    {
                        return true;
                    }
                    else if (idArray.includes(answer))
                    {
                        return "This ID is taken, please give another";
                    }
                    return "Please enter an ID number";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email address?",
                validate: answer =>
                {
                    if (answer !== "" && answer.includes("@") && answer.includes(".com"))
                    {
                        return true;
                    }
                    return "Please enter an email address";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What school is your intern attending?",
                validate: answer =>
                {
                    if (answer !== "" && typeof(answer) == "string" && !(answer <= 0) && !(answer >= 0))
                    {
                        return true;
                    }
                    return "Please enter a school";
                }
            }
        ]).then(answer =>
        {
            // Creating Manager
            const intern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.internSchool);
            teamMembers.push(intern);
            idArray.push(answer.internId);

            createTeamMember();
        });
    }

    function renderHTML()
    {
        if (!fs.existsSync("./output"))
        {
            fs.mkdirSync("./output");
        }
        fs.writeFile(outputPath, render(teamMembers), err =>
        {
            if (err)
            {
                throw err;
            }
            else
            {
                console.log("File was rendered");
            }
        });
    }
}

mainMenu();
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
