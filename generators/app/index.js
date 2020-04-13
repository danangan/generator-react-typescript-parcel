const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    async prompting() {
        this.props = await this.prompt([
            {
                name: 'projectName',
                type: 'input',
                message: "What's the name of your project?",
                validate: (page) => {
                    const isValid = typeof page === 'string' && page && page.length >= 3;
                    if (isValid) return true;
                    return 'Your project names should be minimum of 3 characters long!';
                },
            }
            ]);
    }

    writing() {
        const { projectName } = this.props;

        this.fs.copy(
            this.templatePath('src'),
            this.destinationPath('src', folderName),
        );

        const filesToCopy = [
            {
                destination: 'package.json',
                source: 'package.json',
            },
            {
                destination: 'tsconfig.json',
                source: 'tsconfig.json',
            },
            {
                destination: '_editorconfig',
                source: '.editorconfig',
            },
            {
                destination: '_gitignore',
                source: '.gitignore',
            }
            ];

        filesToCopy.forEach(({destination, source}) => {
            this.fs.copy(
                this.templatePath(source),
                this.destinationPath(destination, projectName),
            );
        });
    }
};
