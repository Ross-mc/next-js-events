import {useRouter} from "next/router"

const Event = () => {
  const router = useRouter();

  return (
    <div>
      <h1>The eventID is {router.query.eventid}</h1>
    </div>
  )
}

export default Event