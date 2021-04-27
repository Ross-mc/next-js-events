import axios from "axios"

export default function(req, res){
  if (req.method === "GET"){
    axios("https://next-js-events-a3fc2-default-rtdb.firebaseio.com/comments.json")
      .then(response => res.json(response.data))
  } else {
    res.status(400)
  }
}