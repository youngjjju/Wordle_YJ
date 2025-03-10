export default async function RandomWordFetcher() {
  const res = await fetch(
    "https://random-word-api.herokuapp.com/word?length=5"
  );
  const data = await res.json();

  return data[0];
}
