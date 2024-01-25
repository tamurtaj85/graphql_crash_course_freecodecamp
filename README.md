# GraphQL Course Notes & Setup

- GraphQL is a `Query` language
- Alternative to using a Rest API

## Examples

### Rest API

```javascript
-pokemonsite.com / api / pokemon;
-pokemonsite.com / api / pokemon / 123;
```

#### Drawbacks

- `Over fetching` of data is common pitfal in rest when the app scales and data becomes more complex
- `Under fetching` of data, getting back less data than we needed

### GraphQL

```javascript
// single endpoint
-mygraphqlsite.com / graphql;

/*
* Syntax

* to get the data of courses containing the mentioned fields
Query {
    courses{
        id,
        title,
        thumbnail_url
    }
}


* to get the data of a course against an id, and nested data as well
Query {
    course(id: "1"){
        id,
        title,
        thumbnail_url,
        author{
            name,
            id,
            courses{
                id,
                title,
                thumbnail_url
            }
        }
    }
}
*/
```

## Usage

- for graphql `apollo server` is used to send request/test queries (its like postman)
- graphql queries starts with the keyword `query`
- then you can name the `query` whatever you want (should represent the purpose of query)
- then you need to specify the `resources` that you want
- then you need to specify the fields that you want the query to retrieve

#### Example

```js
query ReviewsQuery{
    reviews{
        rating,
        content,
        id
    }
}
```

### Explanation:

How we query the graph or in general how the graph is created and quried

When we make a grapql server or api we make graphs, and a graph is in general is a bunch of related data and we can chose to jump into the graph at any point on the server when we make a query.\
From there graphql layout allow us to traverse the graph to fetch any related data with our query.

Let's say we have 3 schemas `games, reviews and authors`.
And we have defined the relation of these schemas on our server and when we query (example above) the data either its nested resource or collection of resources data is retrieved based on the query we have specified and then relations between the schemas.

With graphql we can easily query data across multiple related schemas. For example:

```
// we are querying the data based on the game id and then fetching the relevant reviews and authors data

// our query will look like this

query GameQuery{
    game(id: "2"){
        title,
        review:{
            rating,
            author:{
                name
            }
        }
    }
}
```

## Installation

Install the dependencies with npm

```bash
  npm i
```

Start the server

```bash
  npm run start

  // OR

  npx nodemon // if want to run in watch mode
```
