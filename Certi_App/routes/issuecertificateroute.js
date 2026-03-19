import {Router} from 'express'
import Certificate from '../models/certificatemodel.js';
const router=Router();

    
router.post('/issuecertificate', async (req, res) => {
  try {
    const {certificateid,selectcourse,candidatename,selectgrade,issuedate}=req.body

    if (await Certificate.findOne({ certificateid: certificateid })) {
      res.status(400).json({ msg: 'Certificate already exists for this ID' })
    }
    else {
      const newcertificate = new Certificate({
        certificateid: Number(certificateid),
        selectcourse: selectcourse,
        candidatename: candidatename,
        selectgrade: selectgrade,
        issuedate: issuedate
      });
      await newcertificate.save();
      res.status(201).json({ msg: 'Certificate has been issued' })

    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' })
  }

})

router.put('/updateCertificate', async (req, res) => {
  try {
    const {  certificateid,selectcourse,candidatename,selectgrade,issuedate} = req.body;
   
    const updated = await Certificate.updateOne(
      { certificateid },   
      {
        $set: {
          selectcourse,
          candidatename,
          selectgrade,
          issuedate
        }
      }
    );
    if (updated.matchedCount === 0) {
      return res.status(404).json({ msg: "Certificate not found" });
    }


      res.status(200).json({ msg: "Details updated successfully" })
    }  
  
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something gone wrong' })
  }
})    
    
router.delete('/deleteCertificate', async (req, res) => {
  try {
    const { certificateid } = req.body;
    if (await Certificate.findOne({ certificateid:certificateid })) {
      await Certificate.deleteOne({ certificateid:certificateid });
      res.status(200).json({ msg: 'Certificate deleted successfully' })
    }
    else {
      res.status(404).json({ msg: 'Certificate not found' })
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' })
  }
})

export {router}