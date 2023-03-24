# Usage

To use the Hacker Plus theme:

*(Assuming that you have VS Code and python already installed)*

1. Click on 'Use this template'. Then fill in the asked details. This repo contains the basic structure, useful snippets for markdown in VS Code and a Gemfile in case you want to build and test the site locally
2. Enable GitHub Pages in your repository
3. Clone the repo locally
4. **[IMPORTANT\*] Run `git submodule add https://github.com/CaptainIRS/hacker-plus-scripts scripts` to get the required python scripts**
4. Fill in in the desired fields the `_config.yml` file and push the commits to have a working site
5. To get started, follow the instructions below(in VS Code):

\* => *GitHub for some reason removes the submodule link when you use the template (Possibly a bug)*

Writing CTF Writeups:

1. Open a new terminal window in VS Code and run `cd scripts`
2. Run `python writeup_gen.py` and fill in the details. The script would generate the required writeup files and asset directory for the CTF and open the required files in VS Code for editing
3. Write the writeups in markdown and push the commits to your repo

Writing Codechef Problem Solutions:

1. Open a new terminal window in VS Code and run `cd scripts`
2. Run `python codechef_gen.py` and fill in the details. The script would generate the required solution files and open them in VS Code for editing
3. Write the solutions in markdown and push the commits to your repo
