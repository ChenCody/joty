import SGDB from 'steamgriddb';


const STEAM_KEY = '288294d05a528adb651b4d48eccf3ef3';

export default function handler(req, res) {
    const client = new SGDB(STEAM_KEY);
    let gameName = 'zelda';
    if (req && req.query && req.query.game) {
        gameName = req.query.game;
    }

    getGameImage(client, gameName).then(result => {
        res.status(200).json({ result })
    })
}
async function getGameList(client, gameName) {
    const searchResult = await client.searchGame(gameName);
    return searchResult;
}
async function getGameImage(client, gameName) {
    const searchResult = await getGameList(client, gameName);
    if (searchResult.length > 0) {
        const gameInfo = await client.getGrids({type: 'game', id: searchResult[0].id});
        return gameInfo;
    }
    else {
        return {};
    }
}