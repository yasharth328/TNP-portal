import { fetchWrapper } from "jobsHelper/fetch-wrapper";

export const jobService = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

// const baseUrl = `${apiUrl}/jobs`;
const baseUrl = "http://localhost:3000/api/jobs";

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
  console.log(params);
  return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}/${id}`, params).then((x) => {return x});
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}/${id}`);
}
