# Boozemeter-app
Boozmeter your app to muesure your drinks, money spend and health
# Boozemeter

## Description
 Mobile only.
The app in notifications will ask you every day if you drank yesterday. And then, at any time, you can see the "statistics."
You can choose the type of alcohol, add a new type of alcohol(in one of the three quantity gradations, optional). 
You can track drunk volumes, cash expenses and hangover/health.

In the application, you can see not only your own statistics, but also the average user statistics for any selected period.


## User Stories

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup

**Sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend

**Login** - As a user I want to be able to log in on the webpage so that I can get back to my account

**Logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account

**Pick the drink from the list** - As a user I want to choose a drink from the list, add volume, price and choose if I have had hangover or how were my health and mood/feelings

**Add drink** - As a user I want to a add a new type of alcohol with itś volume and price.

**Pick the drink from the list** - As a user I want to choose a day in the calendar and pick up a drink from the list/BD, add volume, price and choose if I have had hangover or how was my health and mood/feelings.

**My Booze statistic** - As a user I want to see the statistic details of the selected period of time: alcohol consumed, total volume, money spend, health/hangover.

**Community Booze statistic** - As a user I want to see the community statistic details of the selected period of time: average alcohol consumed, average money spend, average health/hangover, top drink of the period.


## Backlog

List of other features outside of the MVPs scope

User profile: - see my profile - upload my profile picture - see other users profile - list of events created by the user - list events the user is attending


Homepage: - …

## Routes

List routes backend

## Models

User model

    {
    	username: String
    	password: String
    }

Alcohol model

    { 
    	owner: ObjectId<User>
    	name: String
    	type: String
	degree: number
    	Volume: []
    	
    	+
    }
 

Day/event model:

{ 
    	owner: ObjectId<User>
    	Alcohol: ObjectId<Alcohol>
    	Volume: String
    	Price: string
    	hangover: true, false
                 health: []
                 mood:[]
    	+
    }



## Links

### Git

The url to your repository and to your deployed project

[Repository Frontend Link](http://github.com/)

[Repository Backend Link](http://github.com/)

[Deploy Link](http://heroku.com/)

### Slides

[Slides Link](http://slides.com/)
