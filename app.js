const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/lokasi", async (requestAnimationFrame, res) =>{
    const kota = "Jakarta";

    const apiKey = "TmW3n2IbOKaZxkghOoYB";

    const url = `https://api.maptiler.com/geocoding/${kota}.json?key=${apiKey}`;

    try{
        const response = await axios.get(url);
        console.log(response.data);

        const data = response.data;

        const lokasi = data.fetures[0].matching_text;
        const koordinat = data.features[0].geometry.coordinates;

        res.json({
            kota: lokasi,
            koordinat: korrdinat
        });
    } catch(error){
        console.error(error.message);

        res.status(500).json({
            message: "Gagal mengambil data dari MapTiler"
        });
    }
});
