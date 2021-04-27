export default function(req, res){
  if (req.method === "POST"){
    res.json({email: req.body.email})
  } else {
    res.status(400)
  }
}