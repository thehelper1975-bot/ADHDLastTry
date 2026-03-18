"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHabits = void 0;
var react_1 = require("react");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var streakCalculator_1 = require("../utils/streakCalculator");
var HABITS_KEY = '@habits_v1';
var useHabits = function () {
    var _a = (0, react_1.useState)([]), habits = _a[0], setHabits = _a[1];
    var _b = (0, react_1.useState)(true), isLoading = _b[0], setIsLoading = _b[1];
    var loadHabits = (0, react_1.useCallback)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var json, loadedHabits, updatedHabits, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    return [4 /*yield*/, async_storage_1.default.getItem(HABITS_KEY)];
                case 1:
                    json = _a.sent();
                    if (json) {
                        loadedHabits = JSON.parse(json);
                        updatedHabits = loadedHabits.map(function (h) { return (__assign(__assign({}, h), { streak: (0, streakCalculator_1.calculateStreak)(h.completedDates) })); });
                        setHabits(updatedHabits);
                    }
                    return [3 /*break*/, 4];
                case 2:
                    e_1 = _a.sent();
                    console.error('Failed to load habits', e_1);
                    return [3 /*break*/, 4];
                case 3:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    (0, react_1.useEffect)(function () {
        loadHabits();
    }, [loadHabits]);
    var addHabit = function (habit) { return __awaiter(void 0, void 0, void 0, function () {
        var newHabit, updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newHabit = __assign(__assign({}, habit), { id: Date.now().toString(), completedDates: [], streak: 0, createdAt: new Date().toISOString() });
                    updated = __spreadArray(__spreadArray([], habits, true), [newHabit], false);
                    setHabits(updated);
                    return [4 /*yield*/, async_storage_1.default.setItem(HABITS_KEY, JSON.stringify(updated))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var updateHabit = function (id, updates) { return __awaiter(void 0, void 0, void 0, function () {
        var updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updated = habits.map(function (h) {
                        if (h.id === id) {
                            var updatedHabit = __assign(__assign({}, h), updates);
                            // Optional: Recalculate streak if completedDates is updated, though typically it's updated via toggle
                            updatedHabit.streak = (0, streakCalculator_1.calculateStreak)(updatedHabit.completedDates);
                            return updatedHabit;
                        }
                        return h;
                    });
                    setHabits(updated);
                    return [4 /*yield*/, async_storage_1.default.setItem(HABITS_KEY, JSON.stringify(updated))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var toggleHabitCompletion = function (id, date) { return __awaiter(void 0, void 0, void 0, function () {
        var updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updated = habits.map(function (h) {
                        if (h.id === id) {
                            var isCompleted = h.completedDates.includes(date);
                            var newCompletedDates = isCompleted
                                ? h.completedDates.filter(function (d) { return d !== date; })
                                : __spreadArray(__spreadArray([], h.completedDates, true), [date], false);
                            var newStreak = (0, streakCalculator_1.calculateStreak)(newCompletedDates);
                            return __assign(__assign({}, h), { completedDates: newCompletedDates, streak: newStreak });
                        }
                        return h;
                    });
                    setHabits(updated);
                    return [4 /*yield*/, async_storage_1.default.setItem(HABITS_KEY, JSON.stringify(updated))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var deleteHabit = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var updated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updated = habits.filter(function (h) { return h.id !== id; });
                    setHabits(updated);
                    return [4 /*yield*/, async_storage_1.default.setItem(HABITS_KEY, JSON.stringify(updated))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return { habits: habits, isLoading: isLoading, addHabit: addHabit, updateHabit: updateHabit, toggleHabitCompletion: toggleHabitCompletion, deleteHabit: deleteHabit, refresh: loadHabits };
};
exports.useHabits = useHabits;
