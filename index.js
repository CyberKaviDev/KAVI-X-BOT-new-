const { spawn } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
require('./server.js');
require('./settings.js')

let p;

function start() {
   let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)];
   console.log([process.argv[0], ...args].join('\n'));

   p = spawn(process.argv[0], args, {
         stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
      })
      .on('message', data => {
         if (data == 'reset') {
            console.log('Restarting Bot...');
            p.kill();
            start();
         }
      })
      .on('exit', code => {
         console.error('Exited with code:', code);
         if (code == '.' || code == 1 || code == 0) {
            start();
         }
      });
}

function restartBot() {
   if (p) {
     p.kill();
     start();
   }
}

start();

if (restart) {
   setInterval(restartBot, 2 * 60 * 60 * 1000);
}
