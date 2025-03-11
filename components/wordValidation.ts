export async function wordValidation(joinedWord: string) {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${joinedWord}`
  );
  if (response.ok) {
    const data = await response.json();
    if (data.length > 0 && data[0].word) {
      return true;
    }
  } else {
    return false;
  }
}
