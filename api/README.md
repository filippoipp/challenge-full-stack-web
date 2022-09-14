FILIPPO IPPOLITO RODRIGUES

# Requirements

The specifications was taken from [https://onstrider.notion.site/Strider-Web-Back-end-Assessment-3-0-9dc16f041f5e4ac3913146bd7a8467c7](https://onstrider.notion.site/Strider-Web-Back-end-Assessment-3-0-9dc16f041f5e4ac3913146bd7a8467c7).

# Endpoints

- GET - http://localhost:3001/api/private/v1/user/:username
This endpoint must return a user informations

- GET - http://localhost:3001/api/private/v1/post'
This endpoint must return posts and can receive some data by query:
username: filter posts by user,
beginDate: date range filter option,
endDate: date range filter option,
take: number of posts to return per page,
page: number of the page,
EX: http://localhost:3001/api/private/v1/post?username=user1 / http://localhost:3001/api/private/v1/post?beginDate=2022-07-20
http://localhost:3001/api/private/v1/post?beginDate=2022-07-20&endDate=2022-07-15

- POST - http://localhost:3001/api/private/v1/post
This endpoint must create a new post
Body example:
{
	"userId": "2942997c-f67d-4d8e-a687-a29a7a879533",
	"type": "POST",
	"content": "EXAMPLE"
}
_
{
	"userId": "2942997c-f67d-4d8e-a687-a29a7a879533",
	"type": "REPOST",
	"repostedPostId": "9997997c-f67d-4d8e-a687-a29a7a879533"
}
_
{
	"userId": "2942997c-f67d-4d8e-a687-a29a7a879533",
	"type": "QUOTE",
	"repostedPostId": "23460201-f775-46ed-b65e-ca0a0b3e3425",
	"comment": "another test"
}

Obs: I am using userId in the body because we don't have authentication


## Installation

```bash
$ yarn
```

## Database

```bash
# create database container
$ docker-compose up -d
# run migrations
$ yarn migration:run:dev
```

## Running the app

```bash
# development
$ yarn dev
```

## Test

```bash
# unit tests
$ yarn test
```

CRITIQUE

Improvement points: due to the lack of authentication I had to make some adaptations. With authentication ready, I would refactor some endpoints, making it unnecessary to send some data, getting it directly from the token for example. It's also necessary to create the unit tests for the repository (I didn't finish because I'd have to study how to mock some elements of TYPEORM). It is also necessary to create integration and end2end tests.
I would also improve the error messages, but I am still studying the best way to do this.

With a hypothetical growth of the system, I believe that the posts part is the one that would fail first,
due to the amount of posts that can be generated.
For the infrastructure I would put on AWS, because it is where I feel more secure and it provides several tools that help us on a daily basis.
To scale, I believe we could start by putting a logging and monitoring system to know in detail where the failures occur.


