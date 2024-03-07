const formidable = require("formidable");
const fs = require("fs");

module.exports = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    for (let key in fields) {
      req.body[key] = fields[key][0];
    }
    if (err)
      return res.status(400).json({
        error: "Images could not uploaded !",
      });
    if (files.images) {
      let uploads = [];
      files.images.map((image) => {
        if (image.size > Math.pow(10, 7))
          return res.status(400).json({
            error: "Image should be less than 10 mb in size !",
          });
        let upload = {
          data: fs.readFileSync(image.filepath),
          contentType: image.mimetype,
        };
        uploads.push(upload);
      });
      req.body.images = uploads;
    }
    next();
  });
};
