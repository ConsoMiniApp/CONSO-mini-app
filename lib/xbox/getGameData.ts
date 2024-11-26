interface TestRequest {
  value: string;
}

export const getGameData = async (data: TestRequest) => {
  const result = await callApi(data);

  return result;
};

async function callApi(query: TestRequest) {
  const res = await fetch(`/api/xbox/test-game-data/?testParam=${query.value}`);
  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & { status: number };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}
