// const protocol = "https";
// const host = "7072-2405-201-200d-1c68-7d2f-939d-60f1-375e.ngrok.io/fecommen/FE_API/lead_api/v1/";



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
