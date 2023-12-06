# IT Academy

![Homepage of IT Academy displaying all available courses.](public/images/available_courses.png)

## Concept

Website following **MVC design pattern** allowing subscriptions for IT courses linked to a database.
Users are able to consult current courses and sign up for them.

Users should be logged in with a username to sign up for a course. By selecting them, they can be part of multiple courses, so they appear in the cart. Once users have chosen the courses they want to follow, they can confirm their inscriptions from the cart.

Data concerning the different courses are stored in a database and can't be accessed within the website.

<p align="center">
<img src="public/images/cart.png" alt="Page displaying your cart with courses you want to sign up for." width="70%">

<img src="public/images/empty_cart.png" alt="Page displaying your empty cart." width="70%">

<img src="public/images/login.png" alt="Login page" height="500">
</p>

## Installation

> :bulb: **Note:** We assume a MySQL server is installed and ready to use.

To install the Academy on your server, please make sure **NodeJS** is installed and clone the **GitHub repository** :

```shell
npm install node
```

```shell
git clone https://github.com/NJurquet/Techno_Web-IT_Academy.git
```

Navigate to the project folder and install the required dependencies :

```shell
cd ./Techno_Web-IT_Academy
```

```shell
npm install
```

You are now ready to start the server with :

```shell
node server.js
```
