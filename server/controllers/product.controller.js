import products from '../models/product.model.js'  //import [CollectionName!!]
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => {
	const product = new products(req.body)
	try {
		await product.save()
		return res.status(200).json({
			message: "Successfully Created Products!"
		})
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}

const productByID = async (req, res, next, id) => {
	try {
		let product = await products.findById(id)
		if (!product)
			return res.status('400').json({
				error: "Product not found"
			})
		req.product = product;
		next()
	} catch (err) {
		return res.status('400').json({
			error: "Could not retrieve product"
		})
	}
}
const read = (req, res) => {
	return res.json(req.product)  //return the product object by specific ID
}

const list = async (req, res) => {
	/*try {
		console.log('Listing all products');
		let productlist = await products.find().select('name description price quantity category');
		res.json(productlist);
	} catch (err) {
		console.error('Error in list:', err);
		const error = errorHandler.handleError(err);
		return res.status(400).json({
			error: errorHandler.getErrorMessage(error)
		});
	} */
	try {
		let productlist = await products.find().select('name description price quantity category')
		res.json(productlist)
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}

const update = async (req, res) => {
	try {
		let product = req.product
		product = extend(product, req.body)
		product.updated = Date.now()
		await product.save()  //update and save the product
		res.json(product)
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}

const remove = async (req, res) => {
	try {
		let product = req.product
		let deletedProduct = await products.deleteOne()  //delete the product
		res.json(deletedProduct)
	} catch (err) {
		/*res.status(400).json({message:"Data not Deleted"})*/
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		})
	}
}

// Function to remove all products
const removeAll = async (req, res) => {
	try {
		await products.deleteMany({});
		res.json({ message: "All products removed successfully!" });
	} catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		});
	}
}

// Function to find products by name containing a keyword
const searchByName = async (req, res) => {
	try {
		const keyword = req.query.name;
		//debug logging
		//console.log('Received keyword:', keyword);

		const productList = await products.find({ name: { $regex: keyword, $options: 'i' } });
		//debug logging
		//console.log('Found products:', productList);

		res.json(productList);
	}
	catch (err) {
		return res.status(400).json({
			error: errorHandler.getErrorMessage(err)
		});
	}
}

export default { create, productByID, read, list, remove, update, removeAll, searchByName }
