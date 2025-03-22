const path = require('path');
const createPlaylist = require('./createPlaylist');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/create-playlist', async (req, res) => {
    const { accessToken, userId, songList } = req.body;
    try {
        await createPlaylist(accessToken, userId, songList);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
});
