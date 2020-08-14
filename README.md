# firestore-auth-flask-api

Building a sample Vue application that interacts with a Flask API. The user may choose to authenticate as a guest or login, after which they may submit job requests to the Flask API.

The Flask API must check that the user is authenticated, and then store information related to the tasks in a database, _only allowing the user to access data that they own._