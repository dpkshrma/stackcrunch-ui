export default `
How do we animate interfaces in ways that are not just beautiful, but meaningful? When we add motion to interfaces we want to in one way or another improve the user experience, be it through aiding the comprehension of a concept, setting the mood, improving the perception of speed, or directing the attention of a user. Regardless of the intent of the animation, when animations fail to be meaningful they often fail because of the same reason; failed animations simply visualize objects morphing between being hidden and visible, rather than visualizing the actions unfolding on screen. A window rarely just closes or opens; a message is sent, a draft is discarded, an item is used.

This is essentially state driven animation vs. action driven animation. By applying action driven animation you can catch yourself in the act of creating something that’s not as meaningful as it could be. Are you simply morphing between states, or are you visualizing actions? Meaningful motion is about clear and engaging storytelling, and we can apply action driven animation to remind ourselves when we’re straying from that path.

## State driven animation

<sc:embed type="youtube" url="http://youtube.com" />

Let’s take a look at a basic example of state driven animation vs. action driven animation: interacting with a modal. This is a simulation of state driven animation being applied to a modal:

As the modal appears, it fades in. Whatever button is pushed, it fades out again. What’s wrong with this animation? Fading between hidden and visible isn’t helpful to understand what’s happening on screen, other than in underlining that an object is being shown and hidden.

You might be thinking “C’mon, what is there to understand? It’s a modal. It’s being hidden, and shown!”. Yes, but—the user is also triggering an action. Rather than only morphing between states, we can use motion to reinforce what action is being triggered by the user.

## Action driven animation

Here’s is a simulation of action driven animation being applied to the same modal:

Now, how is this better than the previous animation? Try to ignore for the moment the aesthetics of the two. What we want to focus on is this: what does the second animation convey that the first one does not?

In the first example, with state driven animation, we use two different animations: fading in, and fading out. Clicking Cancel and clicking Do it both triggers the fade out animation. In other words, the only thing we’re differentiating between is the states of the modal: hidden vs. visible.

Contrarily, in the second example we’ve got three different animations, and we differ between the two actions by playing different animations depending on the chosen option. On Cancel, we clearly show that the modal is being cancelled by scaling it down and fading it out, sending it back to where it came from. When the affirmative action is selected (Do thing), we do the opposite: scale it up and fade it out, bringing it closer to the user. In other words, we’re not only differentiating between states, but how you travelled between those states, i.e., what actions were performed.

It’s common to think of apps as a series of views or states, and animations as a way to travel between those states. Take this Email app and two of its states:

![State Driven Animation](http://tobiasahlin.com/static/action-driven-animation/state-driven-animation.png "State Driven Animation")

If we do so, it’s easy to in our animations neglect how these states are connected, and always use the same transition to animate between those states. Rule of thumb: if your methods are called something like \`showWindow()\` and \`hideWindow()\`, or if you’re only animating opacity, you’re leaving your users in the dark to figure out exactly what happened. They’ll see that something changed, but not what caused that change. It’s sort of like leaving a party without saying goodbye; the host won’t know if you hated the party or just had to run home to do your laundry.

Action driven animation elevates the connections between the views to become the plots of the motion. In other words, what took you between state and A and state B? In our Email app, you can get between state A (composing visible) and state B (composing hidden) in at least two different ways: either by sending an email, or by discarding an email and closing the window.
`;
