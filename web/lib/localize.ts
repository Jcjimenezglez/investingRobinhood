/** Map Spanish operational labels to English for public UI. */
const CONVICTION: Record<string, string> = {
  alta: "High",
  "media-alta": "Medium-High",
  media: "Medium",
  "media-baja": "Medium-Low",
  baja: "Low",
};

export function formatConviction(raw: string | null | undefined): string {
  if (!raw) return "—";
  const key = raw.trim().toLowerCase();
  return CONVICTION[key] ?? raw;
}

/** Light glossary for Spanish labels that leak from CIO logs into public pages. */
const PHRASES: Array<[RegExp, string]> = [
  [/\bSesión\b/gi, "Session"],
  [/\bEstado\b/gi, "Status"],
  [/\bHorario\b/gi, "Schedule"],
  [/\bCuenta Agentic\b/gi, "Agentic account"],
  [/\bCuenta\b/gi, "Account"],
  [/\bPosiciones\b/gi, "Positions"],
  [/\bPosición\b/gi, "Position"],
  [/\bCampo\b/gi, "Field"],
  [/\bValor\b/gi, "Value"],
  [/\bTesis\b/gi, "Thesis"],
  [/\bAcción\b/gi, "Action"],
  [/\bVeredicto\b/gi, "Verdict"],
  [/\bmercado abierto\b/gi, "market open"],
  [/\bMONITOR ACTIVO\b/g, "ACTIVE MONITOR"],
  [/\bINTACTA\b/g, "INTACT"],
  [/\bPre-flight\b/gi, "Pre-flight"],
  [/\bConviction:\s*\*\*Alta\*\*/gi, "Conviction: **High**"],
  [/\bPM conviction:\*\*\s*\*\*Alta\*\*/gi, "PM conviction:** **High**"],
  [/conviction:\*\*\s*\*\*Alta\*\*/gi, "conviction:** **High**"],
  [/\bAlta\b/g, "High"],
  [/\bMedia-Alta\b/g, "Medium-High"],
  [/\bMedia\b/g, "Medium"],
  [/\bBaja\b/g, "Low"],
];

export function localizePublicText(input: string): string {
  let out = input;
  for (const [pattern, replacement] of PHRASES) {
    out = out.replace(pattern, replacement);
  }
  return out;
}
