# HandyMan App - college project

## Project Setup
1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install [Node.js](https://nodejs.org/en/download/) (This installation includes npm and chocolatey)
3. Validate installations [see below](#validate-installations)
4. [Clone this repository](https://help.github.com/en/desktop/contributing-to-projects/cloning-a-repository-from-github-desktop) onto your PC
5. Inside the local repository root folder, run `npm install`. This will install the required dependencies of the project.
6. The project is ready to use

## Run project
In the project root folder, run command `npm run dev`

## Validate Installations
1. Open Command Prompt (Windows) or Terminal (Mac)
2. To validate Node.js, run command `node --version`
3. To validate npm, run command `npm --version`

## Git process
1. For this process you need your local environement properly set up If not see Project Setup step.
2. Make sure you have git install to validate open terminal or command promt and type  git --version if not please install [git] (https://git-scm.com/download). For windows you can download [gitbash](https://gitforwindows.org/). It is a linux terminal that you can run on windows. 
3. Now open  Open Command Prompt (Windows) or Terminal (Mac) and change directory to your project. You should be inside your project directory. 
4. Check your branch status by typing `git status`. You should see messaging saying that your on mastser branch and it is upto date. 
5. Before you start your work create a new beanch by running `git checkout -b <branch name>`(for example `git checkout -b feature/login` ).
6. Make your code changes and make sure everything is working as expected. 
7. Run `git status`. You should see files that you have changed. 
8. Run `git add .` This will prepare you files to be commited. 
9. Run `git commit -m '<message>'`. This will commit chnages to your local branch.(e.g. git commit -m "login page added").
10. Run `git push`. you will see te msessage on terminal `git push --set-upstream origin feature/add-git-process`. Simply copy that line and paste it again. Now you have pushed all the changes on Git hub.  
11. Go to github and you should see New pull request button. Click on it and select your branch in compare dropdown. Click Create pull request. 
12. Once Pull request is created you can assign to the team members to review from reviewers dropdown on github. 
If you are in your local branch `feature/login` and you want to switch to an existing branch or a master branch Run `git checkout <branch>`. (e.g. `git checkout features/readme`).

## Contributors
[ibkucher](https://github.com/ibkucher), [Nparekh90](https://github.com/Nparekh90), [AbbyNode](https://github.com/AbbyNode), [emmajsl](https://github.com/emmajsl), [BillyLee96312](https://github.com/BillyLee96312), Helia and Imitaz

