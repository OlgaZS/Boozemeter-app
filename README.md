Boozmeter your app to muesure your drinks, money spend and health

# Boozemeter

## Description

In the application user can:
-sign up
-login
-logout
-Add drink to the calendar, choosing from the list of popular drinks, add health state, money spent and additional details of the drink (such as volume, % of alcohol and name).
-In the calendar see drink consumption, volume, money spent and health
-See more datails of each drink added to calendar
-Delete drink.
-See your own "statistics" and group (average user) "statistic"(it is posiible to choose period of statistics).

## User Stories

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

Drink:
/_ name: drink name ('Martini', 'Jameson', 'Heineken' etc.) _/
{
name: {
type: String,
required: true
},
/_ type: more broad drink type category ("Beer","Wine", "Cider", etc.)_/
type: {
type: String,
enum: drinkTypesArray,
required: true
},
/_ percentage: alcohol %% in the drink. _/
percentage: {
type: Number,
required: true
}
},
{
timestamps: true
}
);

Event model(add drink): (
{
user: {
type: Schema.Types.ObjectId,
ref: User,
required: true
},
/_to create custom drink names within certain drink type constraints._/
drink: {
type: Schema.Types.ObjectId,
ref: Drink,
required: true
},
date: {
type: Date,
default: Date.now
},
cost: {
type: Number,
required: true
},
// in mililiters
volume: {
type: Number,
required: true
},
health: {
type: String,
enum: healthTypesArray
}
},
{
timestamps: true
}
);

## Links

### Git

The url to your repository and to your deployed project

[Repository Frontend Link](https://github.com/OlgaZS/Boozemeter-app-front-end)

[Repository Backend Link](https://github.com/OlgaZS/Boozemeter-app-back-end)

[Deploy Link](https://boozemeter.netlify.com/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/17_lHsxZkMYv1v5ZvVBrm5vGnEHmSTHZqsK-gSGAt0Ls/edit?usp=sharing)
