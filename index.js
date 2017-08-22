#!/usr/bin/env node
var program = require("commander");
var makeFile = require("./lib/makeFile");
var chalk = require("chalk");

console.log(
  chalk.cyan(` 
██████╗  ██████╗ ███████╗███╗   ██╗
██╔══██╗██╔════╝ ██╔════╝████╗  ██║
██████╔╝██║  ███╗█████╗  ██╔██╗ ██║
██╔═══╝ ██║   ██║██╔══╝  ██║╚██╗██║
██║     ╚██████╔╝███████╗██║ ╚████║
╚═╝      ╚═════╝ ╚══════╝╚═╝  ╚═══╝
(c) 2017 - v0.0.1 - https://github.com/cuduy197                         
`)
);

console.log(`
${chalk.bold.green("Guide:")} 
pgen new <name> [other name] -[options: r,p,c]*
pgen remove <name> [other name] -[options: r,p,c]*  

* r : routes , p : pages , c : components 

Example : ${chalk.yellow("pgen new test -r")} | that make new route name 'test'
`);

program.version("0.0.1");
//New
program
  .command("new <name> [listName...]")
  .option("-r, --routes", "Add routes")
  .option("-p, --pages", "Add pages")
  .option("-c, --components", "Add components")
  .option("-d, --delete", "Delete what you want")
  .description("pleace read guide before using!")
  .action((name, listName, option) => {
    option.routes && option.delete && makeFile(name, "remove", "routes");
    option.pages && option.delete && makeFile(name, "remove", "pages");
    option.components && option.delete && makeFile(name, "remove", "components");

    option.routes && !option.delete && makeFile(name, "new", "routes");
    option.pages && !option.delete && makeFile(name, "new", "pages");
    option.components && !option.delete && makeFile(name, "new", "components");

    listName.forEach(nameInList => {
      option.routes && option.delete && makeFile(nameInList, "remove", "routes");
      option.pages && option.delete && makeFile(nameInList, "remove", "pages");
      option.components && option.delete && makeFile(nameInList, "remove", "components");

      option.routes && !option.delete && makeFile(nameInList, "new", "routes");
      option.pages && !option.delete && makeFile(nameInList, "new", "pages");
      option.components && !option.delete && makeFile(nameInList, "new", "components");
    });
  });
//Remove
program
  .command("remove <name> [listName...]")
  .option("-r, --routes", "delete routes")
  .option("-p, --pages", "delete pages")
  .option("-c, --components", "delete components")
  .description("Help you delete what you created!")
  .action((name, listName, option) => {
    option.routes && makeFile(name, "remove", "routes");
    option.pages && makeFile(name, "remove", "pages");
    option.components && makeFile(name, "remove", "components");

    listName.forEach(nameInList => {
      option.routes && option.delete && makeFile(nameInList, "remove", "routes");
      option.pages && option.delete && makeFile(nameInList, "remove", "pages");
      option.components && option.delete && makeFile(nameInList, "remove", "components");
    });
  });

program.parse(process.argv);
