# `@sepruko/dotdev`

This package contains the source code and content for generating the
[sepruko.dev] website.

# Building

<details>
<summary><code>requirements</code></summary>
<br>

|       name       | version [(?)][npm-semver] | description                                                                 |
| :--------------: | :-----------------------: | :-------------------------------------------------------------------------- |
| [`git`][git-scm] |         `^2.27.0`         | Version control system, allows for cloning this repository to your machine. |
|  [`node`][node]  |        `>=22.11.0`        | ECMAScript runtime with focus on system APIs.                               |
|  [`pnpm`][pnpm]  |         `^9.13.0`         | Faster, more disk-efficient alternative to the `npm` package manager.       |

---

</details>

```sh
# Clone the repository to your machine. You may also use SSH if you have a
# public SSH key on your GitHub account.
git clone https://github.com/sepruko/dotdev.git

# Change directories to 'apps/dotdev' child of the newly-cloned repository.
cd dotdev/apps/dotdev

# Install dependencies (will install them for the workspace).
pnpm i --frozen-lockfile

# Build the project. Check it out in './build/' once it's done!
pnpm run build
```

# Local Development

Following on the steps in the [building section](#building), you may run a
development server that aids in developing the site.

```sh
# Run a live development server, which immediately reflects changes made to the
# source and any content.
pnpm run dev
```

> [!NOTE]\
> If you'd like to preview an example build of the site, you can use
> `pnpm run preview`.

---

_Thanks for reading! Now, go and check out [my website][sepruko.dev]._ ✨🐈‍⬛

<!-- Links -->

[git-scm]: https://git-scm.com/
[node]: https://nodejs.org/
[npm-semver]:
  https://semver.npmjs.com/#syntax-examples
  'version format examples'
[pnpm]: https://pnpm.io/
[sepruko.dev]: https://sepruko.dev/
