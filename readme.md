# *time-tracking* ⏱

Minimalistic command line time tracking.

[![asciicast](https://asciinema.org/a/40145.png)](https://asciinema.org/a/40145)

[![npm version](https://img.shields.io/npm/v/time-tracking.svg)](https://www.npmjs.com/package/time-tracking)
[![build status](https://img.shields.io/travis/derhuerst/time-tracking.svg)](https://travis-ci.org/derhuerst/time-tracking)
[![dependency status](https://img.shields.io/david/derhuerst/time-tracking.svg)](https://david-dm.org/derhuerst/time-tracking)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/time-tracking.svg)](https://david-dm.org/derhuerst/time-tracking#info=devDependencies)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)

*time-tracking* [is ISC-licensed](license.md).



## Installing

```shell
npm install -g time-tracking
```



## Usage

```
track start <name>
track 1 <name>
	Start a new or resume an existing tracker. `name` must be a valid JSON key.
track stop <name>
track 0 <name>
	Stop an existing tracker.

track add <name> <amount>
track + <name> <amount>
	Add any amount of time to an existing tracker.
track subtract <name> <amount>
track - <name> <amount>
	Subtract any amount of time from an existing tracker.

track status <name>
track s <name>
	Show the status of a tracker.
track status
track s
	Show the status of all active trackers.

Options:
	-s, --silent     No output
	-p, --porcelain  Machine-readable output.
```



## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/time-tracking/issues).
