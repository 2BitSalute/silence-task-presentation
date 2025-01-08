# Silence Task Presentation

Published on Visual Studio Marketplace:
- https://marketplace.visualstudio.com/items?itemName=2BitSalute.silence-task-presentation

This extension contains one command:
- `Silence task presentation in tasks.json`

This command, when invoked on an active `.vscode/tasks.json`, will ensure that all the tasks have their presentation settings set to:

``` json
"presentation": {
    "reveal": "silent",
    "close": true
}
```

- `close`/`true`: the terminal the task runs in is closed when the task exits
- `reveal`/`silent`: The terminal panel is brought to front only if the output is not scanned for errors and warnings

These settings ensure that, when you run the tasks, the terminal does not launch a to show the task output.

Other presentation settings are documented here:

https://code.visualstudio.com/docs/editor/tasks#_output-behavior

## Features

The one command.

## Requirements

None

## Extension Settings

None yet

## TODO
- Add settings

## Release Notes

See the CHANGELOG.md
