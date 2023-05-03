
const Supplier = require('../models/SupplierModel')

module.exports = {

    addSupplier: async (req, res) => {
        try {
            const ID = await Supplier.addSupplier(req.body)
            return res.status(200).json({
                supplier_ID: ID,
                message: 'Success'
            })
        } catch (error) {
            return res.status(500).res.status(200).json({
                supplier_ID: -1,
                message: error.message
            })
        }
    }
}