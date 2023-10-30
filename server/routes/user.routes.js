import express from 'express'
import productCtrl from '../controllers/product.controller.js'
const router = express.Router()

router.route('/api/products')
	/*.get((req, res) => {
		console.log('GET /api/products'); // Debug print
		productCtrl.list(req, res); // List all products
	})*/

	.get(productCtrl.list) //list all products
	.post(productCtrl.create) //create a new product
	.delete(productCtrl.removeAll) //delete all products
	.get(productCtrl.searchByName);  //find products by name containing a keyword

router.route('/api/products/:productId')
	.get(productCtrl.read) //return a specific product by ID
	.put(productCtrl.update) //update a specific product by ID
	.delete(productCtrl.remove) //delete a specific product by ID


router.param('productId', productCtrl.productByID)

export default router

/* Another way to breakdown all the codes in POSTMAN
router.route('/api/users').post(userCtrl.create)
router.route('/api/users').get(userCtrl.list)
router.param('userId', userCtrl.userByID)
router.route('/api/users/:userId').get(userCtrl.read)
router.route('/api/users/:userId').put(userCtrl.update)
router.route('/api/users/:userId').delete(userCtrl.remove) */

