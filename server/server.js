const express = require('express');
const app = express();
const { cloudinary } = require('./Utilities/cloudinary')


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data
        console.log(fileStr)
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'Saad_Photos1'
        })
        console.log(uploadedResponse);
        res.json({ msg: "Uploaded Image" })
    } catch (err) {
        console.error(err)
        res.status(413).json({ error: "Please Ensure File Size is Below 10 megabytes" })
    }
})


app.get('/api/images', async (req, res) => {
    const { resources } = await cloudinary.search.expression('folder: Saad_Photos1').sort_by('public_id', 'desc').max_results(30).execute();
    const publicIDs = resources.map(file => file.public_id)
    res.send(publicIDs);
})



const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});
