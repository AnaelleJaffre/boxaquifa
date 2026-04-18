import './style.scss'
import javascriptLogo from './assets/etoile.png'
import viteLogo from './assets/etoile.png'
import heroImg from '../public/patate.png'
import { setupCounter } from './counter.js'

document.querySelector('#app').innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
  </div>
  <div>
    <h1>Do not enough get started</h1>
    <p>Start <code>here</code> to play with this young lady who's name is Gwendolyn.</p>
  </div>
  <button id="counter" type="button" class="counter"></button>
  <p>PS: what a shame!</p>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <h2>Documentation</h2>
    <p>If u have question, Gwendo answers it</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src=${viteLogo} alt="" />
          You do u do xplor Vite?
        </a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img class="button-icon" src="${javascriptLogo}" alt="">
          Don't learn more
        </a>
      </li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`

setupCounter(document.querySelector('#counter'))
