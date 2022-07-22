const fs = require("fs");

let jobs = require("data/jobs.json");

export const JobsRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

function getAll() {
  return jobs;
}

function getById(id) {
  return jobs.find((x) => x.id.toString() === id.toString());
}

function create({ title, description, company, role, website, ...extras }) {
  const job = { title, description, company, role, website, extras };

  // validate
  if (jobs.find((x) => x.id === job.id))
    throw `job with the id ${job.id} already exists`;

  // generate new job id
  job.id = jobs.length ? Math.max(...jobs.map((x) => x.id)) + 1 : 1;

  // set date created and updated
  job.dateCreated = new Date().toISOString();
  job.dateUpdated = new Date().toISOString();

  // add and save job
  jobs.push(job);
  saveData();
}

function update(id, { title, description, company, role, website }) {
  const params = { title, description, company, role, website };
  const job = jobs.find((x) => x.id.toString() === id.toString());

  // validate
  if (params.id !== job.id && jobs.find((x) => x.id === params.id))
    throw `job with the id ${params.id} already exists`;

  // only update website if entered
  if (!params.website) {
    delete params.website;
  }

  // set date updated
  job.dateUpdated = new Date().toISOString();

  // update and save
  Object.assign(job, params);
  saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
  // filter out deleted job and save
  jobs = jobs.filter((x) => x.id.toString() !== id.toString());
  saveData();
}

// private helper functions

function saveData() {
  fs.writeFileSync("data/jobs.json", JSON.stringify(jobs, null, 4));
}
