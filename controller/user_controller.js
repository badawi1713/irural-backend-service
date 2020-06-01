const jwt = require('jsonwebtoken');
const userModel = require('../models').Customers;
const photoModel = require('../models').Photo;
const multer = require('multer');
const fs = require('fs-extra');
//const uploadMiddleware = require('../middlewares/upload');
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
}).single('photo');

module.exports = {
  register: (req, res) => {
    const { role } = req.params;
    const {
      nama,
      nama_isp,
      email,
      phone,
      provinsi,
      kelurahan,
      kodepos,
      alamat,
      nik,
      // currentLocation,
    } = req.body;
    if (role === 'Customer') {
      userModel
        .create({
          nama,
          email,
          phone,
          provinsi,
          kelurahan,
          kodepos,
          alamat,
          // currentLocation,
          nik,
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
    } else if (req.params.role === 'ISP') {
      console.log('haloo', req.body.nama_isp);
      userModel
        .create({
          nama,
          nama_isp,
          email,
          phone,
          provinsi,
          kelurahan,
          kodepos,
          alamat,
          nik,
          role,
        })
        .then((user1) => {
          res.status(200).json({
            status: true,
            message: 'Customer ISP Created Successfully',
            user1,
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
          fs.unlink(`./public/images/${req.file.filename}`);
        } else {
          photoModel
            .create({
              photo: req.file.filename,
              photoId: req.params.id,
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
  takefile: (req, res) => {
    userModel
      .findAll({
        where: { role: 'Customer' },
        limit: 5,
        order: [['createdAt', 'ASC']],
      })
      .then((data) => {
        if (data) {
          res.status(200).json({
            status: true,
            message: 'Customer Found',
            data: data,
          });
        } else {
          res.status(200).json({
            status: false,
            message: 'No Customer Found',
          });
        }
      });
  },
  take: (req, res) => {
    userModel
      .findAll({
        where: { role: 'ISP' },
      })
      .then((data) => {
        if (data) {
          res.status(200).json({
            status: true,
            message: 'Customer ISP Found',
            data: data,
          });
        } else {
          res.status(200).json({
            status: false,
            message: 'No Customer ISP Found',
          });
        }
      });
  },
  getAll: (req, res) => {
    photoModel.findAll({}).then((data) => {
      if (data) {
        res.status(200).json({
          status: true,
          message: 'get all upload Found',
          data: data,
        });
      } else {
        res.status(200).json({
          status: false,
          message: 'No File ISP Found',
        });
      }
    });
  },
  getByid: (req, res) => {
    photoModel
      .findOne({ where: { id: { [Op.eq]: req.params.id } } })
      .then((data) => {
        if (data) {
          res.status(200).json({
            status: true,
            message: 'get file Found',
            data: data,
          });
        } else {
          res.status(200).json({
            status: false,
            message: 'No file ISP Found',
          });
        }
      });
  },
  getAllByid: (req, res) => {
    photoModel
      .findAll({ where: { photoId: { [Op.eq]: req.params.id } } })
      .then((data) => {
        if (data) {
          res.status(200).json({
            status: true,
            message: 'get all upload file Found',
            data: data,
          });
        } else {
          res.status(200).json({
            status: false,
            message: 'No upload file Found',
          });
        }
      });
  },
};
