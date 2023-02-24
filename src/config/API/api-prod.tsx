// const protocol = "https";
// const host = "63db-2405-201-200d-1b95-8439-4de4-8aa8-2bf6.ngrok.io/fecommen/FE_API/lead_api/v1/";


const protocol = "https";
const host = "fe-lead-commen-api.rejoicehub.com/FE_API/lead_api/v1/";


const port = "";
const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
