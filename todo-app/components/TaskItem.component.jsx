import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { COLORS, FONT_FAMILY, CORNER_SIZE, formatDate, shortId, styles as sharedStyles } from '../theme';

// ── COMPONENT ─────────────────────────────────────────────────────────────────
const TaskItem = ({ task, onToggle, onDelete, index = 0 }) => {
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

  // ── Delete button animation
  const deleteScale = useRef(new Animated.Value(1)).current;
  const deleteIn  = () => Animated.spring(deleteScale, { toValue: 0.8,  useNativeDriver: true }).start();
  const deleteOut = () => Animated.spring(deleteScale, { toValue: 1,    useNativeDriver: true }).start();

  // ── Deletion animation (slide out + fade)
  const deleteAnim = useRef(new Animated.Value(0)).current;
  const handleDelete = () => {
    Animated.parallel([
      Animated.timing(deleteAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDelete(task.id);
    });
  };

  // ── Completion: row fades slightly when done
  const rowOpacity = done ? 0.55 : 1;

  // Dynamic colors based on completion
  const accentColor  = done ? COLORS.green  : COLORS.cyan;
  const borderColor  = done ? COLORS.green  : COLORS.border;

  return (
    <Animated.View
      style={[
        styles.card,
        {
          borderColor,
          opacity: Animated.multiply(opacity, rowOpacity),
          transform: [
            { translateX: slideX },
            { translateX: Animated.multiply(deleteAnim, 500) }
          ],
        },
      ]}
    >
      {/* Corner accents */}
      <View style={[sharedStyles.corner, sharedStyles.cornerTL, { borderColor: accentColor }]} />
      <View style={[sharedStyles.corner, sharedStyles.cornerTR, { borderColor: accentColor }]} />
      <View style={[sharedStyles.corner, sharedStyles.cornerBL, { borderColor: accentColor }]} />
      <View style={[sharedStyles.corner, sharedStyles.cornerBR, { borderColor: accentColor }]} />

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
            <Text style={[styles.toggleIcon, { color: COLORS.green }]}>✓</Text>
          ) : (
            <Text style={[styles.toggleIcon, { color: COLORS.textDim }]}>○</Text>
          )}
        </Animated.View>
      </TouchableOpacity>

      {/* ── Delete Button ── */}
      <TouchableOpacity
        onPress={handleDelete}
        onPressIn={deleteIn}
        onPressOut={deleteOut}
        activeOpacity={1}
      >
        <Animated.View
          style={[
            styles.deleteBtn,
            {
              borderColor: COLORS.red,
              transform: [{ scale: deleteScale }],
            },
          ]}
        >
          <Text style={[styles.deleteIcon, { color: COLORS.red }]}>⨯</Text>
        </Animated.View>
      </TouchableOpacity>

    </Animated.View>
  );
};

export default TaskItem;

// ── COMPONENT STYLES ──────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.panel,
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
    fontFamily: FONT_FAMILY,
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: '700',
  },
  date: {
    fontFamily: FONT_FAMILY,
    fontSize: 10,
    letterSpacing: 1,
    color: COLORS.textDim,
  },

  // Title
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    color: COLORS.textBright,
  },
  titleDone: {
    color: COLORS.textDim,
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
    fontFamily: FONT_FAMILY,
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

  // Delete button
  deleteBtn: {
    width: 40,
    height: 40,
    borderRadius: 3,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: 'transparent',
  },
  deleteIcon: {
    fontSize: 18,
    fontWeight: '700',
  },
});