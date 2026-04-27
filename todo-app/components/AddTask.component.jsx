import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';

// ── THEME (import from HomeScreen in your real project) ───────────────────────
const G = {
  bg:         '#0a0e1a',
  panel:      '#0f1628',
  border:     '#1a2744',
  cyan:       '#00f5ff',
  green:      '#00ff88',
  red:        '#ff3c5f',
  yellow:     '#ffd700',
  textDim:    '#4a6080',
  textBody:   '#8ab0d0',
  textBright: '#cce8ff',
  font:       'monospace',
};

const AddTask = (props) => {
  const [task, setTask] = useState('');
  const [focused, setFocused] = useState(false);

  // Button press animation
  const scale = useRef(new Animated.Value(1)).current;
  const pressIn  = () => Animated.spring(scale, { toValue: 0.93, useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(scale, { toValue: 1,    useNativeDriver: true }).start();

  // Flash animation on successful add
  const flash = useRef(new Animated.Value(0)).current;
  const triggerFlash = () => {
    Animated.sequence([
      Animated.timing(flash, { toValue: 1, duration: 120, useNativeDriver: false }),
      Animated.timing(flash, { toValue: 0, duration: 300, useNativeDriver: false }),
    ]).start();
  };

  const isReady = task.length > 2;

  const addTask = () => {
    if (!isReady) return;

    const newTask = {
      id: Date.now(),
      title: task,
      date: new Date(),
      completed: false,
    };
    props.onAdd(newTask);
    setTask('');
    triggerFlash();
  };

  // Border color reacts to focus + readiness
  const borderColor = focused
    ? isReady ? G.green : G.cyan
    : G.border;

  // Animated border glow interpolation
  const glowColor = flash.interpolate({
    inputRange:  [0, 1],
    outputRange: [G.panel, '#0a2a1a'],
  });

  return (
    <Animated.View style={[styles.wrapper, { backgroundColor: glowColor }]}>

      {/* Corner accents — color matches readiness */}
      <View style={[styles.corner, styles.cornerTL, { borderColor }]} />
      <View style={[styles.corner, styles.cornerTR, { borderColor }]} />
      <View style={[styles.corner, styles.cornerBL, { borderColor }]} />
      <View style={[styles.corner, styles.cornerBR, { borderColor }]} />

      {/* ── Input row ── */}
      <View style={[styles.inputRow, { borderColor }]}>

        {/* Prompt glyph */}
        <Text style={[styles.prompt, { color: isReady ? G.green : G.textDim }]}>▸</Text>

        <TextInput
          style={styles.input}
          placeholder="NEW QUEST TITLE..."
          placeholderTextColor={G.textDim}
          value={task}
          onChangeText={setTask}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={addTask}
          returnKeyType="done"
          autoCapitalize="characters"
        />

        {/* Character count */}
        <Text style={[styles.charCount, { color: isReady ? G.green : G.textDim }]}>
          {task.length}
        </Text>
      </View>

      {/* ── ADD Button ── */}
      <TouchableOpacity
        onPress={addTask}
        onPressIn={pressIn}
        onPressOut={pressOut}
        activeOpacity={1}
        disabled={!isReady}
      >
        <Animated.View
          style={[
            styles.btn,
            {
              borderColor: isReady ? G.green : G.border,
              transform: [{ scale }],
              opacity: isReady ? 1 : 0.35,
            },
          ]}
        >
          {/* Corner accents on button */}
          <View style={[styles.corner, styles.cornerTL, { borderColor: isReady ? G.green : G.border }]} />
          <View style={[styles.corner, styles.cornerTR, { borderColor: isReady ? G.green : G.border }]} />
          <View style={[styles.corner, styles.cornerBL, { borderColor: isReady ? G.green : G.border }]} />
          <View style={[styles.corner, styles.cornerBR, { borderColor: isReady ? G.green : G.border }]} />

          <Text style={[styles.btnIcon, { color: isReady ? G.green : G.textDim }]}>＋</Text>
          <Text style={[styles.btnText, { color: isReady ? G.green : G.textDim }]}>
            ADD QUEST
          </Text>
        </Animated.View>
      </TouchableOpacity>

    </Animated.View>
  );
};

export default AddTask;

// ── STYLES ────────────────────────────────────────────────────────────────────
const CORNER = 10;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: G.panel,
    borderWidth: 1,
    borderColor: G.border,
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },

  // Input row
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: G.bg,
    gap: 8,
  },
  prompt: {
    fontFamily: G.font,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontFamily: G.font,
    fontSize: 13,
    color: G.textBright,
    letterSpacing: 1,
    paddingVertical: 6,
  },
  charCount: {
    fontFamily: G.font,
    fontSize: 11,
    letterSpacing: 1,
    minWidth: 20,
    textAlign: 'right',
  },

  // Button
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 12,
    gap: 8,
    backgroundColor: 'transparent',
  },
  btnIcon: {
    fontFamily: G.font,
    fontSize: 16,
    fontWeight: '700',
  },
  btnText: {
    fontFamily: G.font,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
  },

  // Corner accents
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
  },
  cornerTL: { top: -1,    left: -1,   borderTopWidth: 2,    borderLeftWidth: 2,   borderTopLeftRadius: 4 },
  cornerTR: { top: -1,    right: -1,  borderTopWidth: 2,    borderRightWidth: 2,  borderTopRightRadius: 4 },
  cornerBL: { bottom: -1, left: -1,   borderBottomWidth: 2, borderLeftWidth: 2,   borderBottomLeftRadius: 4 },
  cornerBR: { bottom: -1, right: -1,  borderBottomWidth: 2, borderRightWidth: 2,  borderBottomRightRadius: 4 },
});