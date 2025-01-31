// calucualtes real tiime per hour conso emissions for all connected playstation playstation consoles
import {
  ALPHA,
  DECAY_CONSTANT,
  NORMALIZING_FACTOR,
  PLAYSTATION_CONSTANT_EMISSION_RATE,
  PLAYSTATION_MULTIPLIER,
} from "../constants";
import { ConnectedConsole } from "../types";
import { differenceInHours } from "date-fns";

export const calculateGameEmissions = (consoles: ConnectedConsole[]) => {
  // Get the current date
  const now = new Date();

  // Calculate emissions for each console
  const emissions = consoles.map((c) => {
    // Calculate hours since the console joined
    const joinedDate = new Date(c.joined_date);
    const H = differenceInHours(now, joinedDate);

    if (H > 2160) {
      return PLAYSTATION_CONSTANT_EMISSION_RATE;
    }
    // Apply the formula: (alpha * K * Math.exp(-lambda * H)) / N
    else {
      // Multiply the emission rate by the degen_score
      const emissionRate =
        (ALPHA * PLAYSTATION_MULTIPLIER * Math.exp(-DECAY_CONSTANT * H)) /
        NORMALIZING_FACTOR;

      // Return the emission rate for this console
      return emissionRate;
    }
  });

  return (
    emissions.reduce((total, emission) => total + emission, 0) * 24
  ).toFixed(0);
};
