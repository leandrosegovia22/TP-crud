const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = require('../utils/toThousand');
const finalPrice = require('../utils/finalPrice');

const controller = {
	index: (req, res) => {
		return res.render('index', {
			products,
			visited : products.filter(product => product.category === "visited"), // el filter devuelve un array
			inSale : products.filter(product => product.category === "in-sale"),
			toThousand,
			finalPrice,
		})
	},
	search: (req, res) => {
		if(req.query.keywords.trim() != ""){
			let result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim())); // toLowerCase() distingue las mayusculas y las minusculas, trim() elimina los espacios.
			return res.render('results', {
				result,
				toThousand,
				finalPrice,
				keywords : req.query.keywords, 
			})
		}else{
			res.redirect('/')
		}	
	},
};

module.exports = controller;
