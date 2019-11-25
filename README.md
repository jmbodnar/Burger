# Burger Logger

A burger logger with MySQL, Node, Express, Handlebars and a homemade ORM. Follows the MVC design pattern. Uses Node and MySQL to query and route data. Handlebars to generate HTML. Deployed to [Heroku](https://salty-brook-26994.herokuapp.com/)

## Summary 

Users input the names of burgers they'd like to eat.  When a user submits a new burger the app displays the burger on the left side of the page, in the uneaten column. Each burger in the waiting area has a `Devour it!` button. Clicking the button moves to the burger to right side of the page.

## Directory structure

```
.
├── config
│   ├── connection.js
│   └── orm.js
│ 
├── controllers
│   └── burgers_controller.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── burger.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   └── assets
│       ├── css
│       │   └── burger_style.css
│       └── img
│           └── burger.png
│   
│
├── server.js
│
└── views
    ├── index.handlebars
    └── layouts
        └── main.handlebars
```
