const Machine = require('docker-machine')

console.log('Syncing VM clocks against pool.ntp.org roughly every 5 minutes')
setInterval(sync, 300000)
sync()

function sync () {
  Machine.list({timeout: 30}, (err, machines) => {
    if (err) return console.error(err)

    machines.forEach(({name, state}) => {
      if (state !== 'running') return

      const machine = new Machine({name})
      const args = ['sudo', 'ntpclient', '-s', '-h', 'pool.ntp.org']

      // Uniformly distribute the calls across 2.5 mins, so as to not overload a
      // VirtualBox setup with 10+ machines
      setTimeout(() =>
        machine.ssh(args, (err) => {
          if (err) return console.error('Failed to sync', name, err)
          console.log(name, 'clock synced')
        })
      , Math.random() * 150000)
    })
  })
}
