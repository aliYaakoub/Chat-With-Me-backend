import express from 'express';
import Message from '../modules/message.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        let { toUser, fromUser } = req.query;
        let OutMessages = await Message.find({from: fromUser, to:toUser}).sort('date');
        let InMessages = await Message.find({from: toUser, to: fromUser}).sort('date')
        let messages = [...OutMessages,...InMessages]
        // let messages = await Message.find({
        //     $aggregate: [
        //         {from: fromUser, to:toUser},
        //         {from: toUser, to: fromUser}
        //     ]
        // }).sort('date')
        if(!messages){
            res.json({message: 'no messages found'})
        }
        res.json({messages: 'found', data: messages})
    }
    catch(err){
        console.error(err);
        res.json({message: 'server error'});
    }
});

router.post('/', async (req, res)=>{
    try{
        let message = new Message({
            to: req.body.to,
            from: req.body.from,
            content: req.body.content
        })
        await message.save();
        res.json({message: 'success'})
    }
    catch(err){
        console.error(err.message);
        res.json({message: 'server error'});
    }
})

export default router;