import {Router} from 'express';
import {CartManager} from '../CartManager.js'
import {__dirname} from '../utils.js'

const router = Router();
const managerCart = new CartManager(__dirname + '../carritos.json');


//Endpoint para crear nuevo carrito
router.post('/', async (req,res) => {
    try {
        const newCart = await managerCart.createCart();
        res.status(201).send({status:"success", payload : cart});
    } catch (err){
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al crear carrito'})
    }
});

//Endpoint para buscar carrito
router.get('/:cid', async (req, res) => {
    try{
        const {cid} = req.params;
        const cart = await managerCart.getCart(~~cid);
        if (cart) {
                res.status(200).send({ status: "success", payload: cart });
            } else {
                res.status(404).send({ status: "error", error: 'Carrito no encontrado' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({ status: "error", error: 'Error al obtener el carrito' });
        }  
});

//Endpoint para agregar un producto a un carrito
router.post('/:cid/product/:pid', async(req,res) =>{
    try{
        const {cid, pid} = req.params;
        const cart = await managerCart.addProductToCart(+cid, +pid);
        
        if (cart) {
            res.status(201).send({ status: "success", payload: cart });
        } else {
            res.status(404).send({ status: "error", error: 'Carrito o producto no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ status: "error", error: 'Error al agregar el producto al carrito'});
    }
})

export default router