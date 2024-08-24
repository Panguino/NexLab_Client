# NexLab_Client

## GIT Workflow

-   Create new branch

    -   `git checkout -b [branch name]`
    -   branch name should follow pattern:
        -   `feature/NXL-[Monday ID]-[name]`
        -   `issue/NXL-[Monday ID]-[name]`
    -   reference the Monday ID number in the branch name
    -   name is 3-4 word description of feature using `-`s as spaces

-   Commit often to this branch locally

    -   `git commit -m "commit description"`

-   Sync changes to remote

    -   `git push`

-   Once done with feature/issue locally and ready to merge to main code
    -   Lint your code
        -   `npm run lint`
    -   Verify any local GraphQL changes
        -   `npm run codegen` (if there are errors, fix them, you can use `npm run watch` to watch for changes)
    -   Create pull request
        -   browse to repo's pull requests page
            -   https://github.com/Panguino/NexLab_Client/pulls
        -   find your branch and click `New pull request` next to it
        -   Include Monday Item ID number in the pull request template

---
