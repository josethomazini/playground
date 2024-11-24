import retry from "async-retry";

async function fetchStatusPage() {
  const response = await fetch("http://localhost:3000/api/v1/status");
  await response.json();
}

async function waitForWebServer() {
  return retry(fetchStatusPage, { retries: 100 });
}

async function waitForAllServices() {
  await waitForWebServer();
}

export default {
  waitForAllServices,
};
