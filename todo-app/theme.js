import { StyleSheet } from 'react-native';

// ── THEME COLORS ──────────────────────────────────────────────────────────
export const COLORS = {
  bg: '#0a0e1a',
  panel: '#0f1628',
  border: '#1a2744',
  cyan: '#00f5ff',
  green: '#00ff88',
  red: '#ff3c5f',
  yellow: '#ffd700',
  textDim: '#4a6080',
  textBody: '#8ab0d0',
  textBright: '#cce8ff',
};

// ── TYPOGRAPHY ────────────────────────────────────────────────────────────
export const FONT_FAMILY = 'monospace';

// ── CONSTANTS ─────────────────────────────────────────────────────────────
export const CORNER_SIZE = 10;
export const CORNER_SIZE_LG = 12;

// ── SHARED STYLES ─────────────────────────────────────────────────────────
export const styles = StyleSheet.create({
  // Container
  containerFlex: {
    flex: 1,
  },

  // Common backgrounds
  bgDark: {
    backgroundColor: COLORS.bg,
  },
  bgPanel: {
    backgroundColor: COLORS.panel,
  },

  // Common borders
  borderDefault: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 4,
  },
  borderDefault3: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 3,
  },

  // ── CORNER ACCENTS ─────────────────────────────────────────────────────
  // Small corners (size 10)
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
  cornerTL: {
    top: -1,
    left: -1,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 4,
  },
  cornerTR: {
    top: -1,
    right: -1,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 4,
  },
  cornerBL: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomLeftRadius: 4,
  },
  cornerBR: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 4,
  },

  // Large corners (size 12)
  cornerLg: {
    position: 'absolute',
    width: CORNER_SIZE_LG,
    height: CORNER_SIZE_LG,
  },
  cornerLgTL: {
    top: -1,
    left: -1,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 4,
  },
  cornerLgTR: {
    top: -1,
    right: -1,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 4,
  },
  cornerLgBL: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomLeftRadius: 4,
  },
  cornerLgBR: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 4,
  },

  // ── BUTTONS ────────────────────────────────────────────────────────────
  btn: {
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btnSmall: {
    width: 40,
    height: 40,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 0 },
  },
  btnTextSmall: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
  },

  // ── TEXT STYLES ────────────────────────────────────────────────────────
  textXSmall: {
    fontFamily: FONT_FAMILY,
    fontSize: 9,
    letterSpacing: 2,
    color: COLORS.textDim,
  },
  textSmall: {
    fontFamily: FONT_FAMILY,
    fontSize: 10,
    letterSpacing: 2,
    color: COLORS.textDim,
  },
  textBase: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    letterSpacing: 1,
    color: COLORS.textBody,
  },
  textLarge: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.textBright,
  },
  textXLarge: {
    fontFamily: FONT_FAMILY,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 5,
  },
  textXXLarge: {
    fontFamily: FONT_FAMILY,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 6,
  },

  // ── INPUT ──────────────────────────────────────────────────────────────
  input: {
    flex: 1,
    color: COLORS.textBright,
    fontFamily: FONT_FAMILY,
    fontSize: 15,
    paddingVertical: 4,
  },
  inputSmall: {
    flex: 1,
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    color: COLORS.textBright,
    letterSpacing: 1,
    paddingVertical: 6,
  },

  // ── LAYOUT ─────────────────────────────────────────────────────────────
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  // ── GLOW EFFECTS ───────────────────────────────────────────────────────
  glowCyan: {
    textShadowColor: COLORS.cyan,
    textShadowRadius: 16,
    textShadowOffset: { width: 0, height: 0 },
  },
  glowGreen: {
    textShadowColor: COLORS.green,
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 0 },
  },
  glowRed: {
    textShadowColor: COLORS.red,
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 0 },
  },
  shadowGreen: {
    shadowColor: COLORS.green,
    shadowRadius: 6,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
  },
  shadowCyan: {
    shadowColor: COLORS.cyan,
    shadowRadius: 6,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
  },
});

// ── HELPER FUNCTIONS ──────────────────────────────────────────────────────

/** Formats date as "MON DD · HH:MM" */
export const formatDate = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const day = days[d.getDay()];
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${day} ${dd} · ${hh}:${mm}`;
};

/** Short numeric ID badge from task.id */
export const shortId = (id) => `#${String(id).slice(-4)}`;
