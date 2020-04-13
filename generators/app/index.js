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
            this.destinationPath('', projectName),
        );

        const filesToCopy = [
            {
                source: 'package.json',
                destination: 'package.json',
            },
            {
                source: 'tsconfig.json',
                destination: 'tsconfig.json',
            },
            {
                source: '_editorconfig',
                destination: '.editorconfzig',
            },
            {
                source: '_gitignore',
                destination: '.gitignore',
            }
            ];

        filesToCopy.forEach(({destination, source}) => {
            this.fs.copy(
                this.templatePath(source),
                this.destinationPath('', `${projectName}/${destination}`),
            );
        });
    }
};
