const express = require('express');

const router = express.Router();

const mongodb = require('mongodb');
const uri = 'mongodb+srv://Gabriel:1234@cluster0.zrcrx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new mongodb.MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

//Listagem dos posts
router.get('/', async(req, res) =>{
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

//Criação dos posts
router.post('/', async (req, res)=>{
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()

    })
    res.status(201).send();
});

//Remoção dos posts
router.delete('/:id', async (req, res)=>{
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})


async function loadPostsCollection(){
    await client.connect();
    return client.db('vue_express').collection('posts');
}    


module.exports = router; 