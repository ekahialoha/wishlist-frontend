WishList
======

### Technologies Used

The WishList app was created with:

- Ruby on Rails
- ReactJS
- PostgresSQL
- NodeJS
- [React Router](https://reacttraining.com/react-router/)
- [React Bootstrap](https://react-bootstrap.github.io/)

This app is:

- Deployed on [Heroku](https://the-wish-list-app.herokuapp.com/)
- Host on Github: [Frontend](https://github.com/ekahialoha/wishlist-frontend) / [Api](https://github.com/ekahialoha/wishlist-api)


### About This App

WishList uses two models: wishlists and items. Both are connected in a one-to-many relationship, where items are tied to lists. Visitors can create a wishlist, add desired items to wishlists, mark items as "gifted", search for wishlists, as well as delete/update wishlists.


### Approach Taken

1. Created user stories. Based on user stories, broke out functionality into small tasks.
2. Created wireframe of app on desktop and mobile.
3. Created React map to understand all of the components involved, how they would be related, and which would have state.
4. Additionally, researched React Router and mapped out routes.
5. Determined model tables, created seed data.
6. Created full CRUD API with Ruby on Rails.
7. Worked through frontend components and CRUD functionality.
8. Implemented React Bootstrap and custom CSS to style app.

#### User Stories
 > As a user, I should be able to edit a wishlist.

 > As a user, I can create a new item for a wishlist.

 > As a user, I can delete an item from a wishlist

 > As a user, I should see a featured (random) wishlist on the homepage.

 > As a user, I should be able to search for specific wishlists.

 > As a user, when I search, I should see a list of wishlists showing the list name and description.

 > As a user, when I click on a search result, I should only see that wishlist displayed with only those items visible.

 > As a user, I should be able to create a wishlist.

 > As a user, I should be able to delete a wishlist.

 > As a user, I can edit an item on a wishlist.

 > As a user, I can see all items on a wishlist.

 #### Wireframe & React Map

![alt-text](https://github.com/ekahialoha/wishlist-frontend/blob/dev/wishlist_app-map.png "wishlist react map")

![alt-text](https://github.com/ekahialoha/wishlist-frontend/blob/dev/wishlist_wireframe.png "wishlist wireframe")

### Authors
- Molly Stone - [GitHub](https://github.com/mstone89) - [LinkedIn](https://www.linkedin.com/in/mollycstone/)
- Christian Kelsom-Martin - [GitHub](https://github.com/ekahialoha) - [LinkedIn](https://www.linkedin.com/in/ckelsom-martin/)


### Unsolved Problems

On mobile, the edit and delete icons change color permanently after clicking on them when viewing a wishlist. On desktop, these icons change color only on hover, as intended. On mobile, these icons should not change color permanently.
