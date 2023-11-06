import { useEffect, useRef, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View, TextInput, Pressable} from "react-native";


import { useStickyNoteContext } from "../../context/sticky_notes"
import styles from "../edit/styles";
import Modal from "../edit/modal";

function EditSticky({ route, navigation }) {
	const isCreateMode = !route.params;
	const [shouldActionButtonsShow, setActionButtonsShow] = useState(isCreateMode);
	const { stickyNotes, setStickyNotes } = useStickyNoteContext(); // ??????
	const defaultStickyNote = useRef({
		id: Math.random(),
		title: "",
		content: "",
		color: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
	})
	const [note, setNote] = useState(defaultStickyNote.current);

	useEffect(() => {
		// console.log(!isCreateMode,stickyNotes);
		if (!isCreateMode) {
			const { noteId } = route.params;
			const findedNote = stickyNotes?.find(note => note.id === noteId);
			defaultStickyNote.current = findedNote
			setNote(findedNote);
		}
	}, []);

	

	const onStickyNoteSavedPressed = () => {
		if (isCreateMode) {
			setStickyNotes((prev) => [...prev, note]);
		} else {
			setStickyNotes((prev) =>
				prev.map((t) => (t.id === note.id ? { ...note } : t))
			);
		}

		navigation.goBack();
	};

	const onStickyNoteCanceledPressed = () => {
		setNote(defaultStickyNote.current)
		setActionButtonsShow(false)
	}


	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Sticky Note:</Text>
				<View
					style={{
						flexDirection: "row",
						gap: 10,
						alignItems: "center",
					}}
				>
					{!isCreateMode && (
						<Pressable onPress={() => setActionButtonsShow(true)}>
							<FontAwesome5 name="pen" size={17} />
						</Pressable>
					)}
					<Pressable onPress={() => navigation.goBack()}>
						<FontAwesome5 name="times" size={22} />
					</Pressable>
				</View>
			</View>
			<View>
				<TextInput
					numberOfLines={1}
					multiline={false}
					placeholder={note?.title ?? "Title"}
					style={styles.textInputWithBorder}
					value={note?.title || ""}
					onChangeText={(text) => {
						setNote((prev) => ({
							...prev,
							title: text,
						}));
					}}
					editable={shouldActionButtonsShow}
				/>
				<TextInput
					numberOfLines={10}
					multiline={true}
					placeholder={note?.content ?? "Content"}
					value={note?.content || ""}
					style={[
						styles.textInputWithBorder,
						{
							textAlignVertical: "top",
						},
					]}
					onChangeText={(text) => {
						setNote((prev) => ({
							...prev,
							content: text,
						}));
					}}
					editable={shouldActionButtonsShow}
				/>
				
				
			</View>
			
			<Modal
			/>
			{shouldActionButtonsShow && (
				<View style={styles.selectedTasksAction}>
					<Pressable onPress={onStickyNoteCanceledPressed}>
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
						style={{
							backgroundColor: "#ffd43b",
							borderRadius: 10,
						}}
						onPress={onStickyNoteSavedPressed}
					>
						<Text
							style={{
								padding: 10,
								fontSize: 16,
								fontWeight: "bold",
								minWidth: 80,
								textAlign: "center",
							}}
						>
							Save
						</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
}

export default EditSticky;
