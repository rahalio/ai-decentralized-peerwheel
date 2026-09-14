/**
 * Vehicles DDD Dependencies - Composition root (hand-fit for sandbox).
 */

import {
  AvailabilityPublisherAdapter,
  AvailabilityRepositoryAdapter,
  PullRepositoryAdapter,
  VehicleRepositoryAdapter,
  YieldForesightRepositoryAdapter,
} from "@peerwheel/adapters/vehicles";
import { getIdGeneratorService } from "@peerwheel/adapters";
import type { AdapterDynamoDBClient } from "@peerwheel/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteGetVehicle,
  ExecuteGetYieldForesight,
  ExecuteListAvailabilityWindows,
  ExecuteListVehicles,
  ExecutePublishAvailability,
  ExecutePullAvailability,
  ExecuteRegisterVehicle,
  ExecuteUpdateVehicle,
} from "@peerwheel/services/vehicles/usecases";
import type {
  AvailabilityPublisher,
  AvailabilityRepository,
  PullRepository,
  VehicleRepository,
  YieldForesightRepository,
} from "@peerwheel/services/vehicles/ports";

export interface VehiclesDomainModule {
  repos: {
    availabilities: AvailabilityRepository;
    availabilityPublishers: AvailabilityPublisher;
    pulls: PullRepository;
    vehicles: VehicleRepository;
    yieldForesights: YieldForesightRepository;
  };
  useCases: {
    availabilities: {
      get: ExecutePublishAvailability;
      list: ExecuteListAvailabilityWindows;
    };
    pulls: {
      get: ExecutePullAvailability;
    };
    vehicles: {
      create: ExecuteRegisterVehicle;
      get: ExecuteGetVehicle;
      list: ExecuteListVehicles;
      update: ExecuteUpdateVehicle;
    };
    yieldForesights: {
      get: ExecuteGetYieldForesight;
    };
  };
}

export function buildVehiclesDomainModule(
  dynamoClient: AdapterDynamoDBClient,
): VehiclesDomainModule {
  const repos = {
    availabilities: new AvailabilityRepositoryAdapter(dynamoClient),
    availabilityPublishers: new AvailabilityPublisherAdapter(dynamoClient),
    pulls: new PullRepositoryAdapter(dynamoClient),
    vehicles: new VehicleRepositoryAdapter(dynamoClient),
    yieldForesights: new YieldForesightRepositoryAdapter(dynamoClient),
  };

  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();

  const useCases = {
    availabilities: {
      get: new ExecutePublishAvailability(executionContext, idGenerator, repos.availabilityPublishers),
      list: new ExecuteListAvailabilityWindows(executionContext, idGenerator, repos.availabilities),
    },
    pulls: {
      get: new ExecutePullAvailability(executionContext, idGenerator, repos.pulls),
    },
    vehicles: {
      create: new ExecuteRegisterVehicle(executionContext, idGenerator, repos.vehicles),
      get: new ExecuteGetVehicle(executionContext, idGenerator, repos.vehicles),
      list: new ExecuteListVehicles(executionContext, idGenerator, repos.vehicles),
      update: new ExecuteUpdateVehicle(executionContext, idGenerator, repos.vehicles),
    },
    yieldForesights: {
      get: new ExecuteGetYieldForesight(executionContext, idGenerator, repos.yieldForesights),
    },
  };
  return { repos, useCases };
}
