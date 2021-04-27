import axios from "axios"
export default function(req, res){
  if (req.method === "POST"){
    // const eventId = req.params.eventid
    const eventId = req.query.eventid
    axios.post("https://next-js-events-a3fc2-default-rtdb.firebaseio.com/comments.json", {
      email: req.body.email, 
      text: req.body.text, 
      name: req.body.name,
      eventId: eventId
    }).then(response => res.json(response))
    //here we would actually send this to a DB
    //but just demonstrating how the API feature works in next.js
  } else {
    res.status(400)
  }
}