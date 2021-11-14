import express from 'express';
import User from '../modules/user.js';
import bcrypt from 'bcrypt';
const router = express.Router();

router.get('/', async(req, res)=>{
    try{
        let users = await User.find();
        res.json({message: 'success', data: users});
    }
    catch(err){
        console.error(err);
    }
});

// /users/login
router.get('/login', async (req, res) => {
    const { username, password } = req.query;
    try{
        let account = await User.findOne({username: username});
        if(!account){
            return res.json({message: 'incorrect username or password'});
        }

        const validPassword = await bcrypt.compare(password, account.password);
        if(!validPassword) {
            return res.json({message: 'incorrect username or password'});
        }
        await User.updateOne({username: username},{$set: {isOnline: true}}),()=>{
            console.log('online')
        };
        // await account.save();
        res.json({message: 'success', account: account})
    }
    catch(err){
        console.error(err);
        res.json({message: 'server error'});
    }
});

router.post('/logout',async (req,res)=>{
    const { username } = req.query;
    try{
        let account = await User.findOneAndUpdate({username: username},{$set: {isOnline: false}});

        if(!account){
            return res.json({message: 'incorrect username or password'});
        }
        
        res.json({message: 'success'})
    }
    catch(err){
        console.error(err);
        res.json({message: 'server error'});
    }

})


// /users/register
router.post('/register',async (req, res) => {
    try{
        let account = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
    
        const salt = await bcrypt.genSalt(10);
        account.password = await bcrypt.hash(account.password, salt);

        await account.save();
        res.json({message: 'success'});
    }
    catch(err){
        
        let CheckUsername = await User.findOne({username: req.body.username});
        if(CheckUsername){
            return res.json({message : 'username already exist'});
        }
        console.log(err);
        res.json({message: 'server error'});
    }
})

export default router;