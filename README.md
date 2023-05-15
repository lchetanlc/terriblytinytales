# Terribly Tiny Tales Assessment
This is a React application that displays a simple word frequency analysis

The code imports the necessary dependencies, including React, useState, useEffect, react-chartjs-2, chart.js/auto, and the CSS file. The App component is defined, which serves as the main component for the application. Inside the App component, there is a state variable called **showGraph**, which determines whether to display the graph or the submit page.

The **handleButtonClick** function is implemented, which sets the showGraph state to true when the submit button is clicked. The **SubmitPage** component is defined, which displays a description and a submit button. It receives the **onButtonClick** prop, which is a callback function triggered when the submit button is clicked. The **GraphPage** component is defined, which displays the graph and the export button. Inside this component, there are state variables:
a.	words to **store** the word frequency data
b.	loading to **indicate** if the data is being loaded

The **useEffect** hook is used in the **GraphPage** component to fetch the word frequency data from the specified URL when the component mounts. The **fetchWordData** function is implemented, which fetches the text data from the API, calculates the word frequency, and updates the words state with the sorted word frequency data. The **exportCSV** function is implemented, which generates a CSV file based on the word frequency data and triggers the file **download** when the export button is clicked. The **chartData** object is defined, which contains the data for the bar chart. It uses the word frequency data from the words state.

The **chartOptions** object is defined, which configures the options for the bar chart, such as making the y-axis begin at zero. In the JSX of the GraphPage component, the bar chart is rendered using the Bar component from react-chartjs-2, passing the chartData and chartOptions as props. The export button is displayed using an anchor tag with appropriate CSS classes. The main App component is returned, which conditionally renders either the SubmitPage or GraphPage based on the value of the showGraph state.The App component is exported as the default export.

In summary, this application creates a React application that allows users to analyze the **word frequency** in a text file. It fetches the text file from an API, calculates the word frequency, and displays the top 20 most occurring words in a bar chart. Users can also export the word frequency data as a **CSV file**.
