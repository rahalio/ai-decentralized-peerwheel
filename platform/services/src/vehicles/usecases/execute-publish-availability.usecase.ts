/**
 * ExecutePublishAvailability — Peerwheel (hand-fit after codegen).
 */

import type { PublishAvailabilityInput, PublishAvailabilityOutput } from "../dto/availability.dto";
import type { ExecutionContextService, IdGeneratorService } from "@peerwheel/services/_shared/index.js";
import type { AvailabilityPublisher } from "../ports";
import { NotFoundError, ValidationError } from "../errors";

export class ExecutePublishAvailability {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly availabilityPublisher: AvailabilityPublisher,
  ) {}

  async execute(input: PublishAvailabilityInput): Promise<PublishAvailabilityOutput> {
    const correlationId = this.idGenerator.vehId();
    if (!input) {
      throw new ValidationError("Input is required");
    }
    if (!(input as any).vehicleId) {
      throw new ValidationError("vehicleId is required");
    }
    const vehicleId = (input as any).vehicleId;
    const entity = await this.availabilityPublisher.publishAvailability({
      ...input,
      vehicleId,
      orgId: this.context.getOrgId(),
      correlationId,
    } as any);
    if (!entity) {
      throw new NotFoundError(`Entity not found: ${vehicleId}`);
    }
    return entity as PublishAvailabilityOutput;
  }
}
