import { FontAwesome5 } from "@expo/vector-icons";
import {
	View,
	Text,
	Pressable,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";

import Indicator from "./indicator";
import Item from "./item";
import { useTaskContext } from "../../context/tasks";
import { useListContext } from "../../context/lists";
import { useTagContext } from "../../context/tags";

import { compareDate, isInThisWeek } from "../../utils";
import styles from "./styles";

import taskGroup from "./task_group.json";
import AddList from "./add_list";

const Divider = () => {
	return (
		<View
			style={{
				height: 1,
				backgroundColor: "#dbd9d9",
				marginVertical: 10,
			}}
		/>
	);
};

function Menu({ navigation }) {
	const { joinedTasks: tasks } = useTaskContext();
	const { lists } = useListContext();
	const { tags } = useTagContext();

	const getTaskBadge = (type) => {
		switch (type) {
			case "upcoming":
				return tasks.reduce(
					(count, task) => isInThisWeek(new Date(task)) && !isToday(new Date(task)) ? count + 1 : count,
					0
				);
			case "today":
				return tasks.reduce(
					(count, task) =>
						compareDate(new Date(task.dueDate), new Date()) === 0
							? count + 1
							: count,
					0
				);
			default:
				return undefined;
		}
	};

	const getListBadge = (listId) => {
		return tasks.reduce(
			(count, task) => (task.listId === listId ? count + 1 : count),
			0
		);
	};

	return (
		<ScrollView style={styles.container} automaticallyAdjustKeyboardInsets>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Menu</Text>
				<Pressable onPress={() => navigation.goBack()}>
					<FontAwesome5 name="times" size={22} />
				</Pressable>
			</View>
			<View style={styles.body}>
				<View style={styles.menuGroup}>
					<Text style={styles.menuGroupTitle}>tasks</Text>
					<View style={styles.menuGroupOptions}>
						{taskGroup.map((task) => (
							<Item
								key={task.id}
								routePath={task.routePath}
								title={task.title}
								onNavigate={() => {
									navigation.navigate(task.routePath);
								}}
								badge={getTaskBadge(task.title)}
								renderIndicator={() => (
									<Indicator type="task" icon={task.icon} />
								)}
							/>
						))}
					</View>
				</View>
				<Divider />
				<View style={styles.menuGroup}>
					<Text style={styles.menuGroupTitle}>lists</Text>
					<View style={styles.menuGroupOptions}>
						{lists.map((list) => (
							<Item
								key={list.id}
								routePath={"list"}
								title={list.title}
								onNavigate={() => {
									navigation.navigate("list", {
										listId: list.id,
									});
								}}
								badge={getListBadge(list.id)}
								renderIndicator={() => (
									<Indicator type="list" color={list.color} />
								)}
							/>
						))}
						<AddList />
					</View>
				</View>
				<Divider />
				<View style={styles.menuGroup}>
					<Text style={styles.menuGroupTitle}>lists</Text>
					<ScrollView
						horizontal={true}
						contentContainerStyle={{
							columnGap: 6,
						}}
					>
						{tags.map(({ id, title, color }) => (
							<Pressable
								key={id}
								style={{
									backgroundColor: color,
									borderRadius: 6,
								}}
								onPress={() => onTagSelected(id)}
							>
								<Text
									style={{
										paddingVertical: 6,
										paddingHorizontal: 10,
										color: "#1e1e1f",
										fontWeight: "bold",
									}}
								>
									{title}
								</Text>
							</Pressable>
						))}
						<Pressable
							style={{
								backgroundColor: "#dbd9d9",
								borderRadius: 6,
							}}
						>
							<Text
								style={{
									paddingVertical: 6,
									paddingHorizontal: 10,
									color: "#1e1e1f",
									fontWeight: "bold",
								}}
							>
								+ Add Tag
							</Text>
						</Pressable>
					</ScrollView>
				</View>
				<Divider />
			</View>
			<View style={styles.footer}>
				<Pressable onPress={() => {}}>
					<FontAwesome5 name="sliders-h" size={18} color="black" />
				</Pressable>
				<Text style={styles.footerTitle}>Settings</Text>
			</View>
			<Pressable style={styles.submitBtn}>
				<Text style={styles.submitBtnTitle}>Sign out</Text>
			</Pressable>
		</ScrollView>
	);
}

export default Menu;
