interface PSNData {
  npsso: string;
}

export const getGameData = async (data: PSNData) => {
  const result = await callApi(data.npsso);

  return result;
};

async function callApi(query: string) {
  const res = await fetch(`/api/psn/test-game-data/?npsso=${query}`);
  if (!res.ok) {
    return { error: "An unexpected error occurred" };
  } else return res.json();
}
