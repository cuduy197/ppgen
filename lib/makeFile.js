const fs = require("fs-extra");
const ora = require("ora");
const chalk = require("chalk");
const path = require("path");
const Handlebars = require("handlebars");

const log = console.log;

let indexPath = process.cwd();

module.exports = function(name, mode, type) {
  let srcType = type;

  let nameAndTyePath = indexPath + "\\src\\" + srcType + "\\" + name;

  fs.mkdir(indexPath + "\\src\\" + srcType, err => undefined);

  if (mode === "new") {
    fs.mkdir(nameAndTyePath, err => {
      if (err) {
        //console.log(err);
        err.code === "ENOENT" && fs.mkdirSync(indexPath + "\\src\\" + srcType);
        if (err.code === "EEXIST") {
          console.log(chalk.red("Duplicated name!, pleace choose other name, or delete  "));
          process.exit();
        }
      }
    });

    Handlebars.registerHelper("toLowerCase", function(str) {
      return str.toLowerCase();
    });

    let makeFile = () => {
      const index_js_source = `import style from "./style";
@inject("user")
@observer
export default class {{name}} extends Component {
  render() {
    let user = this.props.user;
    return (
      <div className={ style.{{ toLowerCase name }} }>
        <h1>{{name}}</h1>
      </div>
    );
  }
}`;
      let index_js_template = Handlebars.compile(index_js_source);
      let index_js_contents = index_js_template({ name });
      let index_js_src = `${indexPath}\\src\\${srcType}\\${name}\\index.jsx`;

      let index_css_source = `.${name.toLowerCase()} {
  padding: 56px 20px;
  min-height: 100%;
  width: 100%;
  text-align: center;
}`;

      let index_css_template = Handlebars.compile(index_css_source);
      let index_css_contents = index_css_template({ name });
      let index_css_src = `${indexPath}\\src\\${srcType}\\${name}\\style.css`;

      let writeFile = (src, content) =>
        fs.writeFile(src, content, err => {
          if (err) {
            err.code === "ENOENT" && console.log(chalk.red(`Make folder '${srcType}' in 'src', then try again ⚠️!`));
            process.exit();
          }
          log(chalk.green(`✅ Created file : ${chalk.blue(src)}`));
        });

      writeFile(index_js_src, index_js_contents);
      writeFile(index_css_src, index_css_contents);
    };
    makeFile(); //run makeFile
  } //end make file and folder

  //delelte mode
  if (mode === "remove") {
    fs.remove(nameAndTyePath, err => {
      if (err) {
        console.log(err);
        process.exit();
      }
      log(chalk.yellow(`${indexPath}\\${srcType}\\${name}`) + chalk.green(" Removed ✅"));
    });
  }
};
