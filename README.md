# NexLab_Client

Front end nextjs framework for Nexlab website!

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

# Story Point Guidelines (0.5 - 8 Points)

This guide helps define story points based on time and brainpower required for tasks in Jira. The scale ranges from 0.5 (smallest task) to 8 (largest task).

## **0.5 Points: Quick/Easy Tasks**

-   **Time**: Less than 1 hour
-   **Brainpower**: Minimal; mostly mechanical or repetitive
-   **Examples**:
    -   Updating a single line of code (e.g., typo fixes)
    -   Changing a color value in CSS
    -   Adding a minor config change (e.g., updating dependencies)
-   **Ideal Use**: Tasks that require no decision-making and minimal testing.

## **1 Point: Small Tasks**

-   **Time**: 1-2 hours
-   **Brainpower**: Low; straightforward implementation
-   **Examples**:
    -   Adding a new button with predefined styles
    -   Creating a simple helper function
    -   Writing unit tests for a specific function
-   **Ideal Use**: Tasks with clear scope and no dependencies.

## **2 Points: Slightly Larger Tasks**

-   **Time**: 2-4 hours
-   **Brainpower**: Moderate; involves some decision-making or troubleshooting
-   **Examples**:
    -   Implementing a small API call and rendering its data
    -   Adding validation logic for a form field
    -   Writing tests for multiple edge cases
-   **Ideal Use**: Tasks with minor complexity but still self-contained.

## **3 Points: Moderate Tasks**

-   **Time**: 4-6 hours (1 day of work)
-   **Brainpower**: Moderate to High; requires focus and multi-step processes
-   **Examples**:
    -   Building a small component with state management
    -   Fixing a bug in a core system where root cause analysis is required
    -   Adjusting backend API to support a new query parameter
-   **Ideal Use**: Tasks that combine coding and debugging/testing with some risk of unexpected challenges.

## **5 Points: Complex Tasks**

-   **Time**: 1-2 days
-   **Brainpower**: High; requires deep focus and potential collaboration
-   **Examples**:
    -   Refactoring a significant section of code
    -   Building a new feature with multiple states and integrations
    -   Creating a reusable component library item
-   **Ideal Use**: Tasks with multiple moving parts or significant scope requiring iterative feedback.

## **8 Points: Large Tasks**

-   **Time**: 2-4 days (1 sprint max)
-   **Brainpower**: Very High; requires intense focus and/or cross-team coordination
-   **Examples**:
    -   Implementing a new backend service or module
    -   Building a large feature requiring backend, frontend, and state management
    -   Performing a complex migration (e.g., database schema changes)
-   **Ideal Use**: Tasks with high complexity and uncertainty that must be broken down if they seem larger.

## **Additional Guidelines**

-   **Avoid Tasks >8 Points**: Break them down into smaller, achievable tickets.
-   **Consider Uncertainty**: More unknowns = more points.
-   **Think in Complexity, Not Just Time**: A task taking 2 hours but requiring significant problem-solving might rate 2 or 3 points.
