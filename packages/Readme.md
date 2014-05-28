# Packages

This directory contains all the packages ('slots') which could be added
to the main project using igloo command line (on generation or after
generation)

(use ./bin/igloo instead of 'igloo' for debugging, if you're writing
packages for Igloo)

### Create Project

```bash
$ igloo create ~/myapp
```

Or create the app with packages preinstalled:

```bash
$ igloo create ~/myapp helmet gulp
$ igloo add helmet
$ npm i
```
Make sure to follow the notes displayed by packages.

### Add Packages

First you need to set your working directory to package directory you've
just created.

```bash
$ cd ~/myapp
$ igloo add helmet
$ npm i
```

### Remove Packages

Same as adding packages, the working directory has to be set.

```bash
$ cd ~/myapp
$ igloo remove helmet
```

You'll need to check main 'package.json' after removing a package, Igloo
doesn't remove dependencies there since they could be used by other
packages you've added (manually) later.

Remove command will display a list of dependencies added by the package that
you need to remove manually.

In addition to that, you'll need to go through the directories created by
the package. Igloo package manager removes files mentioned in installation
file, but it doesn't remove created directories or files created by the
installed packages (for example, the files Gulp generated in assets/public/build)



