// Hero terminal: types out an `oc get pods` style command, then reveals output.
// No external calls — this is a static demo build, all data is inline.

document.addEventListener('DOMContentLoaded', () => {
  const typedLine = document.getElementById('typedLine');
  const termOutput = document.getElementById('termOutput');

  const command = 'oc get pods';
  const output =
    '<span class="head">NAME                     READY   STATUS    RESTARTS   AGE</span>\n' +
    'opsflow-7d9f6b-abcde     1/1     <span class="ok">Running</span>   0          2m\n' +
    'opsflow-7d9f6b-fghij     1/1     <span class="ok">Running</span>   0          2m\n' +
    'opsflow-7d9f6b-klmno     1/1     <span class="ok">Running</span>   0          45s';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    typedLine.textContent = command;
    termOutput.innerHTML = output;
    termOutput.classList.add('show');
    return;
  }

  let i = 0;
  function typeChar() {
    if (i <= command.length) {
      typedLine.textContent = command.slice(0, i);
      i++;
      setTimeout(typeChar, 45);
    } else {
      setTimeout(() => {
        termOutput.innerHTML = output;
        termOutput.classList.add('show');
      }, 350);
    }
  }
  typeChar();
});
