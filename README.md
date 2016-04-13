# AnimeAPI

A free, easy-to-use and open-source RESTful API for Anime Data. 
It's a javascript API built using `node.js` and `express`.

**Status:** `early development`

## Usage

AnimeAPI is going to provide a complete service for requesting anime data.

Here are some examples:

```
GET /api/anime/Shingeki+no+Kyojin
GET /api/anime/513
```

```json
{
    "id": 513,
    "title": "Shingeki no Kyojin",
    "title-en": "Attack on Titan",
    "title-jp": "進撃の巨人",
    "picture": "http://cdn.myanimelist.net/images/anime/10/47347.jpg",
    "synopsis": "Centuries ago...",
    "type": "TV",
    "episodes": 25,
    "tags": [ "shounen", "action", "drama", "fantasy" ],
    "released": "2013-04-07",
    "season": "Spring 2013", 
    "characters": [
        {
            "id": 1212,
            "name": "Mikasa Ackerman",
            "name-jp": "ミカサ・アッカーマン",
            "picture": "http://cdn.myanimelist.net/images/characters/9/215563.jpg",
            "age": 15,
            "birthdate": "February 10",
            "height": 170,
            "weight": 68,
            "about": "Mikasa is Eren's adoptive sister and..."
        },
        {
            "id": 1213,
            "name": "Eren Yeager",
            "name-jp": "エレン・イェーガー",
            "picture": "http://cdn.myanimelist.net/images/characters/10/216895.jpg",
            "age": 15,
            "birthdate": "March 30",
            "height": 170,
            "weight": 63,
            "about": "Eren is Shingeki no Kyojin's protagonist. His adoptive sister..."
        }
    ]
}
```

```
GET /api/character/Mikasa+Ackerman
GET /api/character/1212
```

```json
{
    "id": 1212,
    "name": "Mikasa Ackerman",
    "name-jp": "ミカサ・アッカーマン",
    "picture": "http://cdn.myanimelist.net/images/characters/9/215563.jpg",
    "age": 15,
    "birthdate": "February 10",
    "height": 170,
    "weight": 68,
    "about": "Mikasa is Eren's adoptive sister and..."
}
```

```
GET /api/season/current
GET /api/season/2013/spring
```

```json
{
    "name": "Spring 2013",
    "animes": [
        { },
        { },
        { }
    ]
}
```

## Contributing

I'm not sure how far I can get with this project by myself. 
To make sure the API data is always up-to-date, I will probably need some help of the community.

For who wants to contribute, here are things that are welcome

- [X] Developing API (current working on it)
- [ ] Helping to keep anime data updated
- [ ] Using other APIs to help us generating our json data
- [ ] Developing bots/crawlers to get anime data from other sites
- [ ] Writing scripts to update `mongodb` from json files
- [ ] Helping to write tests
- [ ] Making suggestions / opening Issues
- [ ] Using it at other projects

>**Note:** All anime data is going to be versioned here as `.json`. This will help us to check for data updates at pull requests, and will make sure all data is Open-Source and belongs to community.

## Running from Source

Make sure you have [Node](https://nodejs.org/en/) and [Mongo](https://www.mongodb.org/) installed.

Then

```shell
# Clone this repo
git clone https://github.com/jieverson/animeapi.git
# Go into the repo
cd animeapi
# Install dependencies
npm install
# Run mongodb
mongod
# Run server at localhost
node server.js
```

## License

[The MIT License (MIT)](./LICENSE)