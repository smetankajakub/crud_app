var Userdb = require('../model/model');

// create and save new user
exports.create =(req, res)=>{
    //validate req
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    //save user in the db
    user
        .save(user)
        .then( data=>{
            // res.send(data)
            res.redirect('/add-user');
        }).catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            })
        })
}

// retrieve and return all users / retrieve or return single user

exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id).then(data =>{
            if(!data){
                res.status(404).send({message: "Not found user with id" + id})
            } else {
                res.send(data)
            }
        }).catch(err=>{
            res.status(500).send({message: "Error retrievinf with id " + id})
        })
    }else {
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "Error Occured while retriving user information"});
        })
    }

}

//update a new identified iser by user id
exports.update=(req, res)=>{
    if(!req.body){
        return res.status(400).send({message: err.message || "Error Occured while retriving user information"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot update user with" + id + "Maybe usr not found!"})
        } else {
            res.send(data)
        }
    }).catch(err=>{
        res.status(500).send({
            message: "Error Update user infomation"
        })
    })
}

//Delete a user with specified user id in the request 
exports.delete = (req, res)=>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id, req.body, { useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot delete user with" + id + "Maybe id is wrong!"})
        } else {
            res.send({message: " User was deleted successfully!"});
        }
    }).catch(err=>{
        res.status(500).send({
            message: "Error Update user infomation" + id
        })
    })
}