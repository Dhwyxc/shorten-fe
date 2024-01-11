import stringifyUrl from "@helper/stringifyUrl";
import axios from "axios";

export const getShorten = async (query) => {
  const { data } = await axios.get(stringifyUrl({ url: `shortens`, query }));
  return data;
};
export const showShorten = async (id) => {
  const { data } = await axios.get(`shortens/r/${id}`);
  return data;
};
export const createShorten = async (input) => {
  const { data } = await axios.post(`shortens`, input);
  return data;
};
export const collectInfo = async (id, input) => {
  const { data } = await axios.post(`shortens/collect/${id}`, input);
  return data;
};
export const fetchAnalysis = async (id, query) => {
  const { data } = await axios.get(
    stringifyUrl({ url: `shortens/analysis/${id}`, query })
  );
  return data;
};
export const createBulkShorten = async (input) => {
  const { data } = await axios.post(`shortens/bulk/create`, input);
  return data;
};
export const updateShorten = async (id, input) => {
  const { data } = await axios.patch(`shortens/${id}`, input);
  return data;
};
export const deleteShorten = async (id) => {
  const { data } = await axios.delete(`shortens/${id}`);
  return data;
};
export const deleteBulkShorten = async (input) => {
  const { data } = await axios.delete(`shortens/bulk/delete`, {
    data: { ids: input },
  });
  return data;
};
