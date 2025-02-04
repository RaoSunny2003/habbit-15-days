// import { stdin, stdout } from "process";
// import readline from "readline";
// import fs from "fs";

// const rl = readline.createInterface({
//   input: stdin,
//   output: stdout,
// });

// rl.question("What you need to do? : ", (name) => {
//   console.log(name);
//   fs.appendFile("task_traker.json", `{ name: ${name} }`, function (err) {
//     if (err) throw err;
//     console.log("Saved!");
//   });
//   rl.close();
// });

import readline from "readline";

const rli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
};

function input(prompt) {
  return new Promise((resolve) => {
    rli.question(prompt, (uinput) => {
      resolve(uinput);
    });
  });
}

async function main() {
  // Use async/await for cleaner code
  let tasks = [];
  let running = true;

  while (running) {
    const choice = await input(`${colors.cyan}
Enter Number according to What you want to do?
    Task Tracker Menu:
        1. Add Task
        2. Update Task
        3. Delete Task
        4. List Task
        5. Exit
 ${colors.yellow}Enter your choice: ${colors.reset}`);

    switch (choice) {
      case "1":
        const taskName = await input(
          `${colors.cyan}Enter task name: ${colors.reset}`
        );
        tasks.push(taskName);
        console.log(`${colors.green}Task added!${colors.reset}`);
        break;
      case "2":
        const updateTaskId = await input(
          `${colors.cyan}Enter task Id: ${colors.reset}`
        );
        if (updateTaskId > tasks.length) {
          console.log(typeof updateTaskId);
          console.log(`${colors.red}Wrong Input ID !${colors.reset}`);
        } else {
          const newTask = await input(
            `${colors.cyan}Enter updated Task: ${colors.reset}`
          );
          tasks[updateTaskId - 1] = newTask;
          console.log(
            `${colors.green}Task Updated Successfully...!${colors.reset}`
          );
        }
        break;
      case "3":
        const deleteId = await input(
          `${colors.cyan}Enter Task Id: ${colors.reset}`
        );
        if (deleteId > tasks.length) {
          console.log(`${colors.red}Wrong Input ID !${colors.reset}`);
        } else {
          tasks.splice(deleteId - 1, 1);

          console.log(`${colors.green}Task Deleted!${colors.reset}`);
        }
        break;
      case "4":
        if (tasks.length === 0) {
          console.log(`${colors.yellow}No tasks added yet.${colors.reset}`);
        } else {
          colors.yellow, console.log(`${colors.yellow}Tasks:${colors.reset}`);
          tasks.forEach((task, index) => {
            console.log(`${index + 1}.${colors.yellow} ${task}${colors.reset}`);
          });
        }
        break;
      case "5":
        running = false;
        console.log(`${colors.cyan}Exiting...${colors.reset}`);
        rli.close(); // Important: Close the readline interface
        break;
      default:
        console.log(
          `${colors.red}Invalid choice. Please try again.${colors.reset}`
        );
    }
  }
}

main(); // Call the main function to start the program
