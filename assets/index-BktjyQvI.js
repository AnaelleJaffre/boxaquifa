(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGHaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49J++7vycgaWQ9J1c1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCc/Pg0KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyI+PHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj48cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0idXVpZDpmYWY1YmRkNS1iYTNkLTExZGEtYWQzMS1kMzNkNzUxODJmMWIiIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj48dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPjwvcmRmOkRlc2NyaXB0aW9uPjwvcmRmOlJERj48L3g6eG1wbWV0YT4NCjw/eHBhY2tldCBlbmQ9J3cnPz4slJgLAAADEklEQVR4Xu2awXHyMBCFn/8CONIC9+AZl0QHSQ2hg5TEDOSeFnJ0A/4vElk/VrJkC8mAvhlPkLDF7tPuSogAlUolM3sAA/0tRsMdGRi4o5AdAIB/3PFqrEGAljueHZv79no5pPO1CBpK2AGspAagdBTk5FOEvnytRcXTMSp+Xz+/XAuKkDMFzuK1tvQVSYOcAlz5+vm1YkghpEDZyCWAOrtCCIt63z3JJYAv/ItHgQbv1h758kaVawMycMeD4/LTmQIcpk+LUxnDG4CLbQynzfjdCZqul812OG2cOS7vjf0cS9P1rVJHWukD44oAy7dsNF3vzSeJMeaKz3mGnw1hjvMIEACUDpcIEXyVX2P2ajDXeQQKcKFKemm6/ijaN/AMhsw+38NjuDATwuMHOY9AAWBSQYrw3nS9z8jY2bdERYFxnh0Ndh4RAsCIwM6cWQRu88z6iLlXcX5vinqw84gUAGbwBoBMATZ67uwH43B+VLBDiRXA8iFFsDVhyewLbsaVpHQeZjaX4Nsxetd9H9r+wVHpFzmPBAJoFRhYsJnBXyTJcXnWbd8i57EgBSxaTQD+QnUWSuSw820K55FAAMsHd0RumjRuRJ1b6X0sTQGJrx4ch9PmnTtdKIUOset7KPcSQHMAU4VRyX0mpb1J2YsDiGE4bexBBB9ODADehtNmkJfvXmqvFmnkXnGQfwO4iqC8dx0nx9F5qpC6Guda/hx5rdHKw9LDbnsEYOvH0VFwZ5NNAEyLMHJccthtZTNpMUyxDAYtdWZb6zPcF+JR3xJjSCGA98tP0/Wt2dpqy6Bc6y+H3RaH3fZmDBMZ8t5P8XoRKVLAG/60r7fIXB6dOxJcD+R7KWxfHAHO8BczbzkaoxsqZNo5g+WsRcSaGC1TE0tbCK79gLYkvvHDJRgZ6XOAH5xAG0cbP3bc5EhjuL3UQHbWjreq3SEbaK9UVdolAv+nSRE04+yVEu1zuK8IbJQ0LjXsMF/3+MxJ2Ih7V+UpEbJTwgCfCNmRxuQMQZcIOW1YBZoQL0epKKxUKpVKpVKpVB6d/4go2o8Dgf5FAAAAAElFTkSuQmCC`,t=`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALHSURBVHhe7ZjRcdswEERZSD5TgVRO0pC7SVH+9aQEZUAbHPBpARxBHkQwfjP7YZG6u10AtKRp+uabM3CfpumRKPz9X0DjOV02EBot6XLkVr/0+iXIGVwUEfcOz41mhe5LAp8hrK6x4Ego8yuziqvsApq/0WiJ0QPYZT7AXcMGZ4bbd7P5gKgzDOnQv+IK0qCFEXcBV21RC6Le6eGKRQNNOyAwUgCr1dpCKaiRAlitPo2UKAU3ZAAwkO4MGczldkDBgDRZ4goB8Em+BGHcHWMH8GUiF8JKRLzv1GSNBIQZ6mkH8Dobno2imYgIQt4r7js9zZ8DCGuNEkAgHbjpS1BAmD/99o9w5TaHIL5KDwcNmEMQAQ6z8oQhzGZomDA4Fh0BriCV3Q0itNNSM1nTUwjCfE4vPxKt5uMvQ1Rrvag3DugNB1BSq2Q1mgtqj9Q8zaSFrVjN3z9+/HwEZd7zW7xm1WFsLaqMzEaTc3+LxlPl3ov64QjwHqXD2FJUGqDRknI12ChBPUxL929mSwBPg9CgRZkQFDTv8jmiNkSEwzSZL4TAVeV1F/MBSwA8l7vMR6Em+3cxH1gZwzWuwjwMjbRK1I/9udtcocEAB1sGpIm9Uj3E367wfzHTD3rj4EdJGOYs7rApdfiqU6JnlDvF9DmolzJzuG991XRpziG9lJkjHEt32HQWB/RQxjTlDh9+82Ac1kOib06ux2DVjEN6ybj6qdxIm3RZ+SBhsCY3liYc0lMbd0C3I9BtB0QhiPSHk1SurJpxwFepZwCrrchBXqWeAQTSZt2PgdIrAzhCu0NEPVe2PI291fUheCbjNbnAJkH3v+9/Hq1yCtXtM8BTIxqyqGaa9yvVakCHBbKlaauaQv0KpaZDgugRQipzIMbZDgkhYGlWUxzGUsschCGU06KGpUxBVGoNQcmADMT4nsOOQE8sxiyS5v8B0ULAAykWjPsAAAAASUVORK5CYII=`;function n(e){let t=0,n=n=>{t=n,e.innerHTML=`You tried to play ${t} times.`};e.addEventListener(`click`,()=>n(t+1)),n(0)}document.querySelector(`#app`).innerHTML=`
<section id="center">
  <div class="hero">
    <img src="${t}" class="base" width="170" height="179">
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
          <img class="logo" src=${e} alt="" />
          You do u do xplor Vite?
        </a>
      </li>
      <li>
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
          <img class="button-icon" src="${e}" alt="">
          Don't learn more
        </a>
      </li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`,n(document.querySelector(`#counter`));