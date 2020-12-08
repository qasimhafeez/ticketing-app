import nats, { Stan } from "node-nats-streaming";

class NatsWrapper {
  // Might be undefined for some period of time
  private _client?: Stan;

  // getter
  get client() {
    if (!this._client) {
      throw new Error("Cannot access NATS client before connecting");
    }

    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    this._client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });
    process.on("SIGINT", () => {
      this.client.close();
    });
    process.on("SIGTERM", () => {
      this.client.close();
    });

    return new Promise((resolve, reject): void => {
      this.client.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });
      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
