import {useRouter} from "next/router"

const FilteredEvents = () => {
  const router = useRouter();


  return (
    <div>
      <h1>Filtered Events</h1>
      <ul>
        {  router.query?.slug &&
          router.query.slug.map(slug => <li key={slug}>{slug}</li>)
        }
      </ul>
    </div>
  )
}

export default FilteredEvents