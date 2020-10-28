export default function Favorites({ data }) {
  return (
    <section>
      <h2>List of favorites</h2>
      <ul>
        {data.map((favorite) => (
          <li key={favorite.id}>
            {favorite.title}
            <br />
            {favorite.price}
            <br />
            {favorite.description}
            <br />
            {favorite.category}
            <br />
            {favorite.image}
          </li>
        ))}
      </ul>
    </section>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/favorites`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
