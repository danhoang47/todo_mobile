import { View, Text, StyleSheet, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";

function Task({ task, onTaskSelected, isSelected, navigation, onResetStatePressed }) {
	const [hasHovered, setHovered] = useState(false);

	return (
		<Pressable
			style={[
				styles.task,
				{
					opacity: task.state !== 0 ? 0.6 : 1
				}
			]}
			onPress={() => {
				navigation.navigate("edit", {
					taskId: task.id
				})
			}}
		>
			<View style={styles.taskHeader}>
				<Checkbox
					disabled={false}
					value={isSelected}
					onValueChange={() => {
						onTaskSelected(task.id);
					}}
					color={isSelected ? "#000" : undefined}
				/>
				<Text
					style={[
						{
							flexBasis: "82%",
							fontSize: 16,
						},
						{
							textDecorationLine:
								task.state !== 0 ? "line-through" : "none",
						},
					]}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{task.title}
				</Text>
				<Pressable
					style={{
						position: "absolute",
						right: -10,
						padding: 10,
					}}
					onPressIn={() => setHovered(true)}
					onPressOut={() => setHovered(false)}
					onPress={() => {
						onResetStatePressed(task.id)
					}}
				>
					<FontAwesome5
						size={16}
						name="undo-alt"
						color={hasHovered ? "#000" : "#858383"}
					/>
				</Pressable>
			</View>
			<View style={styles.taskExtraInfor}>
				<View
					style={{
						flexDirection: "row",
						gap: 10,
						alignItems: "center",
					}}
				>
					<FontAwesome5
						size={18}
						name="calendar-alt"
						color="#858383"
					/>
					<Text>{new Date(task.dueDate).toLocaleDateString()}</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						gap: 10,
						alignItems: "center",
					}}
				>
					<View
						style={{
							backgroundColor: "#e6e6e6",
							borderRadius: 4,
						}}
					>
						<Text
							style={{
								paddingVertical: 3,
								paddingHorizontal: 8,
								fontSize: 12,
							}}
						>
							{task.subTasks.length}
						</Text>
					</View>
					<Text>Subtasks</Text>
				</View>
				<View
					style={{
						flexDirection: "row",
						gap: 10,
						alignItems: "center",
					}}
				>
					<View
						style={{
							padding: 10,
							backgroundColor: "yellow",
							borderRadius: 4,
						}}
					></View>
					<Text>{task.list.title}</Text>
				</View>
			</View>
		</Pressable>
	);
}

export default Task;

const styles = StyleSheet.create({
	task: {
		padding: 12,
		marginVertical: 8,
		gap: 6,
	},
	taskHeader: {
		flexDirection: "row",
		gap: 14,
		alignItems: "center",
		position: "relative",
	},
	taskExtraInfor: {
		marginLeft: 34,
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
	},
});
