"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomeScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var colors_1 = require("../constants/colors");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var lucide_react_native_1 = require("lucide-react-native");
var useHabits_1 = require("../hooks/useHabits");
var native_1 = require("@react-navigation/native");
var dopamineMenu_1 = require("../constants/dopamineMenu");
function HomeScreen() {
    var _a = (0, useHabits_1.useHabits)(), habits = _a.habits, refresh = _a.refresh;
    var navigation = (0, native_1.useNavigation)();
    var _b = (0, react_1.useState)(null), energyLevel = _b[0], setEnergyLevel = _b[1];
    var _c = (0, react_1.useState)(''), suggestion = _c[0], setSuggestion = _c[1];
    (0, native_1.useFocusEffect)(react_1.default.useCallback(function () {
        refresh();
    }, [refresh]));
    var incompleteHabits = habits.filter(function (h) {
        var today = new Date().toISOString().split('T')[0];
        return !h.completedDates.includes(today);
    });
    var handleEnergySelect = function (level) {
        setEnergyLevel(level);
        var tasks = dopamineMenu_1.DOPAMINE_MENU[level];
        var randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        setSuggestion(randomTask);
    };
    return (<expo_linear_gradient_1.LinearGradient colors={colors_1.GRADIENTS.background} style={styles.container}>
      <react_native_1.SafeAreaView style={styles.safeArea}>
        <react_native_1.ScrollView contentContainerStyle={styles.content}>
            <react_native_1.Text style={styles.greeting}>Good Morning!</react_native_1.Text>
            <react_native_1.Text style={styles.subtitle}>What's your energy level right now?</react_native_1.Text>

            <react_native_1.View style={styles.energyContainer}>
                <react_native_1.TouchableOpacity onPress={function () { return handleEnergySelect('low'); }} style={[styles.energyBtn, energyLevel === 'low' && styles.energyBtnActive]} accessibilityRole="button" accessibilityLabel="Low energy">
                    <lucide_react_native_1.Battery size={24} color={energyLevel === 'low' ? '#FFF' : colors_1.COLORS.textSecondary}/>
                    <react_native_1.Text style={styles.energyText}>Low</react_native_1.Text>
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity onPress={function () { return handleEnergySelect('balanced'); }} style={[styles.energyBtn, energyLevel === 'balanced' && styles.energyBtnActive]} accessibilityRole="button" accessibilityLabel="Balanced energy">
                    <lucide_react_native_1.Zap size={24} color={energyLevel === 'balanced' ? '#FFF' : colors_1.COLORS.textSecondary}/>
                    <react_native_1.Text style={styles.energyText}>Balanced</react_native_1.Text>
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity onPress={function () { return handleEnergySelect('high'); }} style={[styles.energyBtn, energyLevel === 'high' && styles.energyBtnActive]} accessibilityRole="button" accessibilityLabel="High energy">
                    <lucide_react_native_1.Flame size={24} color={energyLevel === 'high' ? '#FFF' : colors_1.COLORS.textSecondary}/>
                    <react_native_1.Text style={styles.energyText}>High</react_native_1.Text>
                </react_native_1.TouchableOpacity>
            </react_native_1.View>

            {energyLevel && (<react_native_1.View style={styles.suggestionCard}>
                    <react_native_1.Text style={styles.suggestionTitle}>Dopamine Menu Suggestion</react_native_1.Text>
                    <react_native_1.Text style={styles.suggestionText}>{suggestion}</react_native_1.Text>
                </react_native_1.View>)}

            <react_native_1.Text style={styles.sectionTitle}>Today's Focus</react_native_1.Text>
            {incompleteHabits.length > 0 ? (incompleteHabits.slice(0, 3).map(function (habit) { return (<react_native_1.View key={habit.id} style={styles.habitCard}>
                        <react_native_1.Text style={styles.habitTitle}>{habit.title}</react_native_1.Text>
                        {habit.isBundled && <react_native_1.Text style={styles.bundledText}>+ {habit.bundledTask}</react_native_1.Text>}
                    </react_native_1.View>); })) : (<react_native_1.View style={styles.emptyState}>
                    <react_native_1.Text style={styles.emptyText}>No habits set for today yet!</react_native_1.Text>
                    <react_native_1.TouchableOpacity onPress={function () { return navigation.navigate('AddHabit'); }} accessibilityRole="button" accessibilityLabel="Add a habit">
                        <react_native_1.Text style={styles.linkText}>Add a habit</react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>)}
        </react_native_1.ScrollView>
      </react_native_1.SafeAreaView>
    </expo_linear_gradient_1.LinearGradient>);
}
var styles = react_native_1.StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    content: { padding: 20 },
    greeting: { fontSize: 32, fontWeight: 'bold', color: colors_1.COLORS.text, marginBottom: 8 },
    subtitle: { fontSize: 16, color: colors_1.COLORS.textSecondary, marginBottom: 24 },
    energyContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    energyBtn: {
        flex: 1, alignItems: 'center', padding: 16, margin: 4,
        backgroundColor: colors_1.COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: colors_1.COLORS.border
    },
    energyBtnActive: { borderColor: colors_1.COLORS.secondary, backgroundColor: 'rgba(59, 130, 246, 0.2)' },
    energyText: { color: colors_1.COLORS.text, marginTop: 8, fontWeight: '600' },
    suggestionCard: {
        backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 16, borderRadius: 12, marginBottom: 32,
        borderLeftWidth: 4, borderLeftColor: colors_1.COLORS.accent
    },
    suggestionTitle: { color: colors_1.COLORS.accent, fontWeight: 'bold', marginBottom: 4 },
    suggestionText: { color: colors_1.COLORS.text, fontSize: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: colors_1.COLORS.text, marginBottom: 16 },
    habitCard: {
        backgroundColor: colors_1.COLORS.surface, padding: 16, borderRadius: 12, marginBottom: 12,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    habitTitle: { color: colors_1.COLORS.text, fontSize: 16, fontWeight: '500' },
    bundledText: { color: colors_1.COLORS.accent, fontSize: 14 },
    emptyState: { padding: 20, alignItems: 'center' },
    emptyText: { color: colors_1.COLORS.textSecondary, marginBottom: 8 },
    linkText: { color: colors_1.COLORS.secondary, fontWeight: 'bold' }
});
