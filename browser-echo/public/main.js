import init, { EchoNode } from "./wasm/browser_echo.js";
await init();

log("launching iroh endpoint …");

const node = await EchoNode.spawn();

log("iroh endpoint launched");
log("our node id: " + node.node_id());

log("connect from the command line:");
log("git clone https://github.com/n0-computer/iroh-examples.git", "cmd");
log("cd iroh-examples/browser-echo", "cmd");
log(
  `cargo run --features cli -- connect ${node.node_id()} "hi from cli"`,
  "cmd",
);
const link = createConnectLink(node.node_id(), "hi from browser");
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
    const nodeId = event.node_id;
    delete event.node_id;
    logNodeEvent($incoming, nodeId, JSON.stringify(event));
  }
})();

// initiate outgoing connections on form submit
async function onConnectSubmit(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const nodeId = data.get("node-id");
  const payload = data.get("payload");
  if (!nodeId || !payload) return;

  const $outgoing = document.querySelector("#outgoing");
  try {
    logNodeEvent($outgoing, nodeId, "connecting …");
    const stream = node.connect(nodeId, payload);
    for await (const event of stream) {
      logNodeEvent($outgoing, nodeId, JSON.stringify(event));
    }
  } catch (err) {
    logNodeEvent($outgoing, nodeId, `connection failed: ${err}`, "error");
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

function logNodeEvent(container, nodeId, event, className) {
  let nodeDiv = container.querySelector(`.node-${nodeId}`);
  if (!nodeDiv) {
    nodeDiv = document.createElement("div");
    nodeDiv.classList.add("node");
    nodeDiv.classList.add(`node-${nodeId}`);
    const heading = document.createElement("h3");
    heading.innerText = nodeId;
    nodeDiv.appendChild(heading);
    container.appendChild(nodeDiv);
  }
  log(`${event}`, className, nodeDiv);
}

function fillFormFromUrlAndSubmit() {
  const $form = document.querySelector("form#connect");
  const url = new URL(document.location);
  $form.querySelector("[name=node-id]").value =
    url.searchParams.get("connect") || "";
  $form.querySelector("[name=payload]").value =
    url.searchParams.get("payload") || "";
  document.querySelector("form#connect").requestSubmit();
}

function createConnectLink(nodeId, payload) {
  const ourUrl = new URL(document.location);
  ourUrl.searchParams.set("connect", nodeId);
  ourUrl.searchParams.set("payload", payload);
  return `<a href="${ourUrl}" target="_blank">click here</a>`;
}
