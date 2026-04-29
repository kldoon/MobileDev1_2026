import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet,
} from 'react-native';
import { COLORS, FONT_FAMILY, CORNER_SIZE, styles as sharedStyles } from '../theme';

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
    ? isReady ? COLORS.green : COLORS.cyan
    : COLORS.border;

  // Animated border glow interpolation
  const glowColor = flash.interpolate({
    inputRange:  [0, 1],
    outputRange: [COLORS.panel, '#0a2a1a'],
  });

  return (
    <Animated.View style={[styles.wrapper, { backgroundColor: glowColor }]}>

      {/* Corner accents — color matches readiness */}
      <View style={[sharedStyles.corner, sharedStyles.cornerTL, { borderColor }]} />
      <View style={[sharedStyles.corner, sharedStyles.cornerTR, { borderColor }]} />
      <View style={[sharedStyles.corner, sharedStyles.cornerBL, { borderColor }]} />
      <View style={[sharedStyles.corner, sharedStyles.cornerBR, { borderColor }]} />

      {/* ── Input row ── */}
      <View style={[styles.inputRow, { borderColor }]}>

        {/* Prompt glyph */}
        <Text style={[styles.prompt, { color: isReady ? COLORS.green : COLORS.textDim }]}>▸</Text>

        <TextInput
          style={styles.input}
          placeholder="NEW QUEST TITLE..."
          placeholderTextColor={COLORS.textDim}
          value={task}
          onChangeText={setTask}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onSubmitEditing={addTask}
          returnKeyType="done"
          autoCapitalize="characters"
        />

        {/* Character count */}
        <Text style={[styles.charCount, { color: isReady ? COLORS.green : COLORS.textDim }]}>
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
              borderColor: isReady ? COLORS.green : COLORS.border,
              transform: [{ scale }],
              opacity: isReady ? 1 : 0.35,
            },
          ]}
        >
          {/* Corner accents on button */}
          <View style={[sharedStyles.corner, sharedStyles.cornerTL, { borderColor: isReady ? COLORS.green : COLORS.border }]} />
          <View style={[sharedStyles.corner, sharedStyles.cornerTR, { borderColor: isReady ? COLORS.green : COLORS.border }]} />
          <View style={[sharedStyles.corner, sharedStyles.cornerBL, { borderColor: isReady ? COLORS.green : COLORS.border }]} />
          <View style={[sharedStyles.corner, sharedStyles.cornerBR, { borderColor: isReady ? COLORS.green : COLORS.border }]} />

          <Text style={[styles.btnIcon, { color: isReady ? COLORS.green : COLORS.textDim }]}>＋</Text>
          <Text style={[styles.btnText, { color: isReady ? COLORS.green : COLORS.textDim }]}>
            ADD QUEST
          </Text>
        </Animated.View>
      </TouchableOpacity>

    </Animated.View>
  );
};

export default AddTask;

// ── COMPONENT STYLES ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    backgroundColor: COLORS.bg,
    gap: 8,
  },
  prompt: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    color: COLORS.textBright,
    letterSpacing: 1,
    paddingVertical: 6,
  },
  charCount: {
    fontFamily: FONT_FAMILY,
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
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '700',
  },
  btnText: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 3,
  },
});