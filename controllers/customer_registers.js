const customers = require('../models').customer_registers;
const fileupload = require('../models').customer_register_files;
const multer = require('multer');
const fs = require('fs-extra');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/upload/',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        '-' +
        new Date().toISOString() +
        path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage,
}).single('file_url');

module.exports = {
  register: (req, res) => {
    const { role } = req.params;
    const {
      name,
      address,
      kelurahan,
      code_pos,
      contact_number,
      email,
      identity_number,
      //   location,
      isp_name,
      isp_contact_number,
      isp_email,
    } = req.body;
    if (role === 'Customer') {
      customers
        .create({
          name,
          address,
          kelurahan,
          code_pos,
          contact_number,
          email,
          identity_number,
          //   location,
          role,
        })
        .then((user) => {
          res.status(200).json({
            status: true,
            message: 'Customer Created Successfully',
            user,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    } else if (role === 'ISP') {
      customers
        .create({
          name,
          address,
          kelurahan,
          code_pos,
          contact_number,
          email,
          identity_number,
          //   location,
          isp_name,
          isp_contact_number,
          isp_email,
          role,
        })
        .then((user) => {
          const fileUploadData = files.map((file) => ({
            file_url: req.file.file_url,
            customer_register_id: user.id,
          }));
          return fileupload.bulkCreate(fileUploadData).then((info) => {
            res.send({
              message: 'Successfully registered the customer info',
              info,
            });
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    }
  },
  uploadfile: (req, res) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        const file = req.file.filename;
        const extension = file.split('.');
        const filename = extension[extension.length - 1];
        function isImage(filename) {
          switch (filename) {
            case 'pdf':
              return true;
          }
          return false;
        }
        if (!isImage(filename)) {
          const message = 'Oops!, File allowed only PDF';
          res.status(500).json({
            message,
          });
          fs.unlink(`./public/upload/${req.file.filename}`);
        } else {
          fileupload
            .create({
              file_url: req.file.filename,
            })
            .then((user) => {
              res.status(200).json({
                status: true,
                message: 'Customer ISP Upload File Successfully',
                user,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: err.message,
              });
            });
        }
      }
    });
  },
};
