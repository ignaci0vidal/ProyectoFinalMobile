import { Picker } from '@react-native-picker/picker';
import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const TimerScreen: React.FC = () => {
    const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
    const [selectedSeconds, setSelectedSeconds] = useState<number>(10);
    const [secondsLeft, setSecondsLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const hasFinishedRef = useRef(false);

    useEffect(() => {
        if (!isRunning) return;

        if (secondsLeft <= 0) {
            setIsRunning(false);
            return;
        }

        const intervalId = setInterval(() => {
            setSecondsLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRunning, secondsLeft]);

    useEffect(() => {
        if (secondsLeft !== 0 || isRunning || !hasFinishedRef.current) return;

        const notifyEnd = async () => {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert('Timer finalizado', 'La cocción terminó.');
            hasFinishedRef.current = false;
        };

        notifyEnd();
    }, [secondsLeft, isRunning]);

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
            2,
            '0'
        )}`;
    };

    const selectedTotalSeconds = selectedMinutes * 60 + selectedSeconds;
    const displayedSeconds = isRunning ? secondsLeft : selectedTotalSeconds;

    const startTimer = async () => {
        const totalSeconds = selectedMinutes * 60 + selectedSeconds;

        if (totalSeconds <= 0) {
            Alert.alert('Tiempo inválido', 'Seleccioná un tiempo mayor a 0.');
            return;
        }

        hasFinishedRef.current = true;
        setSecondsLeft(totalSeconds);
        setIsRunning(true);

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const stopTimer = async () => {
        hasFinishedRef.current = false;
        setIsRunning(false);
        setSecondsLeft(0);

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    };

    const resetTimer = async () => {
        hasFinishedRef.current = false;
        setIsRunning(false);
        setSecondsLeft(0);
        setSelectedMinutes(0);
        setSelectedSeconds(10);

        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.content}>
                <Text style={styles.title}>Timer de cocción</Text>

                <Text style={styles.description}>
                    Seleccioná minutos y segundos para controlar tiempos de cocción dentro
                    de miKitchen.
                </Text>

                <View style={styles.card}>
                    <View style={styles.pickerRow}>
                        <View style={styles.pickerBox}>
                            <Text style={styles.label}>Minutos</Text>

                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={selectedMinutes}
                                    onValueChange={(value) => setSelectedMinutes(Number(value))}
                                    enabled={!isRunning}
                                    style={styles.picker}
                                    itemStyle={styles.pickerItem}
                                >
                                    {Array.from({ length: 121 }, (_, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={`${index} min`}
                                            value={index}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        <View style={styles.pickerBox}>
                            <Text style={styles.label}>Segundos</Text>

                            <View style={styles.pickerWrapper}>
                                <Picker
                                    selectedValue={selectedSeconds}
                                    onValueChange={(value) => setSelectedSeconds(Number(value))}
                                    enabled={!isRunning}
                                    style={styles.picker}
                                    itemStyle={styles.pickerItem}
                                >
                                    {Array.from({ length: 60 }, (_, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={`${index} seg`}
                                            value={index}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.timer}>{formatTime(displayedSeconds)}</Text>

                    {!isRunning ? (
                        <TouchableOpacity style={styles.primaryButton} onPress={startTimer}>
                            <Text style={styles.primaryButtonText}>Iniciar timer</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.dangerButton} onPress={stopTimer}>
                            <Text style={styles.dangerButtonText}>Detener timer</Text>
                        </TouchableOpacity>
                    )}

                    <TouchableOpacity style={styles.secondaryButton} onPress={resetTimer}>
                        <Text style={styles.secondaryButtonText}>Reiniciar selección</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoBox}>
                    <Text style={styles.infoTitle}>Uso en miKitchen</Text>
                    <Text style={styles.infoText}>
                        Este timer permite seleccionar tiempos concretos de cocción. Es ideal para controlar tiempos de horneado, hervor o cualquier proceso que requiera un tiempo específico. Recordá iniciar el timer al comenzar la cocción y detenerlo o reiniciarlo según necesites.
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff8f0',
    },
    content: {
        flex: 1,
        width: '100%',
        maxWidth: 920,
        alignSelf: 'center',
        paddingHorizontal: 32,
        paddingTop: 32,
        paddingBottom: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#2b2d42',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        color: '#666',
        lineHeight: 21,
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 22,
        borderWidth: 1,
        borderColor: '#f0dfd2',
        marginBottom: 20,
    },
    pickerRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
    },
    pickerBox: {
        flex: 1,
    },
    pickerWrapper: {
        backgroundColor: '#fff8f0',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 18,
        overflow: 'hidden',
        height: 100,
        justifyContent: 'center',

    },
    picker: {
        height: 190,
        width: '100%',
        marginTop: -10,
        marginBottom: 10,
    },
    pickerItem: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2b2d42',
    },
    timer: {
        fontSize: 90,
        fontWeight: '900',
        color: '#e76f51',
        textAlign: 'center',
        marginBottom: 22,
    },
    primaryButton: {
        backgroundColor: '#e76f51',
        paddingVertical: 15,
        paddingHorizontal: 18,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 26,
        fontWeight: '800',
    },
    secondaryButton: {
        backgroundColor: '#ffffff',
        paddingVertical: 15,
        paddingHorizontal: 18,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e76f51',
    },
    secondaryButtonText: {
        color: '#e76f51',
        fontSize: 16,
        fontWeight: '800',
    },
    dangerButton: {
        backgroundColor: '#e63946',
        paddingVertical: 15,
        paddingHorizontal: 18,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    dangerButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '800',
    },
    infoBox: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 18,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: '#f0dfd2',
    },
    infoTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#2b2d42',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 15,
        color: '#555',
        lineHeight: 21,
    },
    label: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2b2d42',
        marginBottom: 6,
    },
});

export default TimerScreen;