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
    const choice = await input(`
Enter Number according to What you want to do?
    Task Tracker Menu:
        1. Add Task
        2. Update Task
        3. Delete Task
        4. List Task
        5. Exit
Enter your choice: `);

    switch (choice) {
      case "1":
        const taskName = await input("Enter task name: ");
        tasks.push(taskName);
        console.log("Task added!");
        break;
      case "2":
        const updateTaskId = await input("Enter task Id: ");
        if (updateTaskId > tasks.length) {
          console.log(typeof updateTaskId);
          console.log("Wrong Input ID !");
        } else {
          const newTask = await input("Enter updated Task: ");
          tasks[updateTaskId - 1] = newTask;
          console.log("Task Updated Successfully...!");
        }
        break;
      case "3":
        const deleteId = await input("Enter Task Id: ");
        if (deleteId > tasks.length) {
          console.log("Wrong Input ID !");
        } else {
          tasks.splice(deleteId - 1, 1);

          console.log("Task Deleted!");
        }
        break;
      case "4":
        if (tasks.length === 0) {
          console.log("No tasks added yet.");
        } else {
          console.log("Tasks:");
          tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
          });
        }
        break;
      case "5":
        running = false;
        console.log("Exiting...");
        rli.close(); // Important: Close the readline interface
        break;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

main(); // Call the main function to start the program
