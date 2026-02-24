1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll

ANS:getElementById() selects a single element using its unique ID and always returns only one element. getElementsByClassName() selects multiple elements using a class name and returns a live HTMLCollection. On the other hand, querySelector() uses CSS selectors and returns the first matching element, while querySelectorAll() returns all matching elements as a NodeList. The main difference is that querySelector methods are more flexible because they support full CSS selector syntax.

2. How do you create and insert a new element into the DOM?

ANS:To create and insert a new element into the DOM, first we use document.createElement() to create the element. Then we add content or attributes to it. Finally, we insert it into the DOM using methods like appendChild(). This process allows us to dynamically add new elements to a webpage.

3. What is Event Bubbling?

ANS:Event Bubbling is a process where an event starts from the target element and then propagates upward to its parent elements. For example, if a button inside a div is clicked, the event first runs on the button, then moves to the div, then to the body, and finally to the document. This upward movement of events is called event bubbling.

4. What is Event Delegation and why is it useful?

ANS:Event Delegation is a technique where an event listener is added to a parent element instead of multiple child elements. The parent element handles events for its children by checking the event target. This method improves performance, reduces memory usage, and works well with dynamically created elements.

5. Difference between preventDefault() and stopPropagation()

ANS:preventDefault() stops the browser’s default behavior, such as preventing a form from submitting or a link from redirecting. In contrast, stopPropagation() stops the event from bubbling up to parent elements. In short, preventDefault() controls default browser actions, while stopPropagation() controls event flow.