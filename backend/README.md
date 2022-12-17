# reservation-api

This api provides information about a resource's availability for a given datetime.

## Routes

### Timetables

This route checks if a resource is available for a datetime

**URI** : /resource/:resourceId/available

**Method** : GET

**Parameters**

| name | type | required |
| ------ | ------ | ------|
| datetime | date in format YYYY-MM-DDThh:mm:ss | yes |
| resourceId | int | yes |

**Example**

GET http://ip:port/resource/1337/available?datetime=2021-11-04T12:00:00Z

Response

```json
{
    "available": true
}
```

## Build and run

1. Pull the project locally 

`git clone https://gitlab.com/affluences/affluences-tests/reservation-api.git`

2. Navigate to project folder

`cd reservation-api`

3. The prefered method to run the API is to run it with docker. There is a Dockerfile available. You should build the image before running it. The container will expose the API through port 8080\. Don't forget to bind the port when launching the container to access the API from your computer !

`docker build . -t affluences/reservation-api`

`docker run -p 8080:8080 affluences/reservation-api`

Note : if you are not confortable with Docker, you can deploy the API by installing  the dependencies by running the command "npm install" from a terminal and then run the API with "npm run start".

`npm install`

`npm run start`
