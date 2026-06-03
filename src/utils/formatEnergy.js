export function formatWatt(watts) {
  if (watts >= 1000) return `${(watts / 1000).toFixed(1)} kW`
  return `${watts} W`
}

export function formatKwh(kwh) {
  return `${kwh.toFixed(1)} kWh`
}

export function formatVolt(volts) {
  return `${volts.toFixed(1)} V`
}

export function formatAmpere(amps) {
  return `${amps.toFixed(1)} A`
}
