import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import AddTask from '../components/AddTask.component';
import TaskItem from '../components/TaskItem.component';

// ── THEME (same tokens as LoginScreen) ───────────────────────────────────────
const G = {
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
  font: 'monospace',
};

export { G }; // 👈 other components can import this

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

/** Top HUD bar — shows mission title + task counters */
const HUDBar = ({ total, done }) => {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <View style={styles.hud}>
      {/* Left: title */}
      <View>
        <Text style={styles.hudSub}>▸ ACTIVE MISSION</Text>
        <Text style={styles.hudTitle}>TASK BOARD</Text>
      </View>

      {/* Right: counters */}
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.hudCounter}>
          <Text style={styles.hudCounterVal}>{done}</Text>
          <Text style={styles.textDim}>/{total} DONE</Text>
        </Text>
        <Text style={styles.hudPct}>{pct}% COMPLETE</Text>
      </View>
    </View>
  );
};

/** XP-style progress bar */
const ProgressBar = ({ total, done }) => {
  const pct = total === 0 ? 0 : done / total;

  return (
    <View style={styles.xpWrap}>
      <View style={styles.xpTrack}>
        <View style={[styles.xpFill, { width: `${pct * 100}%` }]} />
        {/* glow tip */}
        {pct > 0 && <View style={[styles.xpGlow, { left: `${pct * 100}%` }]} />}
      </View>
      <View style={styles.xpLabels}>
        <Text style={styles.xpLabel}>XP</Text>
        <Text style={styles.xpLabel}>LVL UP AT 100%</Text>
      </View>
    </View>
  );
};

/** Empty state when no tasks exist */
const EmptyState = () => (
  <View style={styles.empty}>
    <Text style={styles.emptyIcon}>◈</Text>
    <Text style={styles.emptyTitle}>NO ACTIVE QUESTS</Text>
    <Text style={styles.emptyBody}>Add a task above to begin your mission</Text>
  </View>
);

// ── SCREEN ────────────────────────────────────────────────────────────────────
const HomeScreen = (props) => {
  const total = props.taskList?.length ?? 0;
  const done = props.taskList?.filter(t => t.completed).length ?? 0;

  return (
    <View style={styles.container}>

      {/* ── HUD Header ── */}
      <HUDBar total={total} done={done} />

      {/* ── XP Bar ── */}
      <ProgressBar total={total} done={done} />

      {/* ── Divider ── */}
      <View style={styles.sectionDivider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerLabel}>OBJECTIVES</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* ── Add Task Input ── */}
      <AddTask onAdd={props.addTask} />

      {/* ── Task List ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {total === 0
          ? <EmptyState />
          : props.taskList.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={props.onToggle}
              onDelete={props.onDelete}
              index={index}
            />
          ))
        }
      </ScrollView>

      {/* ── Footer ── */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ◈ {total - done} QUEST{total - done !== 1 ? 'S' : ''} REMAINING
        </Text>
        <Text style={styles.footerText}>VER 1.0.0</Text>
      </View>

    </View>
  );
};

export default HomeScreen;

// ── STYLES ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: G.bg,
    paddingTop: 52,
    paddingHorizontal: 20,
  },

  // HUD
  hud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  hudSub: {
    fontFamily: G.font,
    fontSize: 10,
    letterSpacing: 3,
    color: G.textDim,
    marginBottom: 2,
  },
  hudTitle: {
    fontFamily: G.font,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 5,
    color: G.cyan,
    textShadowColor: G.cyan,
    textShadowRadius: 12,
    textShadowOffset: { width: 0, height: 0 },
  },
  hudCounter: {
    fontFamily: G.font,
    fontSize: 13,
    color: G.textBody,
  },
  hudCounterVal: {
    color: G.green,
    fontWeight: '700',
    textShadowColor: G.green,
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 0 },
  },
  hudPct: {
    fontFamily: G.font,
    fontSize: 10,
    letterSpacing: 2,
    color: G.textDim,
    marginTop: 2,
  },
  textDim: {
    color: G.textDim,
  },

  // XP Bar
  xpWrap: {
    marginBottom: 20,
  },
  xpTrack: {
    height: 6,
    backgroundColor: G.border,
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  xpFill: {
    height: '100%',
    backgroundColor: G.green,
    borderRadius: 3,
    shadowColor: G.green,
    shadowRadius: 6,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
  },
  xpGlow: {
    position: 'absolute',
    top: -3,
    width: 3,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 2,
    opacity: 0.8,
    shadowColor: G.green,
    shadowRadius: 6,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
  },
  xpLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  xpLabel: {
    fontFamily: G.font,
    fontSize: 9,
    letterSpacing: 2,
    color: G.textDim,
  },

  // Section divider
  sectionDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: G.border,
  },
  dividerLabel: {
    fontFamily: G.font,
    fontSize: 10,
    letterSpacing: 3,
    color: G.textDim,
    marginHorizontal: 10,
  },

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Empty state
  empty: {
    alignItems: 'center',
    marginTop: 60,
    opacity: 0.5,
  },
  emptyIcon: {
    fontSize: 40,
    color: G.cyan,
    marginBottom: 12,
  },
  emptyTitle: {
    fontFamily: G.font,
    fontSize: 14,
    letterSpacing: 4,
    color: G.textBody,
    marginBottom: 6,
  },
  emptyBody: {
    fontFamily: G.font,
    fontSize: 11,
    color: G.textDim,
    letterSpacing: 1,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: G.border,
  },
  footerText: {
    fontFamily: G.font,
    fontSize: 9,
    letterSpacing: 2,
    color: G.textDim,
  },
});