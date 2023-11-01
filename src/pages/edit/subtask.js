import Checkbox from "expo-checkbox";
import { Dimensions, Pressable, Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, {
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import styles from "./styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.3;
const ITEM_HEIGHT = 46;

function SubTask({
	subTask,
	onSubTaskRemoved,
	simultaneousHandlers,
	onEditSubTaskPressed,
	onSubTaskChecked
}) {
	const translateX = useSharedValue(0);
	const itemHeight = useSharedValue(ITEM_HEIGHT);
	const marginVertical = useSharedValue(6);
	const opacity = useSharedValue(1);

	const panGesture = useAnimatedGestureHandler({
		onActive: (event) => {
			translateX.value = event.translationX;
		},
		onEnd: () => {
			const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
			if (shouldBeDismissed) {
				translateX.value = withTiming(-SCREEN_WIDTH);
				itemHeight.value = withTiming(0);
				marginVertical.value = withTiming(0);
				opacity.value = withTiming(0, undefined, (isFinished) => {
					if (isFinished && onSubTaskRemoved) {
						runOnJS(onSubTaskRemoved)(subTask.id);
					}
				});
			} else {
				translateX.value = withTiming(0);
			}
		},
	});

	const rStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: translateX.value,
			},
		],
	}));

	const rIconContainerStyle = useAnimatedStyle(() => {
		const opacity = withTiming(
			translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0
		);
		return { opacity };
	});

	const rSubTaskContainerStyle = useAnimatedStyle(() => ({
		height: itemHeight.value,
		marginBottom: marginVertical.value,
		opacity: opacity.value,
	}));

	return (
		<Animated.View
			style={[styles.subTaskContainer, rSubTaskContainerStyle]}
		>
			<Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
				<FontAwesome5 name="trash-alt" size={20} color="red" />
			</Animated.View>
			<PanGestureHandler
				onGestureEvent={panGesture}
				simultaneousHandlers={simultaneousHandlers}
			>
				<Animated.View style={[styles.taskHeader, rStyle]}>
					<Checkbox
						disabled={false}
						value={Boolean(subTask?.isCompleted)}
						onValueChange={() => {
							onSubTaskChecked(subTask.id)
						}}
					/>
					<Text
						style={[
							{
								flexBasis: "82%",
								fontSize: 16,
							},
						]}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{subTask.description}
					</Text>
					<Pressable
						style={{
							position: "absolute",
							right: 10,
							top: "62%",
						}}
						onPress={() => {
							onEditSubTaskPressed(subTask);
						}}
					>
						<FontAwesome5
							size={16}
							name="angle-right"
							color="#858383"
						/>
					</Pressable>
				</Animated.View>
			</PanGestureHandler>
		</Animated.View>
	);
}

export default SubTask;
