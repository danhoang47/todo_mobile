import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { useListContext } from "../../context/lists";

import colors from "./colors";
import Indicator from "./indicator";

function AddList() {
	const [list, setList] = useState({
		color: colors[0],
	});
	const [isOpen, setOpen] = useState(false);
	const { setLists } = useListContext();

	const addNewList = () => {
		if (list?.title) {
			setLists((prev) => [...prev, { id: Math.random(), ...list }]);
		}
		setOpen(false);
	};

	const isColorSelected = (color) => {
		return list.color === color;
	};

	return (
		<>
			<Pressable
				style={styles.addNewListBtn}
				onPress={() => {
					if (isOpen) addNewList();
					else setOpen(true);
				}}
			>
				<FontAwesome5 size={16} name="plus" color="#858383" />
				<Text style={styles.addNewListBtnTitle}>
					{isOpen ? "Save New List" : "Add New List"}
				</Text>
			</Pressable>
			{isOpen && (
				<View style={[styles.addNewListSection]}>
					<View
						style={{
							paddingHorizontal: 4,
							position: "relative",
						}}
					>
						<Indicator
							style={styles.indicator}
							type={"list"}
							color={list?.color || colors[0]}
						/>
						<TextInput
							multiline={false}
							numberOfLines={1}
							placeholder="List Name"
							style={styles.input}
							value={list?.title || ""}
							onChangeText={(text) => {
								setList((prev) => ({
									...prev,
									title: text,
								}));
							}}
						/>
					</View>
					<ScrollView
						horizontal={true}
						contentContainerStyle={{
							columnGap: 6,
							justifyContent: "center",
							display: "flex",
						}}
					>
						{colors.map((color) => (
							<Pressable
								key={color}
								style={[
									{
										width: 34,
										height: 34,
										alignItems: "center",
										justifyContent: "center",
									},
									isColorSelected(color) ? styles.border : {},
								]}
								onPress={() =>
									setList((prev) => ({ ...prev, color }))
								}
							>
								<Indicator type={"list"} color={color} />
							</Pressable>
						))}
					</ScrollView>
				</View>
			)}
		</>
	);
}

export default AddList;

const styles = StyleSheet.create({
	addNewListBtn: {
		padding: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "#e6e6e6",
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},
	addNewListBtnTitle: {
		color: "#858383",
		fontWeight: "bold",
		fontSize: 16,
	},
	addNewListSection: {
		padding: 16,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "#d6d6d6",
		gap: 10,
	},
	input: {
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "#d6d6d6",
		paddingHorizontal: 10,
		paddingVertical: 4,
		paddingLeft: 40,
	},
	indicator: {
		position: "absolute",
		top: 11,
		left: 16,
	},
	border: {
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "#d6d6d6",
	},
});
