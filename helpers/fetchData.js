import useSWR from "swr";

const urls = "https://competitive-coding-api.herokuapp.com/api/";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const FetchData = (userName, plateForm) => {
  if (!userName) {
    throw new Error("User Name is required");
  }
  const url = urls + plateForm + "/" + userName;
  const { data, error } = useSWR(url, fetcher);
  return { data, error };
};
