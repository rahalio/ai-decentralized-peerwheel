/**
 * AvailabilityPublisherAdapter — Peerwheel sandbox.
 */

import type { AvailabilityPublisher } from "@peerwheel/services/vehicles";
import type { AdapterDynamoDBClient } from "../_shared/dynamodb-client-types.js";
import { AvailabilityPublisherDdb } from "./availability-publisher.ddb.js";

export class AvailabilityPublisherAdapter implements AvailabilityPublisher {
  private readonly ddb: AvailabilityPublisherDdb;

  constructor(private readonly dynamoClient: AdapterDynamoDBClient) {
    this.ddb = new AvailabilityPublisherDdb(this.dynamoClient);
  }

  async publishAvailability(
    input: Parameters<AvailabilityPublisher["publishAvailability"]>[0]
  ): Promise<Awaited<ReturnType<AvailabilityPublisher["publishAvailability"]>>> {
    return await this.ddb.publishAvailability(input);
  }
}
