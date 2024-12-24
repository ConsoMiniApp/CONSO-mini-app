export const validateTelgramUser = async (initDataString: string) => {
  const result = await callApi(initDataString);

  return result;
};

async function callApi(initDataString: string) {
  const res = await fetch(`/api/telegram/validate-data/?${initDataString}`);
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
