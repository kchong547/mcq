# How to run
clone the repository
Note: you must run at least mcq-extension and mcq-backend for mcq-extension to work

### mcq-backend
cd mcq-backend<br />
npm i
npm start<br />
check localhost:8080<br />

### submission storage api
cd data-collection-api<br />
npm i
npm start<br />
check localhost:8000<br />

### mcq-extension
cd mcq-extension<br />
npm i
npm start<br />
check localhost:3000<br />

**To test**
npm test<br />

# Mock-ups

https://www.figma.com/file/bFgDjdCxXXdRhoreZ7jHJq/Multiple-Choice-Question-Extension?type=design&node-id=0%3A1&mode=design&t=OIRKpScbeUUCusH0-1


# Design decisions/tradeoffs

### Parsing/translating/building from existing HTML v.s. React Component

Many existing Tiptap extensions directly translate HTML tags into respective components. For example, the tasklist extension translates ul and li tags to create a Tiptap tasklist.<br />

Another option is to create an extension that essentially translates an HTML tag into a React component that generates all the functionality and frontend.<br />

I chose to go with the second option since there were many changing states that it just made more sense to use React components.<br />

### Requesting all question data for the webpage at once v.s. sending a request for each question

Initially, I considered parsing through all of the editor content and grabbing all question ids in App.jsx so that I could send a single request to the backend to retrieve question data. Instead, I chose to have each question make their own request to the backend for data since it was the more simple approach and makes the extension depend less on the web app it's hosted on to perform properly. This comes with the tradeoff of having more calls to the backend which may affect loading performance. 

### Backend local storage v.s. using database service

In the backend and in the submission storage API, I chose to store the received information in a local file. However, this comes with the tradeoff of less efficiency as I have to read and overwrite the entire .json file in order to do any CRUD operations on the database.<br />

I do recognize the security value and the efficiency of having the backend interact with a service such as MongoDB to store information and would definitely prefer this option over what was implemented in a real life setting. Otherwise, I would spend a lot more time implementing a more secure backend with querying capabilities.


# Time Distribution
Day 1-2: Learning TypeScript and familiarizing with TipTap<br />
Day 3: Planning features and states, research into design, expected user interactions<br />
Day 4-9: Development<br />
Day 10: Code clean up, styling<br />


# Known Issues
***1. flushSync error***<br />
This seems to be an ongoing issue with addNodeView and manipulating editor content. I tried to implement suggested solutions but I couldn’t get it to work. However, the project still runs and it doesn’t affect its functionality.<br />

Relevant links:<br />
https://github.com/ueberdosis/tiptap/pull/3533<br />
https://github.com/ueberdosis/tiptap/issues/3580<br />

***2. Extra user click on FormView***<br />
Clicking on the response text label in view mode requires an extra click to select the corresponding input radio button. However, it doesn’t seem to be an issue with the multiple choice extension as this happens with all generic input label pairs generated in addNodeView.

***3. Accessibility***<br />
Some additional functionalities I would love to implement but didn’t get around to
Can’t tab to select multiple choice question and edit
Did not add additional hidden information within code for screen readers  to assist blind users
