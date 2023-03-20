import SGDB from 'steamgriddb';


const STEAM_KEY = '288294d05a528adb651b4d48eccf3ef3';

export default function handler(req, res) {
    const client = new SGDB(STEAM_KEY);
    let id = '';
    if (req && req.query && req.query.id) {
        id = req.query.id;
    }

    getGameInfo(client, id).then(result => {
        res.status(200).json({ result })
    })
}
async function getGameInfo(client, id) {
    const searchResult = await client.getGridsById(id);
    return searchResult;
}