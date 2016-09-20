const DockerMachine = require('docker-machine')

console.log('Syncing VM clocks against pool.ntp.org every 5 minutes')
setInterval(sync, 300000)
sync()

function sync () {
  DockerMachine.list((err, machines) => {
    if (err) return console.error(err)

    machines.forEach(({name, state}) => {
      if (state !== 'running') return

      const machine = new DockerMachine({name})
      const args = ['sudo', 'ntpclient', '-s', '-h', 'pool.ntp.org']

      machine.ssh(args, (err) => {
        if (err) console.error('Failed to sync', name, err)
        console.log(name, 'clock synced')
      })
    })
  })
}
