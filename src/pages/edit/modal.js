import { useState } from "react";
import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import ReactNativeModal from "react-native-modal";

function Modal({ subTask, setSubTask, onSubTaskAdded, isVisible, setVisible }) {
	const onActionButtonPressed = (type) => {
		if (type === "add") {
			if (subTask?.description) {
				onSubTaskAdded({
					...subTask,
					id: subTask?.id || Math.random(),
					isCompleted: false
				})
				setSubTask({
					description: ''
				})
			}
		} 

        setVisible()
	};

	return (
		<View>
			<ReactNativeModal
				style={{
					justifyContent: "center",
					alignItems: "center",
				}}
				isVisible={isVisible}
				animationIn={"fadeIn"}
				animationOut={"fadeOutDown"}
			>
				<View
					style={{
						backgroundColor: "white",
						width: "100%",
						borderRadius: 10,
						gap: 10,
						padding: 20,
						paddingBottom: 16,
					}}
				>
					<TextInput
						placeholder="Description"
						style={{
							padding: 10,
							borderRadius: 10,
							borderWidth: 1.5,
						}}
						value={subTask?.description || ""}
						onChangeText={(text) => {
							setSubTask((prev) => ({
								...prev,
								description: text,
							}));
						}}
					/>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-end",
							gap: 5,
						}}
					>
						<Pressable
							style={styles.submitBtn}
							onPress={() => onActionButtonPressed('add')}
						>
							<Text style={styles.submitBtnTitle}>Save</Text>
						</Pressable>
						<Pressable
							style={styles.secondarySubmitBtn}
							onPress={() => onActionButtonPressed('cancel')}
						>
							<Text style={styles.submitBtnTitle}>Cancel</Text>
						</Pressable>
					</View>
				</View>
			</ReactNativeModal>
		</View>
	);
}

export default Modal;

const styles = StyleSheet.create({
	submitBtn: {
		backgroundColor: "#ffd43b",
		borderRadius: 6,
        flexBasis: '25%'
	},
	submitBtnTitle: {
		textAlign: "center",
		padding: 8,
		fontWeight: "bold",
		fontSize: 14,
	},
	secondarySubmitBtn: {
		backgroundColor: "#ebebeb",
		borderRadius: 6,
        flexBasis: '25%'
	},
});
