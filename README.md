# Wrapper of the [API](https://github.com/AniRate-Project/anirate-api) written in TypeScript
The wrapper will be soon relased as a npm module, until then you can clone the repsitory.
## Example
```js
const { Anime } = require('./aniRate.js');

const anime = new Anime('Insert your API token here');

(async() => {
    try{
        let result = await anime.getByTitle("86", "472831424903380992");
        console.log(result);
    } catch(err){
        console.error(err);
    }
})();
```