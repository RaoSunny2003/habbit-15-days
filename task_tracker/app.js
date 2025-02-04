import readline from "readline";
import fs from "fs";
import path from "path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const tasksFilePath = path.join(__dirname, "tasks.json");

function readTasks() {
  if (fs.existsSync(tasksFilePath)) {
    const data = fs.readFileSync(tasksFilePath, "utf8");
    console.log(data);
    return JSON.parse(data);
  }
  return [];
}

function writeTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2), "utf8");
}

console.log(getNextId(readTasks()));

function getNextId(tasks) {
  const ids = tasks.map((task) => task.id);
  ids.sort((a, b) => a - b);
  let nextId = 1;
  for (const id of ids) {
    if (id !== nextId) break;
    nextId += 1;
  }
  console.log(tasks);
  return nextId;
}

function sortTaskArr(tasks) {
  let increase = 1;
  tasks.forEach((task) => {
    task.id = increase;
    increase++;
  });
}

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
  let tasks = readTasks();
  let running = true;

  while (running) {
    const choice = await input(`${colors.cyan}
Enter Number according to What you want to do?
    Task Tracker Menu:
        1. Add Task
        2. Update Task
        3. Delete Task
        4. List Task
        5. Mark as Done
        6. Exit
 ${colors.yellow}Enter your choice: ${colors.reset}`);

    switch (choice) {
      case "1":
        const taskName = await input(
          `${colors.cyan}Enter task name: ${colors.reset}`
        );
        const newTask = {
          id: getNextId(tasks),
          description: taskName,
          markDone: false,
        };
        tasks.push(newTask);
        sortTaskArr(tasks);
        writeTasks(tasks);
        console.log(`${colors.green}Task added!${colors.reset}`);
        break;
      case "2":
        const updateTaskId = await input(
          `${colors.cyan}Enter task Id: ${colors.reset}`
        );
        if (updateTaskId > tasks.length) {
          console.log(`${colors.red}Wrong Input ID !${colors.reset}`);
        } else {
          const newTask = await input(
            `${colors.cyan}Enter updated Task: ${colors.reset}`
          );
          tasks[updateTaskId - 1].description = newTask;
          writeTasks(tasks);
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
          sortTaskArr(tasks);
          writeTasks(tasks);

          console.log(`${colors.green}Task Deleted!${colors.reset}`);
        }
        break;
      case "4":
        if (tasks.length === 0) {
          console.log(`${colors.yellow}No tasks added yet.${colors.reset}`);
        } else {
          colors.yellow, console.log(`${colors.yellow}Tasks:${colors.reset}`);
          tasks.forEach((task) => {
            console.log(
              `${task.id}.${colors.yellow} ${task.description}${colors.reset}`
            );
            console.log(
              task.markDone
                ? `${colors.green}     Done! ${colors.reset}`
                : `${colors.red}     Yet to complete!${colors.reset}`
            );
          });
        }
        break;
      case "5":
        const markId = await input(
          `${colors.cyan} Enter Done Task Id : ${colors.reset}`
        );

        tasks[markId - 1].markDone = true;
        writeTasks(tasks);
        console.log(`${colors.green} Task Marked as Done ${colors.reset}`);
        break;
      case "6":
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
