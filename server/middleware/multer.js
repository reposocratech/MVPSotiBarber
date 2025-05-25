import multer from 'multer'

export const uploadImage = (folder) =>{
  const storage = multer.diskStorage({
    destination: `./public/images/${folder}`,
    filename: (req, file, callback) => {
      callback(null, "Id-" + Date.now() + "-" + file.originalname)
    }
  })

  const upload = multer({storage}).single("file");

  return upload;
}