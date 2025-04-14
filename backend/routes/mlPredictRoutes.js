const express = require('express')
const axios = require('axios')
const FormData = require('form-data')
const multer = require('multer')
const fs = require('fs')

const router = express.Router()
const upload = multer({ dest: 'uploads/' })

router.post('/predict', upload.single('file'), async (req, res) => {
  try {
    const form = new FormData()
    form.append('file', fs.createReadStream(req.file.path))

    const response = await axios.post('https://puunnnpun-ml-crashtocash.hf.space/predict', form, {
      headers: form.getHeaders()
    })

    res.json({
      success: true,
      result: response.data
    })

    // Hapus file dari uploads/ setelah dipakai
    fs.unlinkSync(req.file.path)
  } catch (error) {
    console.error('Error from Flask API:', error.message)
    res.status(500).json({
      success: false,
      message: 'Gagal ambil prediksi dari model ML'
    })
  }
})

module.exports = router
