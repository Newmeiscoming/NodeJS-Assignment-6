const router = require('express').Router();

const Blog = require('../models/Blog')

// Your routing code goes here

router.get('/blog',async (req,res)=>{
    try{
        const search = req.query.search;
        const page = req.query.page;
        const resultData = await Blog.find({topic:search});
        console.log(resultData);
        let endPoint;
        if(5*page>resultData.legth){
            endPoint = resultData.length-1;
        }
        else{
            endPoint = 5*page-1;
        }

        const resultant = resultData.slice((page*5)-5,endPoint);
        if(resultant.length===0||page==""||page<1){
            return res.status(200).json({
                status:"failed",
                message:"Please provide the valid page number"
            })
        }

        res.status(200).json({status:"Success",result:resultant});
        
        


    }catch(e){

        res.status(404).json({
            status:"failed",
            message:e
        });
    }
    
})

router.post('/blog',async (req,res)=>{
    
    try{
        const user = await Blog.create(req.body);
        
        console.log("New blog added Successfully");
        res.status(201).json({status:"Success",
        result:user});
    }catch(e){
        res.status(404).json({
            status:"failed",
            message:e
        });
    }
})
router.put('/blog/:id',async (req,res)=>{
    try{
        const id = req.params.id;
        
        if(!id){
            return res.status(400).json({
                status:"failed",
                messsage:"Id not found"
            })
        }
        const update = await Blog.findByIdAndUpdate({_id:id},req.body,{
            new:true
        })
        console.log("Data updated")
        res.status(200).json({
            status:"Success",
            result:update});
    }catch(e){
        res.status(404).json({
            status:"failed",
            message:e
        })
    }
    
})

router.delete('/blog/:id',async (req,res)=>{
    try{
       
        const id = req.params.id;
        if(!id){
            return res.status(400).json({
                status:"failed",
                messsage:"Id not found"
            })
        }
        const deleteData = await Blog.findByIdAndDelete({_id:id},req.body);
        console.log("Data deleted Successfully")
        res.status(200).json({
            status:"Success",
            result:deleteData});
    }catch(e){
        res.status(404).json({
            status:"failed",
            message:e
        })
    }
    
})

module.exports = router;