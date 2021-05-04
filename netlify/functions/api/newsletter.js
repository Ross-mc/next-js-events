export default function(req, res){
  if (req.method === "POST"){
    //here we would actually send this to a DB
    //but just demonstrating how the API feature works in next.js
    res.json({email: req.body.email})
  } else {
    res.status(400)
  }
}

//see the course docs for mongodb version