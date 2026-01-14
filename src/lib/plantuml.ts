// =============================================================================
// PlantUML Utilities - Build-time diagram rendering
// =============================================================================

import plantumlEncoder from 'plantuml-encoder';
import { createHash } from 'crypto';

// =============================================================================
// Types
// =============================================================================

interface PlantUMLOptions {
  format?: 'svg' | 'png';
  serverUrl?: string;
}

// Default PlantUML server
const DEFAULT_SERVER_URL = 'https://www.plantuml.com/plantuml';

// =============================================================================
// Hash Generation
// =============================================================================

/**
 * Generate a hash for PlantUML code to use as filename
 */
export function generateDiagramHash(code: string): string {
  return createHash('md5').update(code).digest('hex').slice(0, 12);
}

// =============================================================================
// Encoding
// =============================================================================

/**
 * Encode PlantUML code for URL
 */
export function encodePlantUML(code: string): string {
  return plantumlEncoder.encode(code);
}

/**
 * Decode PlantUML code from URL encoding
 */
export function decodePlantUML(encoded: string): string {
  return plantumlEncoder.decode(encoded);
}

// =============================================================================
// URL Generation
// =============================================================================

/**
 * Generate PlantUML server URL for a diagram
 */
export function getPlantUMLUrl(
  code: string,
  options: PlantUMLOptions = {}
): string {
  const serverUrl = options.serverUrl || DEFAULT_SERVER_URL;
  const format = options.format || 'svg';

  const encoded = encodePlantUML(code);

  return `${serverUrl}/${format}/${encoded}`;
}

// =============================================================================
// Validation
// =============================================================================

/**
 * Check if a string is valid PlantUML code
 */
export function isValidPlantUML(code: string): boolean {
  const trimmed = code.trim();
  return (
    trimmed.startsWith('@startuml') ||
    trimmed.startsWith('@startmindmap') ||
    trimmed.startsWith('@startwbs') ||
    trimmed.startsWith('@startgantt') ||
    trimmed.startsWith('@startjson') ||
    trimmed.startsWith('@startyaml') ||
    trimmed.startsWith('@startebnf') ||
    trimmed.startsWith('@startregex')
  );
}
