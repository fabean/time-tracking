#!/usr/bin/env node
'use strict'

const chalk = require('chalk')
const lPad =  require('left-pad')
const rPad =  require('right-pad')
const ms =    require('ms')
const yargs = require('yargs')
const co =    require('roads-coroutine')

const track = require('../src/index')()





const figures = {
	started:  chalk.green('\u25b6'),
	stopped:  chalk.red('\u25a0'),
	error:    chalk.red('!')
}

const showError = (err) => process.stderr.write([
	figures.error, err.message
].join(' ') + '\n')



const start = co(function* (name, options) {
	debugger
	if (!options) options = {}
	if (!name) {
		process.stderr.write('Missing `name` argument.')
		return process.exit(1)
	}

	let result = yield track.start(name)
	if (result instanceof Error) return showError(result)
	if (options.silent) return

	process.stdout.write([
		figures.started,
		chalk.underline(name),
		chalk.gray(result.isNew ? 'started' :
			(result.wasRunning ? 'already running' : 'resumed')
		)
	].join(' ') + '\n')
})



const stop = co(function* (name, options) {
	debugger
	if (!options) options = {}
	if (!name) {
		process.stderr.write('Missing `name` argument.')
		return process.exit(1)
	}

	return track.stop(name)
	if (result instanceof Error) return showError(result)
	if (options.silent) return

	process.stdout.write([
		figures.stopped,
		chalk.underline(name),
		chalk.gray('stopped')
	].join(' ') + '\n')
})



const add = co(function* (name, amount, options) {
	debugger
	if (!options) options = {}
	if (!name) {
		process.stderr.write('Missing `name` argument.')
		return process.exit(1)
	}
	if (!amount) {
		process.stderr.write('Missing `amount` argument.')
		return process.exit(1)
	}
	amount = ms(amount)

	let result = yield track.add(name, amount)
	if (result instanceof Error) return showError(result)
	if (options.silent) return

	process.stdout.write([
		chalk.gray('added'),
		ms(amount),
		chalk.gray('to'),
		chalk.underline(name)
	].join(' ') + '\n')
})



const subtract = co(function* (name, amount, options) {
	debugger
	if (!options) options = {}
	if (!name) {
		process.stderr.write('Missing `name` argument.')
		return process.exit(1)
	}
	if (!amount) {
		process.stderr.write('Missing `amount` argument.')
		return process.exit(1)
	}

	amount = ms(amount)
	track.subtract(name, amount)
	if (result instanceof Error) return showError(result)
	if (options.silent) return

	process.stdout.write([
		chalk.gray('subtracted'),
		ms(amount),
		chalk.gray('from'),
		chalk.underline(name)
	].join(' ') + '\n')
})



const statusOfTask = (tracker) => {
	let elapsed = tracker.started ? Date.now() - tracker.started : 0
	let output = [
		lPad(chalk.underline(tracker.name), 25),
		rPad(chalk.cyan(ms(tracker.value + elapsed)), 15)
	]
	if (tracker.started) output.push(figures.started, ms(elapsed))
	return output.join(' ')
}

const status = co(function* (name, options) {
	debugger
	if (!options) options = {}
	let trackers = yield track.read(name)
	if (trackers instanceof Error) return showError(trackers)
	if (options.silent) return

	if (Object.keys(trackers).length === 0) {
		process.stdout.write(chalk.gray('no trackers\n'))
		return process.exit(1)
	}

	for (name in trackers)
		process.stdout.write(statusOfTask(trackers[name]) + '\n')
})



const help = [
	chalk.yellow('track start <name>'),
	chalk.yellow('track - <name>'),
	'  Start a new or resume an existing tracker. `name` must be a valid JSON key.',
	chalk.yellow('track stop <name>'),
	chalk.yellow('track . <name>'),
	'  Stop an existing tracker.',
	'',
	chalk.yellow('track add <name> <amount>'),
	chalk.yellow('track + <name> <amount>'),
	'  Add any amount of time to an existing tracker.',
	chalk.yellow('track subtract <name> <amount>'),
	chalk.yellow('track - <name> <amount>'),
	'  Subtract any amount of time from an existing tracker.',
	'',
	chalk.yellow('track status <name>'),
	chalk.yellow('track s <name>'),
	'  Show the status of a tracker.',
	chalk.yellow('track status'),
	chalk.yellow('track s'),
	'  Show the status of all active trackers.',
	'',
	chalk.yellow('Options:'),
	'  -s, --silent   No output',
	'  -p, --porcelain  Machine-readable output.'
].join('\n') + '\n'

const argv = yargs.argv
const options = {
	silent:    argv.silent || argv.s || false,
	porcelain: argv.porcelain || argv.p || false
}

debugger
switch (argv._[0]) {
	case 'start':
	case '-':
		start(argv._[1], options)
		break
	case 'stop':
	case '.':
		stop(argv._[1], options)
		break
	case 'add':
	case '+':
		add(argv._[1], argv._[2], options)
		break
	case 'subtract':
	case '-':
		subtract(argv._[1], argv._[2], options)
		break
	case 'status':
	case 's':
		status(argv._[1], options)
		break
	default:
		if (argv.help || argv.h) process.stdout.write(help)
		else process.stderr.write('invalid command\n')
		break
}
// end
debugger
