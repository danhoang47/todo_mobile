import { View, Text, StyleSheet, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { FontAwesome5 } from "@expo/vector-icons";

function Task({ task, onTaskSelected, isSelected }) {

	return (
		<Pressable
			style={[
				styles.task,
				{
					opacity: task.state !== 0 ? 0.6 : 1
				}
			]}
			onPress={() => {
				console.log("task pressed");
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
						right: 0,
						top: "16%",
					}}
				>
					<FontAwesome5
						size={16}
						name="angle-right"
						color="#858383"
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
					<Text>{task.dueDate}</Text>
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
					<Text>List 1</Text>
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
		gap: 20,
		alignItems: "center",
	},
});
