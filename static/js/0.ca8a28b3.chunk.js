webpackJsonp([0],{92:function(e,t){e.exports={metadata:{id:2,title:"JavaScript Start-up Performance",abstract:"As web developers, we know how easy it is to end up with web page bloat. But loading a webpage is much more than shipping bytes down the wire. Once the browser has downloaded our page\u2019s scripts it then has to parse, interpret & run them. In this post, we\u2019ll dive into this phase for JavaScript, why it might be slowing down your app\u2019s start-up & how you can fix it.",author:{name:"Addy Osmani",img:"https://avatars1.githubusercontent.com/u/110953?s=460&v=4",link:"/authors/addyosmani/posts/1",twitterHandle:"addyosmani"},tags:[{text:"javascript",link:"/tags/javascript",id:"javascript"},{text:"jsperf",link:"/tags/jsperf",id:"jsperf"},{text:"lighthouse",link:"/tags/lighthouse",id:"lighthouse"}],postedOn:"Aug 19",ttr:"21 min"},post:'\nAs web developers, we know how easy it is to end up with web page bloat. But loading a webpage is much more than shipping bytes down the wire. Once the browser has downloaded our page\u2019s scripts it then has to parse, interpret & run them. In this post, we\u2019ll dive into this phase for JavaScript, why it might be slowing down your app\u2019s start-up & how you can fix it. A window rarely just closes or opens; a message is sent, a draft is discarded, an item is used.\n\nThis is essentially state driven animation vs. action driven animation. By applying action driven animation you can catch yourself in the act of creating something that\u2019s not as meaningful as it could be. Are you simply morphing between states, or are you visualizing actions? Meaningful motion is about clear and engaging storytelling, and we can apply action driven animation to remind ourselves when we\u2019re straying from that path.\n\n## State driven animation\n\n\n<sc:embed url="https://vimeo.com/238096496" />\n\n\nLet\u2019s take a look at a basic example of state driven animation vs. action driven animation: interacting with a modal. This is a simulation of state driven animation being applied to a modal:\n\nAs the modal appears, it fades in. Whatever button is pushed, it fades out again. What\u2019s wrong with this animation? Fading between hidden and visible isn\u2019t helpful to understand what\u2019s happening on screen, other than in underlining that an object is being shown and hidden.\n\nYou might be thinking \u201cC\u2019mon, what is there to understand? It\u2019s a modal. It\u2019s being hidden, and shown!\u201d. Yes, but\u2014the user is also triggering an action. Rather than only morphing between states, we can use motion to reinforce what action is being triggered by the user.\n\n## Action driven animation\n\nHere\u2019s is a simulation of action driven animation being applied to the same modal:\n\n\n> Let your actions drive your animations\n\n\nNow, how is this better than the previous animation? Try to ignore for the moment the aesthetics of the two. What we want to focus on is this: what does the second animation convey that the first one does not?\n\n#### Fenced Codeblocks:\n\n```javascript\nvar x = \'cool\';\nconsole.log(\'this is super \' + x);\n```\n\n\n\n  ![Space Mobile](https://cdn.dribbble.com/users/255512/screenshots/3871706/mobile.png "Space Mobile Link")\n\n\n  [Space Mobile](https://cdn.dribbble.com/users/255512/screenshots/3871706/mobile.png "Space Mobile Link")\n\n\n\n  this is pretty `var x = \'cool\';` awesome right?\n\n\nIn the first example, with state driven animation, we use two different animations: fading in, and fading out. Clicking Cancel and clicking Do it both triggers the fade out animation. In other words, the only thing we\u2019re differentiating between is the states of the modal: hidden vs. visible.\n\nContrarily, in the second example we\u2019ve got three different animations, and we differ between the two actions by playing different animations depending on the chosen option. On Cancel, we clearly show that the modal is being cancelled by scaling it down and fading it out, sending it back to where it came from. When the affirmative action is selected (Do thing), we do the opposite: scale it up and fade it out, bringing it closer to the user. In other words, we\u2019re not only differentiating between states, but how you travelled between those states, i.e., what actions were performed.\n\nIt\u2019s common to think of apps as a series of views or states, and animations as a way to travel between those states. Take this Email app and two of its states:\n\n![State Driven Animation](http://tobiasahlin.com/static/action-driven-animation/state-driven-animation.png "State Driven Animation")\n\nIf we do so, it\u2019s easy to in our animations neglect how these states are connected, and always use the same transition to animate between those states. Rule of thumb: if your methods are called something like `showWindow()` and `hideWindow()`, or if you\u2019re only animating opacity, you\u2019re leaving your users in the dark to figure out exactly what happened. They\u2019ll see that something changed, but not what caused that change. It\u2019s sort of like leaving a party without saying goodbye; the host won\u2019t know if you hated the party or just had to run home to do your laundry.\n\nAction driven animation elevates the connections between the views to become the plots of the motion. In other words, what took you between state and A and state B? In our Email app, you can get between state A (composing visible) and state B (composing hidden) in at least two different ways: either by sending an email, or by discarding an email and closing the window.\n'}}});
//# sourceMappingURL=0.ca8a28b3.chunk.js.map