import SGDB from 'steamgriddb';


const STEAM_KEY = '288294d05a528adb651b4d48eccf3ef3';

export default function handler(req, res) {
    const client = new SGDB(STEAM_KEY);
    let gameName = 'zelda';
    if (req && req.query && req.query.game) {
        gameName = req.query.game;
    }

    getGameList(client, gameName).then(result => {
        res.status(200).json({ result })
    });
}
async function getGameList(client, gameName) {
    const searchResult = await client.searchGame(gameName);
    return searchResult;
}