# User guide:

```

3 main branches are managed.

- __master:__
    No changes should be made directly, since it is updated when pulling or pushing to the stage branch

- __stage:__
    The changes tested and ready to be sent to production must be sent to this branch, for their subsequent process of automatic tests, merge into master and creation of the release.

- __develop:__
    Branch where the development version of the project will be managed, normally changes will be sent to stage from this branch.


```

## Release:

```


    The release will be created automatically if changes are sent to stage, either by means of a pull request or a push.

    The release consists of versioning, which consists of the following format

    __Release v0.0.0__

- If you want to increase the last value, you must use the following tag within the commit a stage -> __#patch__

    Current Release = Release v0.0.0
    Release output = Release v0.0.1

- If you want to increase the value of the medium, you must use the following tag within the commit a stage -> __#minor__

    Current Release = Release v0.0.0
    Release output = Release v0.1.0

- If you want to increase the value of the medium, you must use the following tag within the commit a stage -> __#major__

    Current Release = Release v0.0.0
    Release output = Release v1.0.0

By __default__ if a tag is not sent within the commit it will increment the last value, similar to the #patch tag.


```
