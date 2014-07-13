todo-app-classic
================

This is my example of a single page web app.  The to-do app is an app that most people understand. 
The use cases for this app should be intuitive and recognizable.  My aim is to create a base set of 
code that I can piviot off of to better understand many of the new concepts and nuamces around
building single page web apps in Javascript.  Such concepts include responsive design, mobile
optimization (touch events), modularity (AMD), compiling to native devices (PhoneGap), and 
experimenting with the various MV* Javascript frameworks.  I want to understand what the
challenges and trade-offs of HTML5's promise "Write once, run anywhere." 

This app features a basic clean architecture evangelized by Robert C. Martin (aka Uncle Bob).  All
the use cases are visible at the highest level of the architecture not buried behind a bunch of 
MVC or various framework code.  What does this app do?  Well look in the todo-app folder and read
the files.  The file names indicate exactly what the app does.  The files that read like verbs are the
use cases while the files that read like nouns are entities.  Entities are encapuslated business rules
that can be reused across the enterprise while the use cases encapsulate the business rules specific to the  application.

![todo app class diagram](https://raw.githubusercontent.com/sparksmb/todo-app-classic/master/doc/todo-app-classic.png)
