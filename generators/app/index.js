const Generator = require("yeoman-generator");

module.exports = class extends Generator {
    async prompting() {
        let props = await this.prompt([
            {
                name: "projectName",
                type: "input",
                message: "What's the name of your project?",
                validate: (page) => {
                    const isValid = typeof page === "string" && page && page.length >= 3;
                    if (isValid) return true;
                    return "Your project names should be minimum of 3 characters long!";
                },
            },
            {
                name: "shouldInstallDependency",
                type: "confirm",
                message: "Do you want to install the dependency?",
            },
        ]);

        if (props.shouldInstallDependency) {
            const newProps = await this.prompt([
                {
                    name: "packageManager",
                    type: "rawlist",
                    message: "Choose your package manager",
                    choices: ["npm", "yarn"],
                },
            ]);

            props = {
                ...props,
                ...newProps,
            };
        }

        this.props = props;
    }

    writing() {
        const { projectName } = this.props;

        this.fs.copy(this.templatePath("./*"), this.destinationPath("", projectName));

        this.fs.copy(this.templatePath("./src"), this.destinationPath("", `${projectName}/src`));
    }

    install() {
        const { packageManager, shouldInstallDependency } = this.props;

        this.destinationRoot(`${this.props.projectName}`);

        this.spawnCommandSync("git", ["init", "--quiet"]);

        if (shouldInstallDependency) {
            this.installDependencies({
                npm: packageManager === "npm",
                bower: false,
                yarn: packageManager === "yarn",
            });
        }
    }

    end() {
        this.log("Thanks for using Let's roll! 🤟");
    }
};
