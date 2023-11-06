import { useState } from "react";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import {
	View,
	Text,
	Button,
	Pressable,
	FlatList,
	StyleSheet,
} from "react-native";
import { useListContext } from "../../context/lists";
import { useTagContext } from "../../context/tags";

/**
 *  type FilterOptions = {
 *      orderBy: "asc" | "desc",
 *      status: "complete" | "ongoing" | undefined
 *      listIds: string[] | undefined,
 *      tagIds: string[] | undefined
 *  }
 *
 */

function Filter({
	isVisible,
	setVisible,
	selectedFilterOptions,
	setSelectedFilterOptions,
}) {
	const [animateModal, setanimateModal] = useState(false);
	const { lists } = useListContext();
	const { tags } = useTagContext();
	const [localFilterOptions, setLocalFilterOption] = useState(
		selectedFilterOptions
	);

	const onOrderByOptionPressed = (type) => {
		setLocalFilterOption((prev) => ({
			...prev,
			orderBy: type,
		}));
	};

	const onStatusOptionPressed = (status) => {
		setLocalFilterOption((prev) => ({
			...prev,
			status: status === prev.status ? undefined : status,
		}));
	};

	const onListOptionPressed = (listId) => {
		setLocalFilterOption((prev) => ({
			...prev,
			listIds: prev.listIds.includes(listId)
				? prev.listIds.filter((id) => id !== listId)
				: [...prev.listIds, listId],
		}));
	};

	const onTagOptionPressed = (tagId) => {
		setLocalFilterOption((prev) => ({
			...prev,
			tagIds: prev.tagIds.includes(tagId)
				? prev.tagIds.filter((id) => id !== tagId)
				: [...prev.tagIds, tagId],
		}));
	};

	const hasOptionSelected = (key, value) => {
		const stateValue = localFilterOptions[key];
		return Array.isArray(stateValue)
			? stateValue.includes(value)
			: stateValue === value;
	};

	const selectedfilterOptionStyles = {
		borderColor: "black",
		backgroundColor: "black",
	};

	const selectedFilterOptionTitleStyles = {
		color: "#fff",
	};

	console.log(selectedFilterOptions);
	return (
		<SwipeUpDownModal
			modalVisible={isVisible}
			PressToanimate={animateModal}
			ContentModalStyle={styles.Modal}
			ContentModal={
				<View style={styles.containerContent}>
					<View style={styles.containerHeader}>
						<Text
							style={{
								fontWeight: "bold",
								fontSize: 24,
							}}
						>
							Filter
						</Text>
					</View>
					<View
						style={{
							padding: 20,
						}}
					>
						<View
							style={{
								marginBottom: 20,
							}}
						>
							<Text style={styles.filterHeading}>Order by</Text>
							<View style={styles.filterOptionList}>
								<Pressable
									onPress={() =>
										onOrderByOptionPressed("asc")
									}
									style={[
										styles.filterOption,
										hasOptionSelected("orderBy", "asc")
											? selectedfilterOptionStyles
											: {},
									]}
								>
									<Text
										style={[
											styles.filterOptionTitle,
											hasOptionSelected("orderBy", "asc")
												? selectedFilterOptionTitleStyles
												: {},
										]}
									>
										Latest
									</Text>
								</Pressable>
								<Pressable
									onPress={() =>
										onOrderByOptionPressed("desc")
									}
									style={[
										styles.filterOption,
										hasOptionSelected("orderBy", "desc")
											? selectedfilterOptionStyles
											: {},
									]}
								>
									<Text
										style={[
											styles.filterOptionTitle,
											hasOptionSelected("orderBy", "desc")
												? selectedFilterOptionTitleStyles
												: {},
										]}
									>
										Oldest
									</Text>
								</Pressable>
							</View>
						</View>
						<View
							style={{
								marginBottom: 20,
							}}
						>
							<Text style={styles.filterHeading}>Status</Text>
							<View style={styles.filterOptionList}>
								<Pressable
									onPress={() => onStatusOptionPressed(0)}
									style={[
										styles.filterOption,
										hasOptionSelected("status", 0)
											? selectedfilterOptionStyles
											: {},
									]}
								>
									<Text
										style={[
											styles.filterOptionTitle,
											hasOptionSelected("status", 0)
												? selectedFilterOptionTitleStyles
												: {},
										]}
									>
										Ongoing
									</Text>
								</Pressable>
								<Pressable
									onPress={() => onStatusOptionPressed(1)}
									style={[
										styles.filterOption,
										hasOptionSelected("status", 1)
											? selectedfilterOptionStyles
											: {},
									]}
								>
									<Text
										style={[
											styles.filterOptionTitle,
											hasOptionSelected("status", 1)
												? selectedFilterOptionTitleStyles
												: {},
										]}
									>
										Complete
									</Text>
								</Pressable>
							</View>
						</View>
						<View
							style={{
								marginBottom: 20,
							}}
						>
							<Text style={styles.filterHeading}>
								Group by List
							</Text>
							<View style={styles.filterOptionList}>
								{lists.map((list) => (
									<Pressable
										key={list.id}
										style={[
											styles.filterOption,
											hasOptionSelected(
												"listIds",
												list.id
											)
												? selectedfilterOptionStyles
												: {},
										]}
										onPress={() =>
											onListOptionPressed(list.id)
										}
									>
										<Text
											style={[
												styles.filterOptionTitle,
												hasOptionSelected(
													"listIds",
													list.id
												)
													? selectedFilterOptionTitleStyles
													: {},
											]}
										>
											{list.title}
										</Text>
									</Pressable>
								))}
							</View>
						</View>
						<View
							style={{
								marginBottom: 20,
							}}
						>
							<Text style={styles.filterHeading}>
								Group by Tag
							</Text>
							<View style={styles.filterOptionList}>
								{tags.map((tag) => (
									<Pressable
										key={tag.id}
										style={[
											styles.filterOption,
											hasOptionSelected("tagIds", tag.id)
												? selectedfilterOptionStyles
												: {},
											hasOptionSelected("tagIds", tag.id)
												? {
														backgroundColor:
															tag.color,
														borderColor: tag.color,
												  }
												: {},
										]}
										onPress={() =>
											onTagOptionPressed(tag.id)
										}
									>
										<Text
											style={[
												styles.filterOptionTitle,
												hasOptionSelected(
													"tagIds",
													tag.id
												)
													? selectedFilterOptionTitleStyles
													: {},
											]}
										>
											{tag.title}
										</Text>
									</Pressable>
								))}
							</View>
						</View>
					</View>
					<View style={styles.footer}>
						<Pressable
							onPress={() => {
								setVisible(false);
								setanimateModal(false);
								setLocalFilterOption({});
							}}
						>
							<Text
								style={{
									fontSize: 16,
									textDecorationLine: "underline",
									fontWeight: "bold",
								}}
							>
								Cancel
							</Text>
						</Pressable>
						<Pressable
							onPress={() => {
								setVisible(false);
								setanimateModal(false);
								setSelectedFilterOptions(localFilterOptions);
							}}
							style={{
								backgroundColor: "#ffd43b",
								borderRadius: 10,
							}}
						>
							<Text
								style={{
									padding: 10,
									fontSize: 16,
									fontWeight: "bold",
									minWidth: 100,
									textAlign: "center",
								}}
							>
								Filter
							</Text>
						</Pressable>
					</View>
				</View>
			}
			onClose={() => {
				setVisible(false);
				setanimateModal(false);
			}}
		/>
	);
}

export default Filter;

const styles = StyleSheet.create({
	containerContent: {
		flex: 1,
		marginTop: 40,
		backgroundColor: "#fff",
	},
	containerHeader: {
		alignContent: "center",
		alignItems: "center",
		justifyContent: "center",
		borderBottomColor: "#eee",
		borderBottomWidth: 1,
		paddingVertical: 10,
	},
	Modal: {
		marginTop: 200,
	},
	filterOption: {
		borderRadius: 999,
		borderColor: "#ddd",
		borderWidth: 1,
		minWidth: 80,
	},
	filterOptionTitle: {
		fontSize: 14,
		color: "#000",
		padding: 8,
		textAlign: "center",
	},
	filterHeading: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	body: {},
	filterOptionList: {
		flexDirection: "row",
		gap: 10,
	},
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		borderTopWidth: 1,
		borderColor: "#e6e6e6",
		paddingHorizontal: 20,
		paddingVertical: 10,
		alignItems: "center",
		zIndex: 1,
		backgroundColor: "#fff",
	},
});
