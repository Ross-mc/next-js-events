export default function(req, res){
  if (req.method === "POST"){
    // const eventId = req.params.eventid
    const eventId = req.query.eventid
    console.log(eventId)
    //here we would actually send this to a DB
    //but just demonstrating how the API feature works in next.js
    res.json({email: req.body.email, text: req.body.text, name: req.body.name})
  } else {
    res.status(400)
  }
}