interface SteamData {
  apiKey: string;
}

export const getUserData = async (data: SteamData) => {
  const result = await callApi(data.apiKey);

  return result;
};

async function callApi(query: string) {
  const res = await fetch(`/api/steam/test-user-data/?apiKey=${query}`);
  if (!res.ok) {
    return { error: "An unexpected error occurred" };
  } else return res.json();
}
