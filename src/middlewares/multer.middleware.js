import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const paths = path.resolve("./public/uploads");
        cb(null, paths);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

export const upload = multer({ storage: storage });

