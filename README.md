# Tangerine_Fit

## Git
When you first start working on the project:
`git status`

if it says
```
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
```

You know from `our branch is up to date with 'origin/master'.` that nobody else has made any changes since you last "pulled", and you have nothing new to commit. 

From `nothing to commit, working tree clean`, you know that you haven't made anything that needs to be committed.

After you've ensured that your working tree is clean, do a `git pull` to retrieve the latest version of the project from the remote repository, known as `origin`. 

After you work for a while, stage your changes by typing `git add .`. 
To commit your changes, write `git commit -m "changes you made"`.

After you've committed your changes, type `git pull` to syncronize your changes with any new changes that another team member may have pushed since you started working. This will only cause an issue if you both edited the same file. 

When you've verified there's no conflict with the latest iteration of your local repository and the latest iteration of the remote repository, type `git push` to update your changes to the remote repository. 

