export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Node's default resolver here points at 127.0.0.1 and refuses SRV
    // lookups (querySrv ECONNREFUSED), which breaks mongodb+srv:// URIs.
    const dns = await import("node:dns");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }
}
