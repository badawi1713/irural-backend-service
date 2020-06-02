const express = require('express');
const router = express.Router();
const customer_control = require('../controllers/customer_registers');
const auth = require('../middlewares/auth');

router.post(
  '/register/:role',
  customer_control.uploadfile,
  customer_control.Register
); //endpoint register customer and isp then upload files
router.get('/customer', auth.authentication, customer_control.allCustomer); // endpoint get all customers
router.get('/isp', auth.authentication, customer_control.allIsp); // endpoint get all customer isp
router.get('/files', auth.authentication, customer_control.allFile); // endpoint get all customer_files
router.get('/file/:id', auth.authentication, customer_control.fileByid); // endpoint get file id
router.get('/allfile/:id', auth.authentication, customer_control.allfilesByid); //endpoint get allfile by id(detail)

module.exports = router;
