import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';

// ── THEME ────────────────────────────────────────────────────────────────────
const G = {
  bg: '#0a0e1a',
  panel: '#0f1628',
  border: '#1a2744',
  cyan: '#00f5ff',
  green: '#00ff88',
  red: '#ff3c5f',
  textDim: '#4a6080',
  textBody: '#8ab0d0',
  textBright: '#cce8ff',
  font: 'monospace',
};

// ── REUSABLE COMPONENTS ───────────────────────────────────────────────────────

/** Glowing neon label above each input */
const FieldLabel = ({ label }) => (
  <Text style={styles.label}>
    <Text style={styles.labelBracket}>[ </Text>
    {label}
    <Text style={styles.labelBracket}> ]</Text>
  </Text>
);

/** Animated neon button */
const NeonButton = ({ title, onPress, color = G.cyan, style }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => Animated.spring(scale, { toValue: 0.94, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <TouchableOpacity onPress={onPress} onPressIn={pressIn} onPressOut={pressOut} activeOpacity={1}>
      <Animated.View style={[styles.btn, { borderColor: color, transform: [{ scale }] }, style]}>
        <View style={[styles.corner, styles.cornerTL, { borderColor: color }]} />
        <View style={[styles.corner, styles.cornerTR, { borderColor: color }]} />
        <View style={[styles.corner, styles.cornerBL, { borderColor: color }]} />
        <View style={[styles.corner, styles.cornerBR, { borderColor: color }]} />
        {/* ✅ color passed directly as a style prop on Text, not via StyleSheet */}
        <Text style={[styles.btnText, { color: color, textShadowColor: color }]}>
          {title}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
// ── SCREEN ────────────────────────────────────────────────────────────────────
const LoginScreen = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const nav = useNavigation();

  // Blinking cursor animation
  const blink = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  // Title entrance animation
  const titleY = useRef(new Animated.Value(-30)).current;
  const titleO = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(titleY, { toValue: 0, duration: 700, useNativeDriver: true }),
      Animated.timing(titleO, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();
  }, []);

  const login = () => {
    if (data.username === 'admin' && data.password === '123') {
      setError('');
      nav.replace('home');
    } else {
      setError('ACCESS DENIED — Invalid credentials');
    }
  };

  const clear = () => {
    setData({ username: '', password: '' });
    setError(null);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={G.bg} />

      {/* Scanline overlay rows (decorative) */}
      <View style={styles.scanlines} pointerEvents="none" />

      {/* ── Header ── */}
      <Animated.View style={{ transform: [{ translateY: titleY }], opacity: titleO, alignItems: 'center', marginBottom: 36 }}>
        <Text style={styles.subtitle}>▸ SYSTEM ACCESS REQUIRED ◂</Text>
        <Text style={styles.title}>PLAYER LOGIN</Text>
        <View style={styles.titleUnderline} />
        {/* blinking cursor */}
        <Animated.Text style={[styles.cursor, { opacity: blink }]}>█</Animated.Text>
      </Animated.View>

      {/* ── Panel ── */}
      <View style={styles.panel}>
        {/* panel corner accents */}
        <View style={[styles.corner, styles.cornerTL, { borderColor: G.cyan }]} />
        <View style={[styles.corner, styles.cornerTR, { borderColor: G.cyan }]} />
        <View style={[styles.corner, styles.cornerBL, { borderColor: G.cyan }]} />
        <View style={[styles.corner, styles.cornerBR, { borderColor: G.cyan }]} />

        {/* USERNAME */}
        <FieldLabel label="USERNAME" />
        <View style={styles.inputWrap}>
          <Text style={styles.prompt}>▸ </Text>
          <TextInput
            style={styles.input}
            placeholder="enter username..."
            placeholderTextColor={G.textDim}
            value={data.username}
            inputMode="text"
            autoCapitalize="none"
            onChangeText={v => setData({ ...data, username: v })}
          />
        </View>

        <View style={styles.divider} />

        {/* PASSWORD */}
        <FieldLabel label="PASSWORD" />
        <View style={styles.inputWrap}>
          <Text style={styles.prompt}>▸ </Text>
          <TextInput
            style={styles.input}
            placeholder="enter password..."
            placeholderTextColor={G.textDim}
            value={data.password}
            secureTextEntry
            onChangeText={v => setData({ ...data, password: v })}
          />
        </View>

        {/* Error message */}
        {!!error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠ {error}</Text>
          </View>
        )}
      </View>

      {/* ── Actions ── */}
      <View style={styles.actions}>
        <NeonButton title="▶  AUTHENTICATE" onPress={login} color={G.cyan} style={{ flex: 1, marginRight: 8 }} />
        <NeonButton title="↺  CLEAR" onPress={clear} color={G.textDim} style={{ flex: 0.5 }} />
      </View>

      {/* Footer */}
      <Text style={styles.footer}>VER 1.0.0 · SECURE CHANNEL</Text>
    </View>
  );
};

export default LoginScreen;

// ── STYLES ────────────────────────────────────────────────────────────────────
const CORNER = 12;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: G.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  // Decorative scanlines
  scanlines: {
    ...StyleSheet.absoluteFillObject,
    backgroundImage: undefined, // RN doesn't support, kept for reference
    opacity: 0.03,
  },

  // Title area
  subtitle: {
    fontFamily: G.font,
    fontSize: 10,
    letterSpacing: 3,
    color: G.textDim,
    marginBottom: 6,
  },
  title: {
    fontFamily: G.font,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 6,
    color: G.cyan,
    textShadowColor: G.cyan,
    textShadowRadius: 16,
    textShadowOffset: { width: 0, height: 0 },
  },
  titleUnderline: {
    width: '60%',
    height: 1,
    backgroundColor: G.cyan,
    marginTop: 6,
    opacity: 0.5,
    shadowColor: G.cyan,
    shadowRadius: 6,
    shadowOpacity: 1,
  },
  cursor: {
    color: G.cyan,
    fontSize: 14,
    marginTop: 4,
  },

  // Panel
  panel: {
    width: '100%',
    backgroundColor: G.panel,
    borderWidth: 1,
    borderColor: G.border,
    borderRadius: 4,
    padding: 24,
    marginBottom: 16,
  },

  // Corner accent marks
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  cornerTL: { top: -1, left: -1, borderTopWidth: 2, borderLeftWidth: 2, borderTopLeftRadius: 4 },
  cornerTR: { top: -1, right: -1, borderTopWidth: 2, borderRightWidth: 2, borderTopRightRadius: 4 },
  cornerBL: { bottom: -1, left: -1, borderBottomWidth: 2, borderLeftWidth: 2, borderBottomLeftRadius: 4 },
  cornerBR: { bottom: -1, right: -1, borderBottomWidth: 2, borderRightWidth: 2, borderBottomRightRadius: 4 },

  // Labels
  label: {
    fontFamily: G.font,
    fontSize: 11,
    letterSpacing: 2,
    color: G.textBody,
    marginBottom: 6,
  },
  labelBracket: { color: G.cyan, fontWeight: '700' },

  // Input row
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: G.border,
    marginBottom: 20,
    paddingBottom: 6,
  },
  prompt: {
    color: G.cyan,
    fontFamily: G.font,
    fontSize: 14,
  },
  input: {
    flex: 1,
    color: G.textBright,
    fontFamily: G.font,
    fontSize: 15,
    paddingVertical: 4,
  },

  divider: {
    height: 1,
    backgroundColor: G.border,
    marginBottom: 20,
  },

  // Error
  errorBox: {
    borderWidth: 1,
    borderColor: G.red,
    backgroundColor: '#1a0810',
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
  },
  errorText: {
    color: G.red,
    fontFamily: G.font,
    fontSize: 12,
    letterSpacing: 1,
    textShadowColor: G.red,
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 0 },
  },

  // Buttons
  actions: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  btnText: {
    fontFamily: G.font,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 0 },
    // ✅ NO color or textShadowColor here — passed dynamically above
  },
  // Footer
  footer: {
    fontFamily: G.font,
    fontSize: 10,
    letterSpacing: 2,
    color: G.textDim,
  },
});