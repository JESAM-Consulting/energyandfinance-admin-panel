          // Local
// const protocol = "http";
// const host = "192.168.29.127:5050/FE_API/lead_api/v1";

          // Live

          const protocol = "https";
          const host = "fe-lead-commen-api.rejoicehub.com/FE_API/lead_api/v1/";


const port = "";
const trailUrl = "";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}/`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  protocol: protocol,
  host: host,
  port: port,
  apiUrl: trailUrl,
  endpoint: endpoint,
  hostUrl: hostUrl,
};
