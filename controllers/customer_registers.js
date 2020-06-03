const customer = require("../models").customer_registers;
const FileUpload = require("../models").customer_register_files;
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const storage = multer.diskStorage({
  destination: "./public/upload/",
  filename: (req, file, cb) => {
    const filename = file.originalname;
    const splitted = filename.split(".");
    const extension = splitted[splitted.length - 1];
    function isImage(extension) {
      switch (extension) {
        case "pdf":
          return true;
      }
      return false;
    }
    if (!isImage(extension)) {
      const message = "Oops!, File allowed only PDF";
      cb({ message });
    } else {
      cb(
        null,
        file.fieldname +
          "-" +
          new Date().toISOString() +
          path.extname(file.originalname)
      );
    }
  },
});
const upload = multer({
  storage,
}).array("file_url");

module.exports = {
  uploadfile: (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        next();
      }
    });
  },

  Register: (req, res, next) => {
    const { role } = req.params;
    const { files } = req;
    const {
      name,
      address,
      subdistrict,
      province,
      zip_code,
      contact_number,
      email,
      identity_number,
      //   location,
      isp_name,
      isp_contact_number,
      isp_email,
    } = req.body;
    if (role === "Customer") {
      customer
        .create({
          name,
          address,
          subdistrict,
          province,
          zip_code,
          contact_number,
          email,
          identity_number,
          //   location,
          role,
        })
        .then((user) => {
          res.status(200).json({
            status: true,
            message: "Customer Created Successfully",
            user,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message,
          });
        });
    } else if (role === "ISP") {
      customer
        .create({
          name,
          address,
          subdistrict,
          province,
          zip_code,
          contact_number,
          email,
          identity_number,
          //   location,
          isp_name,
          isp_contact_number,
          isp_email,
          role,
        })
        .then((newCustomer) => {
          const fileUploadData = files.map((file) => ({
            file_url: file.path,
            customer_register_id: newCustomer.id,
          }));
          return FileUpload.bulkCreate(fileUploadData);
        })
        .then((info) => {
          res.send({
            message: "Successfully registered the customers info",
            info,
          });
        })
        .catch((err) => {
          next(err);
        });
    }
  },
  allCustomer: (req, res) => {
    customer
      .findAll({
        where: { role: "Customer" },
        limit: 10,
        order: [["createdAt", "ASC"]],
      })
      .then((data) => {
        if (data) {
          res.status(200).json({
            status: true,
            message: "Customer Found",
            data: data,
          });
        } else {
          res.status(200).json({
            status: false,
            message: "No Customer Found",
          });
        }
      });
  },
  allIsp: (req, res) => {
    customer
      .findAll({
        where: { role: "ISP" },
        limit: 10,
        order: [["createdAt", "ASC"]],
      })
      .then((data) => {
        if (data) {
          res.status(200).json({
            status: true,
            message: "Customer Found",
            data: data,
          });
        } else {
          res.status(200).json({
            status: false,
            message: "No Customer Found",
          });
        }
      });
  },
  allFile: (req, res) => {
    FileUpload.findAll({}).then((data) => {
      if (data) {
        res.status(200).json({
          status: true,
          message: "get all upload Found",
          data: data,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "No File ISP Found",
        });
      }
    });
  },
  fileByid: (req, res) => {
    FileUpload.findOne({ where: { id: { [Op.eq]: req.params.id } } }).then(
      (data) => {
        if (data) {
          res.status(200).json({
            status: true,
            message: "get file Found",
            data: data,
          });
        } else {
          res.status(200).json({
            status: false,
            message: "No file ISP Found",
          });
        }
      }
    );
  },
  allfilesByid: (req, res) => {
    FileUpload.findAll({
      where: { customer_register_id: { [Op.eq]: req.params.id } },
    }).then((data) => {
      if (data) {
        res.status(200).json({
          status: true,
          message: "get all upload file Found",
          data: data,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "No upload file Found",
        });
      }
    });
  },
};
