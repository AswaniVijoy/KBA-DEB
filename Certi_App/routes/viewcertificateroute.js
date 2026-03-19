import { Router } from "express"
import Certificate from "../models/certificatemodel.js";
const certificate=Router();


certificate.get("/viewcertificate", async (req, res) => {
    try {
        const viewCertificate = await Certificate.find();
        res.status(200).json(viewCertificate);

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server error" })
    }
})

certificate.get('/by-id/:id', async (req, res) => {
    try {
        const certificateid = Number(req.params.id);
        const result = await Certificate.findOne({ certificateid });

        if (!result) {
            return res.status(404).json({ msg: "Certificate not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ msg: "Internal Server error" });
    }
});

certificate.get('/by-course/:name', async (req, res) => {
    try {
        const selectcourse = req.params.name;
        const result = await Certificate.find({ selectcourse });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ msg: "Internal Server error" });
    }
});


export {certificate}