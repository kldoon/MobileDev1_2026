import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';

// ── THEME ─────────────────────────────────────────────────────────────────────
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

// ── HELPERS ───────────────────────────────────────────────────────────────────

/** Formats date as "MON DD · HH:MM" */
const formatDate = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  const days  = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const day   = days[d.getDay()];
  const dd    = String(d.getDate()).padStart(2, '0');
  const hh    = String(d.getHours()).padStart(2, '0');
  const mm    = String(d.getMinutes()).padStart(2, '0');
  return `${day} ${dd} · ${hh}:${mm}`;
};

/** Short numeric ID badge from task.id */
const shortId = (id) => `#${String(id).slice(-4)}`;

// ── COMPONENT ─────────────────────────────────────────────────────────────────
const TaskItem = ({ task, onToggle, index = 0 }) => {
  const done = task.completed;

  // ── Entrance animation (staggered by index)
  const slideX  = useRef(new Animated.Value(-40)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideX, {
        toValue: 0,
        duration: 350,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ── Toggle animation (scale pulse on press)
  const btnScale = useRef(new Animated.Value(1)).current;
  const pressIn  = () => Animated.spring(btnScale, { toValue: 0.8,  useNativeDriver: true }).start();
  const pressOut = () => Animated.spring(btnScale, { toValue: 1,    useNativeDriver: true }).start();

  // ── Completion: row fades slightly when done
  const rowOpacity = done ? 0.55 : 1;

  // Dynamic colors based on completion
  const accentColor  = done ? G.green  : G.cyan;
  const borderColor  = done ? G.green  : G.border;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          borderColor,
          opacity: Animated.multiply(opacity, rowOpacity),
          transform: [{ translateX: slideX }],
        },
      ]}
    >
      {/* Corner accents */}
      <View style={[styles.corner, styles.cornerTL, { borderColor: accentColor }]} />
      <View style={[styles.corner, styles.cornerTR, { borderColor: accentColor }]} />
      <View style={[styles.corner, styles.cornerBL, { borderColor: accentColor }]} />
      <View style={[styles.corner, styles.cornerBR, { borderColor: accentColor }]} />

      {/* ── Left accent bar ── */}
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />

      {/* ── Content ── */}
      <View style={styles.content}>

        {/* Top row: ID badge + date */}
        <View style={styles.metaRow}>
          <Text style={[styles.idBadge, { color: accentColor }]}>
            {shortId(task.id)}
          </Text>
          <Text style={styles.date}>{formatDate(task.date)}</Text>
        </View>

        {/* Task title */}
        <Text
          style={[
            styles.title,
            done && styles.titleDone,
          ]}
          numberOfLines={2}
        >
          {done ? '✓ ' : '▸ '}
          {task.title}
        </Text>

        {/* Status chip */}
        <View style={[styles.statusChip, { borderColor: accentColor }]}>
          <View style={[styles.statusDot, { backgroundColor: accentColor }]} />
          <Text style={[styles.statusText, { color: accentColor }]}>
            {done ? 'COMPLETED' : 'IN PROGRESS'}
          </Text>
        </View>

      </View>

      {/* ── Toggle Button ── */}
      <TouchableOpacity
        onPress={() => onToggle(task.id)}
        onPressIn={pressIn}
        onPressOut={pressOut}
        activeOpacity={1}
      >
        <Animated.View
          style={[
            styles.toggleBtn,
            {
              borderColor: accentColor,
              backgroundColor: done ? '#001a0d' : 'transparent',
              transform: [{ scale: btnScale }],
            },
          ]}
        >
          {done ? (
            <Text style={[styles.toggleIcon, { color: G.green }]}>✓</Text>
          ) : (
            <Text style={[styles.toggleIcon, { color: G.textDim }]}>○</Text>
          )}
        </Animated.View>
      </TouchableOpacity>

    </Animated.View>
  );
};

export default TaskItem;

// ── STYLES ────────────────────────────────────────────────────────────────────
const CORNER = 10;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: G.panel,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden',
  },

  // Left accent bar
  accentBar: {
    width: 3,
    alignSelf: 'stretch',
    marginRight: 12,
    opacity: 0.8,
    shadowRadius: 6,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
  },

  // Content block
  content: {
    flex: 1,
    paddingVertical: 12,
    gap: 6,
  },

  // Meta row: ID + date
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  idBadge: {
    fontFamily: G.font,
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '700',
  },
  date: {
    fontFamily: G.font,
    fontSize: 10,
    letterSpacing: 1,
    color: G.textDim,
  },

  // Title
  title: {
    fontFamily: G.font,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    color: G.textBright,
  },
  titleDone: {
    color: G.textDim,
    textDecorationLine: 'line-through',
  },

  // Status chip
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 5,
    marginTop: 2,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  statusText: {
    fontFamily: G.font,
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: '700',
  },

  // Toggle button
  toggleBtn: {
    width: 40,
    height: 40,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  toggleIcon: {
    fontSize: 18,
    fontWeight: '700',
  },

  // Corner accents
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
    zIndex: 1,
  },
  cornerTL: { top: -1,    left: -1,   borderTopWidth: 2,    borderLeftWidth: 2,   borderTopLeftRadius: 4 },
  cornerTR: { top: -1,    right: -1,  borderTopWidth: 2,    borderRightWidth: 2,  borderTopRightRadius: 4 },
  cornerBL: { bottom: -1, left: -1,   borderBottomWidth: 2, borderLeftWidth: 2,   borderBottomLeftRadius: 4 },
  cornerBR: { bottom: -1, right: -1,  borderBottomWidth: 2, borderRightWidth: 2,  borderBottomRightRadius: 4 },
});