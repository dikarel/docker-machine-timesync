# docker-machine-timesync

Prevent clock drift by periodically syncing [docker-machine](https://docs.docker.com/machine/)
VM clocks

[![Build Status](https://travis-ci.org/dikarel/docker-machine-timesync.svg?branch=master)](https://travis-ci.org/dikarel/docker-machine-timesync)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

### Quickstart

Step 1: Install it

    $ npm install -g docker-machine-timesync

Step 2: Run it

    $ docker-machine-timesync
    Syncing VM clocks against pool.ntp.org every 5 minutes
    default clock synced
    agent-1 clock synced
    agent-2 clock synced

### Why should I use this?

You will need accurate clocks on your machines to do any of the following:

- Time-based security features (e.g. [TOTP](https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm),
  expiring secret URLs)
- 2-way data synchronization
- Audit trails

If you are running [docker-machine](https://docs.docker.com/machine/) and do not
sync your VM clocks, they will eventually [start to drift](https://google.com/search?q=docker-machine%20clock%20drift).
As of right now, the best solution is to SSH into each machine and [sync the clocks yourself](http://stackoverflow.com/questions/22800624/will-docker-container-auto-sync-time-with-the-host-machine).
This tool will do it automatically for you.

License: MIT
