import { fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = "https://dashboard-account-server.herokuapp.com";
// const apiUrl = "https://dashboard-client-umber.vercel.app";
const httpClient = fetchUtils.fetchJson;

const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ headers, json }) => ({
      data: json.map((resource) => ({ ...resource, id: resource._id })),
      total: parseInt(headers.get("content-range")?.split("/").pop(), 5),
    }));
  },
  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: { ...json, id: json._id },
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({
      data: json.map((resource) => ({ ...resource, id: resource._id })),
    }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json.map((resource) => ({ ...resource, id: resource._id })),
      total: parseInt(headers.get("content-range")?.split("/").pop(), 5),
    }));
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ data, json }) => ({ ...json, id: json._id, data: data })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}/update?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: {
        accept: "application/json",
      },
    }).then(({ json, msg }) => ({
      data: { ...params.data, id: json._id, msg },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${JSON.stringify(params.id)}`, {
      method: "DELETE",
    }).then(({ data, json }) => ({
      ...json,
      id: json._id,
      data: data,
    })),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.id }),
    };
    return httpClient(
      `${apiUrl}/${resource}?${JSON.stringify(stringify(query))}`,
      {
        method: "DELETE",
        body: JSON.stringify(params.data),
      }
    ).then((responses) => ({
      data: responses.map(({ json }) => ({ ...json, id: json.id })),
    }));
  },
};

export default dataProvider;
