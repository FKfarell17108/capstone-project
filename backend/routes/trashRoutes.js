const express = require('express')
const { getAllTrash, getTrashById, createTrash, updateTrash, deleteTrash } = require('../controllers/trashController')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/') // folder penyimpanan
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const ext = path.extname(file.originalname)
      cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
  })
  
  const upload = multer({ storage })

router.get('/trash', authMiddleware(['user','collector']),getAllTrash)
router.get('/trash/:id', authMiddleware(['user','collector']), getTrashById)
router.post('/trash', authMiddleware(['user']),upload.single('image'), createTrash)
router.put('/trash/:id', authMiddleware(['user']), upload.single('image'), updateTrash)
router.delete('/trash/:id', authMiddleware(['user']),deleteTrash)

module.exports = router
