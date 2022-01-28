# Fetch Rewards User Creation Application

## Project Description

This is a simple user creation application built in React. It uses the Axios library to manage API routing, and uses a GET and POST request from the API provided by Fetch Rewards to retrieve data for the 'Occupation' and 'State' options. User must fill in all required fields and options, and click the 'Register' button to send the data to the API. The 'Occupation' and 'State' options are populated via a GET request to the API provided by Fetch Rewards at the start of the application via the useEffect React hook. If the response returns a status code 200, the application will return a message that the user has been created, and the opposite if the response does not return a status code 200.

### How to use the web application

Fill in all the fields and click the 'Register' button.

#### Github

https://github.com/Mitchreyes/fetch-rewards-usercreation/
