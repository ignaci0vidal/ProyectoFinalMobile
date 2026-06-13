import * as Haptics from 'expo-haptics';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Image,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ItalianTableclothBackground from '../components/ItalianTableclothBackground';

import { useAudioPlayer } from 'expo-audio';


const timerFinishedSound = require('../assets/sounds/timer-finished.mp3');
const minuteOptions = Array.from({ length: 121 }, (_, index) => index);
const secondOptions = Array.from({ length: 60 }, (_, index) => index);

const notifySuccess = async () => {
    if (Platform.OS === 'web') return;

    try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
        console.log('Haptics no disponible:', error);
    }
};

const notifyImpact = async (style: Haptics.ImpactFeedbackStyle) => {
    if (Platform.OS === 'web') return;

    try {
        await Haptics.impactAsync(style);
    } catch (error) {
        console.log('Haptics no disponible:', error);
    }
};

type WheelPickerProps = {
    value: number;
    options: number[];
    suffix: string;
    disabled: boolean;
    onChange: (value: number) => void;
};

const WheelPicker: React.FC<WheelPickerProps> = ({
    value,
    options,
    suffix,
    disabled,
    onChange,
}) => {
    const selectedIndex = options.indexOf(value);
    const scrollRef = useRef<ScrollView>(null);

    const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const nextIndex = Math.round(event.nativeEvent.contentOffset.y / 42);
        const nextValue = options[Math.min(Math.max(nextIndex, 0), options.length - 1)];

        if (nextValue !== value) {
            onChange(nextValue);
        }
    };

    useEffect(() => {
        if (selectedIndex < 0) return;

        scrollRef.current?.scrollTo({
            y: selectedIndex * 42,
            animated: false,
        });
    }, [selectedIndex]);

    return (
        <View style={[styles.pickerWrapper, disabled && styles.pickerWrapperDisabled]}>
            <View pointerEvents="none" style={styles.pickerSelection} />

            <ScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={42}
                decelerationRate="fast"
                scrollEnabled={!disabled}
                contentContainerStyle={styles.wheelContent}
                onMomentumScrollEnd={handleScrollEnd}
                onScrollEndDrag={handleScrollEnd}
            >
                {options.map((option) => {
                    const isSelected = option === value;

                    return (
                        <TouchableOpacity
                            key={option}
                            activeOpacity={0.75}
                            disabled={disabled}
                            onPress={() => onChange(option)}
                            style={styles.wheelOption}
                        >
                            <Text
                                style={[
                                    styles.wheelOptionText,
                                    isSelected && styles.wheelOptionTextSelected,
                                    disabled && styles.wheelOptionTextDisabled,
                                ]}
                            >
                                {option} {suffix}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

const TimerScreen: React.FC = () => {
    const [selectedMinutes, setSelectedMinutes] = useState<number>(0);
    const [selectedSeconds, setSelectedSeconds] = useState<number>(10);
    const [secondsLeft, setSecondsLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const player = useAudioPlayer(timerFinishedSound);

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
            player.seekTo(0);
            player.play();

            await notifySuccess();

            Alert.alert('Timer finalizado', 'La cocción terminó.');

            hasFinishedRef.current = false;
        };

        notifyEnd();
    }, [secondsLeft, isRunning, player]);

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

        await notifyImpact(Haptics.ImpactFeedbackStyle.Light);
    };

    const stopTimer = async () => {
        hasFinishedRef.current = false;
        setIsRunning(false);
        setSecondsLeft(0);

        await notifyImpact(Haptics.ImpactFeedbackStyle.Medium);
    };

    const resetTimer = async () => {
        hasFinishedRef.current = false;
        setIsRunning(false);
        setSecondsLeft(0);
        setSelectedMinutes(0);
        setSelectedSeconds(10);

        await notifyImpact(Haptics.ImpactFeedbackStyle.Light);
    };

    return (
        <ItalianTableclothBackground>
            <SafeAreaView style={styles.screen}>
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.titleCard}>
                        <Text style={styles.title}>Timer de cocción</Text>

                        <Image
                            source={require('../assets/mk-logo.png')}
                            style={styles.titleLogo}
                        />
                    </View>

                    <View style={styles.descriptionCard}>
                        <Text style={styles.description}>
                            Controlá tiempos de cocción con minutos, segundos, alerta y vibración.
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.pickerRow}>
                            <View style={styles.pickerBox}>
                                <Text style={styles.label}>Minutos</Text>

                                <WheelPicker
                                    value={selectedMinutes}
                                    options={minuteOptions}
                                    suffix="min"
                                    disabled={isRunning}
                                    onChange={setSelectedMinutes}
                                />
                            </View>

                            <View style={styles.pickerBox}>
                                <Text style={styles.label}>Segundos</Text>

                                <WheelPicker
                                    value={selectedSeconds}
                                    options={secondOptions}
                                    suffix="seg"
                                    disabled={isRunning}
                                    onChange={setSelectedSeconds}
                                />
                            </View>
                        </View>

                        <Text
                            adjustsFontSizeToFit
                            minimumFontScale={0.7}
                            numberOfLines={1}
                            style={styles.timer}
                        >
                            {formatTime(displayedSeconds)}
                        </Text>

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
                </ScrollView>
            </SafeAreaView>
        </ItalianTableclothBackground>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scroll: {
        flex: 1,
    },
    content: {
        width: '100%',
        maxWidth: 920,
        alignSelf: 'center',
        paddingHorizontal: 32,
        paddingTop: 32,
        paddingBottom: 120,
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
        height: 126,
        justifyContent: 'center',
    },
    pickerWrapperDisabled: {
        opacity: 0.58,
    },
    pickerSelection: {
        position: 'absolute',
        left: 8,
        right: 8,
        top: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#f0dfd2',
    },
    wheelContent: {
        paddingVertical: 42,
    },
    wheelOption: {
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wheelOptionText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#8a7f76',
    },
    wheelOptionTextSelected: {
        fontSize: 22,
        fontWeight: '900',
        color: '#2b2d42',
    },
    wheelOptionTextDisabled: {
        color: '#8d8d8d',
    },
    timer: {
        fontSize: 76,
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

    headerCard: {
        backgroundColor: 'rgba(255, 250, 242, 0.94)',
        padding: 22,
        borderRadius: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#f0dfd2',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5,

        elevation: 3,
    },
    subtitle: {
        marginTop: 8,
        fontSize: 16,
        lineHeight: 22,
        color: '#555',
        fontWeight: '600',
    },
    titleCard: {
        backgroundColor: 'rgba(255, 244, 230, 0.96)',
        paddingVertical: 18,
        paddingHorizontal: 22,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f0dfd2',

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.12,
        shadowRadius: 5,

        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    descriptionCard: {
        backgroundColor: 'rgba(255, 250, 242, 0.94)',
        padding: 16,
        borderRadius: 18,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: '#f0dfd2',
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: '#2b2d42',
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
        color: '#555',
        fontWeight: '600',
    },
    titleLogo: {
        width: 54,
        height: 54,
        resizeMode: 'contain',
    },

});

export default TimerScreen;
