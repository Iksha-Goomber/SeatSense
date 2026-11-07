export function predictAvailability(hour:number, dayIndex:number, capacity=100) {
  // Demo forecasting model: a transparent weighted demand curve, not live sensor data.
  const morning = Math.exp(-Math.pow((hour-10)/2.1,2))*0.48;
  const afternoon = Math.exp(-Math.pow((hour-15)/3,2))*0.68;
  const evening = Math.exp(-Math.pow((hour-19)/2.2,2))*0.32;
  const weekdayFactor = dayIndex===0||dayIndex===6 ? 0.68 : dayIndex===5 ? 0.78 : 1;
  const occupancy = Math.min(.96,Math.max(.12,(.16+morning+afternoon+evening)*weekdayFactor));
  const available = Math.round(capacity*(1-occupancy));
  return {available, occupancy:Math.round(occupancy*100), confidence:72, label: occupancy>.78?'Very busy':occupancy>.58?'Moderately busy':'Good availability'};
}
