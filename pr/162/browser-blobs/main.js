import init, { BlobsNode } from "./wasm/blobs_wasm.js";

await init();

log("launching iroh endpoint …");

const blobs = await BlobsNode.spawn();
console.log(blobs);

log("iroh endpoint launched");
log(`our node id: ${blobs.endpoint_id()}`);

document.querySelector(".forms").style.display = "flex";
console.log(document.querySelector(".forms").style);

// when submitting the import form: import a blob and show a ticket
document.querySelector("form#import").onsubmit = (e) => {
  e.preventDefault();
  const string = new FormData(e.target).get("data");
  if (!string) return;
  const bytes = new TextEncoder().encode(string);
  importBlob(bytes);
};

// copy button copies ticket
document.querySelector("form#import #copy").onclick = () => {
  const ticket = document.querySelector("form#import #print-ticket").value;
  if (!ticket) return;
  navigator.clipboard.writeText(ticket);
};

// when submitting the download form: download a blob from a ticket
document.querySelector("form#download").onsubmit = (e) => {
  e.preventDefault();
  const ticket = new FormData(e.target).get("ticket");
  if (!ticket) return;
  downloadBlob(ticket);
};

async function downloadBlob(ticket) {
  try {
    log("downloading...");
    const hash = await blobs.download(ticket);
    log("download finished");
    log(`hash: ${hash}`);
    const size = await blobs.complete_size(hash);
    log(`blob size: ${size}`);
    if (size < 1024 * 1024) {
      try {
        const data = await blobs.get(hash);
        const text = new TextDecoder().decode(data);
        log(`content: ${text}`);
        document.querySelector("form#download #print-text").value = text;
      } catch (_err) {
        log(`(invalid utf-8)`);
      }
    }
  } catch (err) {
    log(`download failed: ${err}`);
  }
}

async function importBlob(blobData) {
  try {
    log("importing ...");
    const result = await blobs.import(blobData);
    log(`ticket: ${result}`);
    document.querySelector("form#import #print-ticket").value = result;
  } catch (err) {
    log(`import failed: ${err}`);
  }
}

function log(line, className) {
  const time = new Date().toISOString().substring(11, 22);
  const el = document.createElement("div");
  el.innerHTML = `<span class=time>${time}: </span>${line}`;
  if (className) el.classList.add(className);
  document.querySelector("main").appendChild(el);
}
