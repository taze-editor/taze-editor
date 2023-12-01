## About this repository

This repository is a monorepo.

- We use [yarn](https://yarnpkg.com/en/docs/install) and
  [`workspaces`](https://yarnpkg.com/features/workspaces) for development.
- We use [changesets](https://github.com/changesets/changesets) for managing
  releases.

## Development

### Start by cloning the repository:

```bash
git clone git@github.com:taze-editor/taze-editor.git
```

### Install

```bash
yarn install
```

### Build

```bash
yarn build
```

### Run a workspace

You can use the `yarn workspace <workspace-name>` command to start the
development process for a workspace.

## Documentation

The documentation for this project is located in the `docs` workspace. After
running `yarn build`, you can run the documentation locally by running the
following command:

```bash
yarn docs:start
```

Documentation is written using [MDX](https://mdxjs.com). You can find the
documentation files in the `docs` directory.

## Release Guide

For those wanting a release, follow this sequence:

- Commit your changes:
  - Run **`yarn w:brl`** to synchronize the exports and automatically update the
    index files.
  - Make sure lint and build pass.
- Open a PR against **`main`** and
  **[add a changeset](https://github.com/atlassian/changesets/blob/main/docs/adding-a-changeset.md)**.
- Merge the PR, which will trigger the bot to create a PR release.
- Review the final changesets.
- Merge the PR release, and the bot will release the updated packages on npm.

## Requests for new features

If you have a request for a new feature, please open a discussion on GitHub.
We'll be happy to help you out.

## Issues

If you encounter a problem, please follow these steps:

- Look through our
  **[issue list](https://github.com/taze-editor/taze-editor/issues)** to see if
  the issue already exists.
  - If you find an existing issue that matches yours, please give it a
    "thumbs-up reaction". This helps us prioritize which issues to address
    first!
- If you can't find a match, feel free to create a new issue.

## Pull Requests (PRs)

We welcome all contributions and there are many ways you can help.

### Reviewing PRs

**As a PR submitter**, you should reference the issue if there is one, include a
short description of what you contributed, and provide instructions for manual
testing if it is a code change. If your PR is reviewed as only needing trivial
changes and you have commit access, then you can merge the PR after making those
changes.

**As a PR reviewer**, read through the changes and comment on any potential
problems. Also, follow the testing instructions and manually test the changes.
If the instructions are missing, unclear, or overly complex, request better
instructions from the submitter. Unless the PR is a draft, if you approve the
review and there are no other required discussions or changes, you should also
go ahead and merge the PR.
