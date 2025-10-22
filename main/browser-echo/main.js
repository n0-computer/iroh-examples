import init, { EchoNode } from "./wasm/browser_echo.js";
await init();

log("launching iroh endpoint …");

const node = await EchoNode.spawn();

log("iroh endpoint launched");
log("our endpoint id: " + node.endpoint_id());

log("connect from the command line:");
log("git clone https://github.com/n0-computer/iroh-examples.git", "cmd");
log("cd iroh-examples/browser-echo", "cmd");
log(
  `cargo run --features cli -- connect ${node.endpoint_id()} "hi from cli"`,
  "cmd",
);
const link = createConnectLink(node.endpoint_id(), "hi from browser");
log(`connect from the browser: ${link}`);
log("waiting for connections …");

// show the form and connection logs
document.querySelector(".spawned").style = "display: block";
// initiate outgoing connections on form submit
document.querySelector("form#connect").onsubmit = onConnectSubmit;
// fill the connect form
fillFormFromUrlAndSubmit();

// log events for incoming connections
(async () => {
  const $incoming = document.querySelector("#incoming");
  for await (const event of node.events()) {
    console.log("incoming event", event);
    const endpointId = event.endpoint_id;
    delete event.endpoint_id;
    logNodeEvent($incoming, endpointId, JSON.stringify(event));
  }
})();

// initiate outgoing connections on form submit
async function onConnectSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const endpointId = data.get("endpoint-id");
  const payload = data.get("payload");
  if (!endpointId || !payload) return;

  const $outgoing = document.querySelector("#outgoing");
  try {
    logNodeEvent($outgoing, endpointId, "connecting …");
    const stream = node.connect(endpointId, payload);
    for await (const event of stream) {
      logNodeEvent($outgoing, endpointId, JSON.stringify(event));
    }
  } catch (err) {
    logNodeEvent($outgoing, endpointId, `connection failed: ${err}`, "error");
  }
}

function log(line, className, parent) {
  const time = new Date().toISOString().substring(11, 22);
  if (!parent) parent = document.querySelector("main");
  const el = document.createElement("div");
  line = `<span class=time>${time}: </span>${line}`;
  el.innerHTML = line;
  if (className) el.classList.add(className);
  parent.appendChild(el);
}

function logNodeEvent(container, endpointId, event, className) {
  let nodeDiv = container.querySelector(`.node-${endpointId}`);
  if (!nodeDiv) {
    nodeDiv = document.createElement("div");
    nodeDiv.classList.add("node");
    nodeDiv.classList.add(`node-${endpointId}`);
    const heading = document.createElement("h3");
    heading.innerText = endpointId;
    nodeDiv.appendChild(heading);
    container.appendChild(nodeDiv);
  }
  log(`${event}`, className, nodeDiv);
}

function fillFormFromUrlAndSubmit() {
  const $form = document.querySelector("form#connect");
  const url = new URL(document.location);
  $form.querySelector("[name=endpoint-id]").value =
    url.searchParams.get("connect") || "";
  $form.querySelector("[name=payload]").value =
    url.searchParams.get("payload") || "";
  document.querySelector("form#connect").requestSubmit();
}

function createConnectLink(endpointId, payload) {
  const ourUrl = new URL(document.location);
  ourUrl.searchParams.set("connect", endpointId);
  ourUrl.searchParams.set("payload", payload);
  return `<a href="${ourUrl}" target="_blank">click here</a>`;
}
